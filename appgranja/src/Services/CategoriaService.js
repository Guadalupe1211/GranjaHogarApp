// CategoriaService.js
import axios from 'axios';

// Configura la URL base de tu API
const API_URL = 'http://localhost:8000/api/categorias';

// Crear una instancia de Axios con la configuración base
const instance = axios.create({
    baseURL: API_URL,
    timeout: 1000,
});

// URL de la imagen predeterminada
const DEFAULT_IMAGE_URL = 'https://media.istockphoto.com/id/1364776788/es/vector/ilustraci%C3%B3n-vectorial-de-donaci%C3%B3n-de-comestibles-de-cajas-de-alimentos-contenedor-de-cart%C3%B3n.jpg?s=612x612&w=0&k=20&c=6zP-AmwNOgxyjw20P3r72gyAtQkIRlrWj3dd9NJQMVk=';

// Función para obtener todas las categorías
export const getCategorias = async () => {
    
    try {
        const response = await instance.get(API_URL);
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
