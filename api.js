// API Service for MockAPI integration
const API_BASE_URL = 'https://673667d5aafa2ef222309a0d.mockapi.io/api/v1';

class APIService {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  async getAll() {
    try {
      const response = await fetch(`${API_BASE_URL}/${this.endpoint}`);
      if (!response.ok) throw new Error('Error al obtener datos');
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  async getById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/${this.endpoint}/${id}`);
      if (!response.ok) throw new Error('Error al obtener el registro');
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  async create(data) {
    try {
      const response = await fetch(`${API_BASE_URL}/${this.endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Error al crear el registro');
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  async update(id, data) {
    try {
      const response = await fetch(`${API_BASE_URL}/${this.endpoint}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Error al actualizar el registro');
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  async delete(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/${this.endpoint}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Error al eliminar el registro');
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
}

// Exportar servicios específicos
const consolasAPI = new APIService('consolas');

// Servicio especializado para datos (clientes y juegos combinados)
class DatosService {
  constructor() {
    this.endpoint = 'datos';
    this.datosAPI = new APIService(this.endpoint);
  }

  async getAll() {
    try {
      const response = await this.datosAPI.getAll();
      if (response && response.length > 0) {
        return response[0]; // Retorna el primer (y único) registro
      }
      return { clientes: [], juegos: [] };
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  async updateClientes(clientes) {
    try {
      const datos = await this.getAll();
      const datosActualizados = { ...datos, clientes };
      if (datos.id) {
        await this.datosAPI.update(datos.id, datosActualizados);
      } else {
        await this.datosAPI.create(datosActualizados);
      }
      return datosActualizados;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  async updateJuegos(juegos) {
    try {
      const datos = await this.getAll();
      const datosActualizados = { ...datos, juegos };
      if (datos.id) {
        await this.datosAPI.update(datos.id, datosActualizados);
      } else {
        await this.datosAPI.create(datosActualizados);
      }
      return datosActualizados;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  async addCliente(cliente) {
    try {
      const datos = await this.getAll();
      const nuevoId = Math.max(...datos.clientes.map(c => c.id || 0), 0) + 1;
      cliente.id = nuevoId;
      datos.clientes.push(cliente);
      return await this.updateClientes(datos.clientes);
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  async updateCliente(id, cliente) {
    try {
      const datos = await this.getAll();
      const index = datos.clientes.findIndex(c => c.id === parseInt(id));
      if (index !== -1) {
        datos.clientes[index] = { ...datos.clientes[index], ...cliente };
        return await this.updateClientes(datos.clientes);
      }
      throw new Error('Cliente no encontrado');
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  async deleteCliente(id) {
    try {
      const datos = await this.getAll();
      datos.clientes = datos.clientes.filter(c => c.id !== parseInt(id));
      return await this.updateClientes(datos.clientes);
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  async addJuego(juego) {
    try {
      const datos = await this.getAll();
      const nuevoId = Math.max(...datos.juegos.map(j => j.id || 0), 0) + 1;
      juego.id = nuevoId;
      datos.juegos.push(juego);
      return await this.updateJuegos(datos.juegos);
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  async updateJuego(id, juego) {
    try {
      const datos = await this.getAll();
      const index = datos.juegos.findIndex(j => j.id === parseInt(id));
      if (index !== -1) {
        datos.juegos[index] = { ...datos.juegos[index], ...juego };
        return await this.updateJuegos(datos.juegos);
      }
      throw new Error('Juego no encontrado');
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  async deleteJuego(id) {
    try {
      const datos = await this.getAll();
      datos.juegos = datos.juegos.filter(j => j.id !== parseInt(id));
      return await this.updateJuegos(datos.juegos);
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  async getClientes() {
    try {
      const datos = await this.getAll();
      return datos.clientes || [];
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  async getJuegos() {
    try {
      const datos = await this.getAll();
      return datos.juegos || [];
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
}

const clientesAPI = new DatosService();
const juegosAPI = new DatosService();
