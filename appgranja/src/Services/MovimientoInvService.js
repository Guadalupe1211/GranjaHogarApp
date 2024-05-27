
const API_URL = 'http://localhost:8000/api/movimientos-inventario/';

export const getMovimientos = async () => {
    const response = await fetch(`${API_URL}`);
    if (!response.ok) {
        throw new Error('Error al obtener los movimientos de inventario');
    }
    return await response.json();
}


