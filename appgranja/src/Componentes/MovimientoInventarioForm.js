// MovimientoInventarioForm.js
import React, { useState, useEffect } from 'react';
import { getProducts } from '../Services/ProductsServices';
import { getDepartamentos } from '../Services/DepartamentoServices';
import { createMovimiento } from '../Services/MovimientoInvService';

const MovimientoInventarioForm = ({ onMovimientoGuardado }) => {
    const [productos, setProductos] = useState([]);
    const [departamentos, setDepartamentos] = useState([]);
    const [movimiento, setMovimiento] = useState({
        producto_id: '',
        cantidad: '',
        es_entrada: false,
        departamento: '',
    });
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        fetchProductos();
        fetchDepartamentos();
    }, []);

    const fetchProductos = async () => {
        try {
            const data = await getProducts();
            setProductos(data);
        } catch (error) {
            console.error('Error fetching productos:', error);
        }
    };

    const fetchDepartamentos = async () => {
        try {
            const data = await getDepartamentos();
            setDepartamentos(data);
        } catch (error) {
            console.error('Error fetching departamentos:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMovimiento({
            ...movimiento,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createMovimiento(movimiento);
            alert('Movimiento guardado correctamente');
            onMovimientoGuardado();
            setMovimiento({
                producto_id: '',
                cantidad: '',
                es_entrada: false,
                departamento: '',
            });
            setShowForm(false);
        } catch (error) {
            console.error('Error creating movimiento:', error);
        }
    };

    const toggleFormVisibility = () => {
        setShowForm(prevShowForm => !prevShowForm);
    };

    return (
        <div>
            <div className="button-container">
                <button
                    className={showForm ? "ocultar-formulario" : "agregar-movimiento"}
                    onClick={toggleFormVisibility}
                >
                    {showForm ? 'Ocultar Formulario' : 'Agregar Movimiento'}
                </button>
            </div>
            {showForm && (
                <form onSubmit={handleSubmit} className="movimiento-form">
                    <div>
                        <label>Producto:</label>
                        <select
                            name="producto_id"
                            value={movimiento.producto_id}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Seleccione un producto</option>
                            {productos.map((producto) => (
                                <option key={producto.id} value={producto.id}>
                                    {producto.nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Cantidad:</label>
                        <input
                            type="number"
                            name="cantidad"
                            value={movimiento.cantidad}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='checkbox-container'>
                        <label>Entrada a inventario?</label>
                        <input
                            type="checkbox"
                            name="es_entrada"
                            checked={movimiento.es_entrada}
                            onChange={() => setMovimiento({ ...movimiento, es_entrada: !movimiento.es_entrada })}
                        />
                    </div>
                    {!movimiento.es_entrada && (
                        <div>
                            <label>Departamento:</label>
                            <select
                                name="departamento"
                                value={movimiento.departamento}
                                onChange={handleChange}
                            >
                                <option value="">Seleccione un departamento</option>
                                {departamentos.map((departamento) => (
                                    <option key={departamento.id} value={departamento.id}>
                                        {departamento.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                    <button type="submit">Realizar Movimiento</button>
                </form>
            )}
        </div>
    );
};

export default MovimientoInventarioForm;
