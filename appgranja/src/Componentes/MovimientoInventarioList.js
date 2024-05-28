import React, { useEffect, useState } from 'react';
import { getMovimientos } from '../Services/MovimientoInvService';
import '../MovimientoInventario.css';

const MovimientoInventarioList = () => {
    const [movimientos, setMovimientos] = useState([]);

    useEffect(() => {
        fetchMovimientos();
    }, []);

    const fetchMovimientos = async () => {
        try {
            const data = await getMovimientos();
            setMovimientos(data);
        } catch (error) {
            console.error('Error fetching movimientos:', error);
        }
    };

    return (
        <div>
            
            <table>
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Fecha</th>
                        <th>Cantidad</th>
                        <th>Estado</th>
                        <th>Departamento</th>
                    </tr>
                </thead>
                <tbody>
                    {movimientos.map(movimiento => (
                        <tr key={movimiento.id}>
                            <td>{movimiento.producto.nombre}</td>
                            <td>{movimiento.fecha}</td>
                            <td>{movimiento.cantidad}</td>
                            <td>{movimiento.es_entrada ? 'Entra' : 'Sale'}</td>
                            <td>{movimiento.departamento ? movimiento.departamento.nombre : 'N/A'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MovimientoInventarioList;
