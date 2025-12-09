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
const clientesAPI = new APIService('clientes');
const juegosAPI = new APIService('juegos');
