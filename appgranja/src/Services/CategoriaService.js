import axios from 'axios';

// Configura la URL base de tu API
const API_URL = 'http://localhost:8000/api/categorias';


// Crear una instancia de Axios con la configuración base
const instance = axios.create({
    baseURL: API_URL,
    timeout: 1000,
});

// Función para obtener todas las categorías
export const getCategorias = async () => {
    try {
        const response = await instance.get(API_URL);
        //const response = await instance.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error al obtener las categorías:', error);
        throw error;
    }
};

// Función para obtener una categoría por su ID
export const getCategoriaById = async (id) => {
    try {
        const response = await instance.get(`/${id}/`);
        
        return response.data;
    } catch (error) {
        console.error(`Error al obtener la categoría con ID ${id}:`, error);
        throw error;
    }
};



