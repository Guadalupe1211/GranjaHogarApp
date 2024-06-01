import React, { useEffect, useState } from 'react';
import '../MovimientoInventario.css';
import { getMovimientos } from '../Services/MovimientoInvService';
import { getDepartamentos } from '../Services/DepartamentoServices';

const MovimientoInventarioList = () => {
    const [movimientos, setMovimientos] = useState([]);
    const [nombreDepartamento, setNombreDepartamento] = useState({1:""});


    useEffect(() => {
        fetchMovimientos();
        getNombresDepartamento();
    }, []);

    const fetchMovimientos = async () => {
        try {
            const data = await getMovimientos();
            setMovimientos(data);
            console.log(data)
        } catch (error) {
            console.error('Error fetching movimientos:', error);
        }
    };
    const getNombresDepartamento = async () => {
        try {
            const data = await getDepartamentos();
            const deptMap = data.reduce((map, dept) => {
                map[dept.id] = dept.nombre;
                return map;
            }, {});
            setNombreDepartamento(deptMap);
        } catch (error) {
            console.error('Error fetching departamentos:', error);
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
                            <td>{nombreDepartamento[movimiento.departamento] || 'N/A'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MovimientoInventarioList;
