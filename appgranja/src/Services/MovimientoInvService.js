
const API_URL = 'http://localhost:8000/api/movimientos-inventario/';

export const getMovimientos = async () => {
    const response = await fetch(`${API_URL}`);
    if (!response.ok) {
        throw new Error('Error al obtener los movimientos de inventario');
    }
    return await response.json();
}

export const createMovimiento = async (movimiento) => {
    const response = await fetch(`${API_URL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(movimiento),
    });
    if (!response.ok) {
        throw new Error('Error al crear el movimiento de inventario');
    }
    return await response.json();
};
