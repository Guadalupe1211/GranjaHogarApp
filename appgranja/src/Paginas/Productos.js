import React, { useState, useEffect } from 'react';
import { getProducts, updateProduct, deleteProduct } from '../Services/ProductsServices';
import { Product } from '../Componentes/Product';
import CreateProducts from '../Componentes/CreateProducts';
import '../App.css';

export const Productos = () => {
    const [data, setData] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);

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
        setProductoSeleccionado(null);
    };

    const handleDelete = async (id) => {
        try {
            await deleteProduct(id);
            alert('Producto eliminado');
            setData(data.filter(product => product.id !== id));
        } catch (error) {
            console.error('Error deleting product:', error);
            alert('Error deleting product: ' + error.message);
        }
    };

    const handleUpdate = (producto) => {
        setProductoSeleccionado(producto);
        setShowForm(true);
    };

    const handleProductoGuardado = async () => {
        const data = await getProducts();
        setData(data);
        setShowForm(false);
        setProductoSeleccionado(null);
    };

    return (
        <div>
            <h1 className="titulo-productos">Productos</h1>
            <div className="button-container">
                <button
                    className={showForm ? "ocultar-formulario" : "agregar-producto"}
                    onClick={toggleFormVisibility}
                >
                    {showForm ? 'Ocultar Formulario' : 'Agregar Producto'}
                </button>
            </div>
            {showForm && <CreateProducts productoInicial={productoSeleccionado ||
            {
                id: '',
                nombre: '',
                fecha_de_caducidad: '',
                descripcion: '',
                precio: '',
                cantidad_en_stock: '',
                categoria: '',
            }
            } onProductoGuardado={handleProductoGuardado} />}
            <Product products={data} onDelete={handleDelete} onUpdate={handleUpdate} />
        </div>
    );

};
