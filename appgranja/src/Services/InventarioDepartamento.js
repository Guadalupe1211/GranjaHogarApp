import axios from 'axios';

// Function to delete InventarioDepartamento
export const deleteInventarioDepartamento = async (id) => {
    try {
        const response = await axios.delete(`/api/inventario-departamento/${id}/`);
        return response.data;  // Return the response (usually empty for delete operations)
    } catch (error) {
        console.error(`Error deleting InventarioDepartamento with ID ${id}:`, error);
        throw error;
    }
};

// Function to update InventarioDepartamento
export const updateInventarioDepartamento = async (id, categoriaData) => {
    try {
        const response = await axios.put(`/api/inventario-departamento/${id}/`, categoriaData);
        return response.data;  // Return the updated data
    } catch (error) {
        console.error(`Error updating InventarioDepartamento with ID ${id}:`, error);
        throw error;
    }
};

// Function to get InventarioDepartamento
export const getInventarioDepartamento = async () => {
    try {
        const response = await axios.get(`/api/inventario-departamento/`);
        return response.data;  // Return the get data
    } catch (error) {
        console.error(`Error getting InventarioDepartamento:`, error);
        throw error;
    }
};
