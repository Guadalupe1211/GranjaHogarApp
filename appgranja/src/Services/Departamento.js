import axios from 'axios';

// Function to get ID
export const getDepartamento = async (id) => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/departamento/${id}`);
        return response.data;  // Return the get data
    } catch (error) {
        console.error(`Error getting GetDepartamento ${id}:`, error);
        throw error;
    }
};