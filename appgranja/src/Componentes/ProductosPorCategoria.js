import React, { useState, useEffect } from 'react';
import { createProduct, updateProduct, deleteProduct } from '../Services/ProductsServices';
import { fetchProductsByCategoryId } from '../Services/CategoriaServiceCreate';
import { useParams } from 'react-router-dom';
import { Product } from './Product';
import ProductoForm from './CreateProducts';

const ProductosPorCategoria = () => {
    const { id } = useParams();
    const [productos, setProductos] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);

    useEffect(() => {
        const cargarProductos = async () => {
            try {
                const fetchedProductos = await fetchProductsByCategoryId(id);
                setProductos(fetchedProductos);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        cargarProductos();
    }, [id]);

    const toggleFormVisibility = () => {
        setShowForm(prevShowForm => !prevShowForm);
        setProductoSeleccionado(null);
    };

    const handleDelete = async (id) => {
        try {
            await deleteProduct(id);
            alert('Producto eliminado');
            setProductos(productos.filter(product => product.id !== id));
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
        const fetchedProductos = await fetchProductsByCategoryId(id);
        setProductos(fetchedProductos);
        setShowForm(false);
        setProductoSeleccionado(null);
    };

    return (
        <div>
            <h1 className="titulo-productos">Productos de la Categoría</h1>
            <div className="button-container">
                <button
                    className={showForm ? "ocultar-formulario" : "agregar-producto"}
                    onClick={toggleFormVisibility}
                >
                    {showForm ? 'Ocultar Formulario' : 'Agregar Producto'}
                </button>
            </div>
            {showForm && <ProductoForm productoInicial={productoSeleccionado || {
                id: '',
                nombre: '',
                fecha_de_caducidad: '',
                descripcion: '',
                precio: '',
                cantidad_en_stock: '',
                categoria: id, // Fijar la categoría al id actual
            }} onProductoGuardado={handleProductoGuardado} />}
            <Product products={productos} onDelete={handleDelete} onUpdate={handleUpdate} />
        </div>
    );
};

export default ProductosPorCategoria;
