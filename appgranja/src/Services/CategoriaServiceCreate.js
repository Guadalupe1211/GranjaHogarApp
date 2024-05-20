import axios from 'axios';

// Function to create a new category
export const createCategoria = async (categoriaData) => {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/categorias/', categoriaData);
        return response.data;  // Return the response data
    } catch (error) {
        console.error('Error creating category:', error);
        throw error;
    }
};

// Function to update an existing category by ID
export const updateCategoria = async (id, categoriaData) => {
    try {
        const response = await axios.put(`http://127.0.0.1:8000/api/categorias/${id}/`, categoriaData);
        return response.data;  // Return the updated data
    } catch (error) {
        console.error(`Error updating category with ID ${id}:`, error);
        throw error;
    }
};

// Function to delete a category by ID
export const deleteCategoria = async (id) => {
    try {
        const response = await axios.delete(`http://127.0.0.1:8000/api/categorias/${id}/`);
        return response.data;  // Return the response (usually empty for delete operations)
    } catch (error) {
        console.error(`Error deleting category with ID ${id}:`, error);
        throw error;
    }
};

export const fetchProductsByCategoryId = async (categoryId) => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/productos/?categoria_id=${categoryId}`);
        return response.data;  // Returns the products of the category
    } catch (error) {
        console.error("Failed to fetch products:", error);
        throw error;
    }
};
