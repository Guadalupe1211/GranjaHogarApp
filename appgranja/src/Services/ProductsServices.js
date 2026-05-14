import axios from "axios";
const BASE_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000';

const instance = axios.create({
    baseURL: BASE_URL,
});

export const createProduct = async (productData) => {
    try {
        const response = await axios.post('/api/productos/', productData);
        return response.data;  // Return the response data
    } catch (error) {
        console.error('Error creating product:', error);
        throw error;
    }
};

export const getProducts = async () => {
    try {
        const response = await axios.get('/api/productos/');
        return response.data;  // Return the response data
    } catch (error) {
        console.error('Error getting the products:', error);
        throw error;
    }
};

export const updateProduct = async (id, productData) => {
    try {
        const response = await axios.put(`/api/productos/${id}/`, productData);
        return response.data;
    }catch (error){
        console.error('Error en actualizar el producto', error)
        throw error;
    }
}

export const deleteProduct = async (id) => {
    try {
        const response = await axios.delete(`/api/productos/${id}`)
        return response.data
        
    } catch (error) {
        console.error('Error al borrar el producto', error)
        throw error; 
    }
}
