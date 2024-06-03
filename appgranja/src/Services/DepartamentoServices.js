import axios from 'axios';

const API_URL = '/api/departamento';
const DEFAULT_IMAGE_URL = 'https://i.pinimg.com/736x/64/46/a5/6446a512dd4b5d0a2c67fe5ebfb0775f.jpg';

const instance = axios.create({
    baseURL: API_URL,
    timeout: 1000,
});

// Función para obtener todos los departamentos
export const getDepartamentos = async () => {
    try {
        const response = await instance.get();
        const departamentos = response.data.map(departamento => ({
            ...departamento,
            imagen: departamento.imagen || DEFAULT_IMAGE_URL
        }));
        return departamentos;
    } catch (error) {
        console.error('Error al obtener los departamentos:', error);
        throw error;
    }
};

// Función para obtener un departamento por su ID
export const getDepartamentoById = async (id) => {
    try {
        const response = await instance.get(`/${id}/`);
        return {
            ...response.data,
            imagen: response.data.imagen || DEFAULT_IMAGE_URL
        };
    } catch (error) {
        console.error(`Error al obtener el departamento con ID ${id}:`, error);
        throw error;
    }
};

// Función para crear un nuevo departamento
export const createDepartamento = async (departamentoData) => {
    try {
        const response = await instance.post('/', departamentoData);
        return response.data;
    } catch (error) {
        console.error('Error creating department:', error);
        throw error;
    }
};

// Función para actualizar un departamento por ID
export const updateDepartamento = async (id, departamentoData) => {
    try {
        const response = await instance.put(`/${id}/`, departamentoData);
        return response.data;
    } catch (error) {
        console.error(`Error updating department with ID ${id}:`, error);
        throw error;
    }
};

// Función para eliminar un departamento por ID
export const deleteDepartamento = async (id) => {
    try {
        const response = await instance.delete(`/${id}/`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting department with ID ${id}:`, error);
        throw error;
    }
};

export const getDepartamento = async (id) => {
    try {
        const response = await instance.get(`/${id}`);
        return response.data;  // Return the get data
    } catch (error) {
        console.log(`Error getting GetDepartamento ${id}:`);
        //throw error;
    }
};
