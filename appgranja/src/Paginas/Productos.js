// Productos.js
import React, { useState, useEffect } from 'react';
import { getProducts } from '../Services/ProductsServices';
import { Product } from '../Componentes/Product';
import CreateProducts from '../Componentes/CreateProducts';

export const Productos = () => {
    const [data, setData] = useState([]);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await getProducts();
                setData(data);
                console.log(data);
            } catch (error) {
                console.error("Error while getting products");
                throw error;
            }
        };
        loadProducts();
    }, []);

    const toggleFormVisibility = () => {
        setShowForm(prevShowForm => !prevShowForm);
    };

    return (
        <div>
            <h1>Productos</h1>
            <button onClick={toggleFormVisibility}>
                {showForm ? 'Ocultar Formulario' : 'Agregar Producto'}
            </button>
            {showForm && <CreateProducts />}
            <Product products={data} />
        </div>
    );
};
