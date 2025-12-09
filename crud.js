// UI Manager for CRUD operations
class CRUDManager {
  constructor(apiService, entityName, renderFunction) {
    this.apiService = apiService;
    this.entityName = entityName;
    this.renderFunction = renderFunction;
  }

  async loadAll() {
    try {
      let data;
      
      // Manejar servicios especiales para clientes y juegos
      if (this.entityName === 'Cliente') {
        data = await this.apiService.getClientes();
      } else if (this.entityName === 'Juego') {
        data = await this.apiService.getJuegos();
      } else {
        data = await this.apiService.getAll();
      }
      
      this.renderFunction(data);
      return data;
    } catch (error) {
      this.showError(`Error al cargar ${this.entityName}`);
      return [];
    }
  }

  async create(formData) {
    try {
      if (this.entityName === 'Cliente') {
        await this.apiService.addCliente(formData);
      } else if (this.entityName === 'Juego') {
        await this.apiService.addJuego(formData);
      } else {
        await this.apiService.create(formData);
      }
      this.showSuccess(`${this.entityName} creado exitosamente`);
      await this.loadAll();
      return true;
    } catch (error) {
      this.showError(`Error al crear ${this.entityName}`);
      return false;
    }
  }

  async update(id, formData) {
    try {
      if (this.entityName === 'Cliente') {
        await this.apiService.updateCliente(id, formData);
      } else if (this.entityName === 'Juego') {
        await this.apiService.updateJuego(id, formData);
      } else {
        await this.apiService.update(id, formData);
      }
      this.showSuccess(`${this.entityName} actualizado exitosamente`);
      await this.loadAll();
      return true;
    } catch (error) {
      this.showError(`Error al actualizar ${this.entityName}`);
      return false;
    }
  }

  async delete(id) {
    if (!confirm(`¿Está seguro de eliminar este ${this.entityName}?`)) {
      return false;
    }
    try {
      if (this.entityName === 'Cliente') {
        await this.apiService.deleteCliente(id);
      } else if (this.entityName === 'Juego') {
        await this.apiService.deleteJuego(id);
      } else {
        await this.apiService.delete(id);
      }
      this.showSuccess(`${this.entityName} eliminado exitosamente`);
      await this.loadAll();
      return true;
    } catch (error) {
      this.showError(`Error al eliminar ${this.entityName}`);
      return false;
    }
  }

  showSuccess(message) {
    this.showNotification(message, 'success');
  }

  showError(message) {
    this.showNotification(message, 'error');
  }

  showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 ${
      type === 'success' 
        ? 'bg-green-500 text-white' 
        : 'bg-red-500 text-white'
    }`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 3000);
  }
}

// Modal Manager
class ModalManager {
  constructor(modalId) {
    this.modalId = modalId;
    this.modal = null;
  }

  create() {
    const modal = document.createElement('div');
    modal.id = this.modalId;
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center z-50';
    modal.innerHTML = `
      <div class="bg-white dark:bg-slate-800 rounded-lg p-6 max-w-md w-full mx-4 modal-content">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-bold modal-title"></h3>
          <button class="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200" onclick="closeModal('${this.modalId}')">
            <i class="fas fa-times text-xl"></i>
          </button>
        </div>
        <div class="modal-body"></div>
      </div>
    `;
    document.body.appendChild(modal);
    this.modal = modal;
    return modal;
  }

  open(title, content) {
    if (!this.modal) this.create();
    this.modal.querySelector('.modal-title').textContent = title;
    this.modal.querySelector('.modal-body').innerHTML = content;
    this.modal.classList.remove('hidden');
    this.modal.classList.add('flex');
  }

  close() {
    if (this.modal) {
      this.modal.classList.remove('flex');
      this.modal.classList.add('hidden');
    }
  }
}

// Global function to close modals
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('flex');
    modal.classList.add('hidden');
  }
}
