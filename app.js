// Application initialization and console management
let consolasManager;
let consolasModal;
let currentEditId = null;

// Initialize app
document.addEventListener('DOMContentLoaded', async function() {
  // Initialize theme toggle (existing functionality)
  initThemeToggle();
  
  // Initialize modal
  consolasModal = new ModalManager('consolaModal');
  
  // Initialize CRUD manager
  consolasManager = new CRUDManager(
    consolasAPI,
    'Consola',
    renderConsolas
  );
  
  // Load initial data
  await consolasManager.loadAll();
  
  // Initialize navigation
  initNavigation();
});

function initThemeToggle() {
  const themeSwitch = document.getElementById('theme-switch');
  const body = document.body;
  
  if (localStorage.getItem('theme') === 'dark' || 
      (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    body.classList.add('dark');
    themeSwitch.checked = true;
  } else {
    body.classList.add('light');
  }
  
  themeSwitch.addEventListener('change', function() {
    if (this.checked) {
      body.classList.remove('light');
      body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      body.classList.remove('dark');
      body.classList.add('light');
      localStorage.setItem('theme', 'light');
    }
  });
}

function initNavigation() {
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      navItems.forEach(nav => nav.classList.remove('active'));
      this.classList.add('active');
      
      // Handle section switching
      const section = this.textContent.trim();
      if (section === 'Consolas') {
        showConsolasSection();
      }
    });
  });
}

function showConsolasSection() {
  const mainContent = document.querySelector('main');
  mainContent.innerHTML = `
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold">Gestión de Consolas</h2>
      <button class="btn-primary flex items-center gap-2" onclick="openConsolaForm()">
        <i class="fas fa-plus"></i> Nueva Consola
      </button>
    </div>
    
    <div class="card p-5">
      <div id="consolas-table-container">
        <!-- Table will be rendered here -->
      </div>
    </div>
  `;
  
  consolasManager.loadAll();
}

function renderConsolas(consolas) {
  const container = document.getElementById('consolas-table-container');
  if (!container) return;
  
  if (!consolas || consolas.length === 0) {
    container.innerHTML = `
      <div class="text-center py-8 text-slate-500 dark:text-slate-400">
        <i class="fas fa-gamepad text-4xl mb-3"></i>
        <p>No hay consolas registradas</p>
      </div>
    `;
    return;
  }
  
  container.innerHTML = `
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead>
          <tr class="border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-500 text-left text-sm">
            <th class="pb-3 font-medium">Nombre</th>
            <th class="pb-3 font-medium">Modelo</th>
            <th class="pb-3 font-medium">Estado</th>
            <th class="pb-3 font-medium">Precio/Día</th>
            <th class="pb-3 font-medium">Acciones</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
          ${consolas.map(consola => `
            <tr>
              <td class="py-3">${consola.nombre || 'N/A'}</td>
              <td class="py-3">${consola.modelo || 'N/A'}</td>
              <td class="py-3">
                <span class="px-2 py-1 rounded text-xs ${getStatusClass(consola.estado)}">
                  ${consola.estado || 'N/A'}
                </span>
              </td>
              <td class="py-3">$${consola.precioDia || '0'}</td>
              <td class="py-3">
                <div class="flex gap-2">
                  <button 
                    class="text-blue-500 hover:text-blue-700" 
                    onclick="editConsola('${consola.id}')"
                    title="Editar">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button 
                    class="text-red-500 hover:text-red-700" 
                    onclick="deleteConsola('${consola.id}')"
                    title="Eliminar">
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

function getStatusClass(estado) {
  switch(estado?.toLowerCase()) {
    case 'disponible':
      return 'bg-green-100 dark:bg-green-900/30 text-green-600';
    case 'alquilada':
      return 'bg-amber-100 dark:bg-amber-900/30 text-amber-600';
    case 'mantenimiento':
      return 'bg-red-100 dark:bg-red-900/30 text-red-600';
    default:
      return 'bg-slate-100 dark:bg-slate-800 text-slate-600';
  }
}

function openConsolaForm(consolaData = null) {
  currentEditId = consolaData?.id || null;
  const isEdit = !!consolaData;
  
  const formContent = `
    <form id="consolaForm" class="space-y-4">
      <div>
        <label class="block text-sm font-medium mb-1">Nombre</label>
        <input 
          type="text" 
          name="nombre" 
          value="${consolaData?.nombre || ''}"
          class="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700"
          required>
      </div>
      
      <div>
        <label class="block text-sm font-medium mb-1">Modelo</label>
        <input 
          type="text" 
          name="modelo" 
          value="${consolaData?.modelo || ''}"
          class="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700"
          required>
      </div>
      
      <div>
        <label class="block text-sm font-medium mb-1">Estado</label>
        <select 
          name="estado" 
          class="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700"
          required>
          <option value="Disponible" ${consolaData?.estado === 'Disponible' ? 'selected' : ''}>Disponible</option>
          <option value="Alquilada" ${consolaData?.estado === 'Alquilada' ? 'selected' : ''}>Alquilada</option>
          <option value="Mantenimiento" ${consolaData?.estado === 'Mantenimiento' ? 'selected' : ''}>Mantenimiento</option>
        </select>
      </div>
      
      <div>
        <label class="block text-sm font-medium mb-1">Precio por Día</label>
        <input 
          type="number" 
          name="precioDia" 
          value="${consolaData?.precioDia || ''}"
          class="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700"
          required
          min="0"
          step="1000">
      </div>
      
      <div class="flex gap-2 pt-4">
        <button 
          type="submit" 
          class="btn-primary flex-1">
          ${isEdit ? 'Actualizar' : 'Crear'} Consola
        </button>
        <button 
          type="button" 
          class="px-4 py-2 bg-slate-200 dark:bg-slate-700 rounded-lg flex-1"
          onclick="closeModal('consolaModal')">
          Cancelar
        </button>
      </div>
    </form>
  `;
  
  consolasModal.open(
    isEdit ? 'Editar Consola' : 'Nueva Consola',
    formContent
  );
  
  // Add form submit handler
  setTimeout(() => {
    const form = document.getElementById('consolaForm');
    form.addEventListener('submit', handleConsolaSubmit);
  }, 100);
}

async function handleConsolaSubmit(e) {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  const data = {
    nombre: formData.get('nombre'),
    modelo: formData.get('modelo'),
    estado: formData.get('estado'),
    precioDia: parseInt(formData.get('precioDia'))
  };
  
  let success;
  if (currentEditId) {
    success = await consolasManager.update(currentEditId, data);
  } else {
    success = await consolasManager.create(data);
  }
  
  if (success) {
    consolasModal.close();
  }
}

async function editConsola(id) {
  try {
    const consola = await consolasAPI.getById(id);
    openConsolaForm(consola);
  } catch (error) {
    consolasManager.showError('Error al cargar la consola');
  }
}

async function deleteConsola(id) {
  await consolasManager.delete(id);
}
