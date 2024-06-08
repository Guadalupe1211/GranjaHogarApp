// CategoriaService.js
import axios from 'axios';

// Configura la URL base de tu API
const API_URL = '/api/categorias';

// Crear una instancia de Axios con la configuración base
const instance = axios.create({
    baseURL: API_URL,
    timeout: 1000,
});

// URL de la imagen predeterminada
const DEFAULT_IMAGE_URL = 'Categorias.png';

// Función para obtener todas las categorías
export const getCategorias = async () => {
    
    try {
        const response = await instance.get();
        const categorias = response.data.map(categoria => ({
            ...categoria,
            
            imagen: categoria.imagen || DEFAULT_IMAGE_URL // Usa la imagen de la categoría o la predeterminada
        }));
        return categorias;
    } catch (error) {
        console.error('Error al obtener las categorías:', error);
        throw error;
    }
};

// Función para obtener una categoría por su ID
export const getCategoriaById = async (id) => {
    try {
        const response = await instance.get(`/${id}/`);
        return {
            ...response.data,
            imagen: response.data.imagen || DEFAULT_IMAGE_URL // Usa la imagen de la categoría o la predeterminada
        };
    } catch (error) {
        console.error(`Error al obtener la categoría con ID ${id}:`, error);
        throw error;
    }
};
