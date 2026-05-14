const BASE_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000';
const API_URL = `${BASE_URL}/api/movimientos-inventario/`;

//const API_URL = '/api/movimientos-inventario/';

export const getMovimientos = async () => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error('Error al obtener los movimientos de inventario');
    }
    return await response.json();
}

export const createMovimiento = async (movimiento) => {
    const response = await fetch(API_URL, {
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
