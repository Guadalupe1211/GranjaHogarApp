import React, { useState, useEffect } from 'react';
import { createProduct, updateProduct, deleteProduct, getCategories } from '../Services/ProductsServices';
import {getCategorias} from '../Services/CategoriaService'

const ProductoForm = () => {
    const [producto, setProducto] = useState({
        id: '',
        nombre: '',
        fecha_de_caducidad: '',
        descripcion: '',
        precio: '',
        cantidad_en_stock: '',
        categoria: '',
    });

    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categoriesData = await getCategorias();
                setCategorias(categoriesData);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setProducto(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleCreate = async (event) => {
        event.preventDefault();
        try {
            const response = await createProduct({
                nombre: producto.nombre,
                fecha_de_caducidad: producto.fecha_de_caducidad,
                descripcion: producto.descripcion,
                precio: producto.precio,
                cantidad_en_stock: producto.cantidad_en_stock,
                categoria: producto.categoria,
            });
            alert('Producto creado: ' + response.nombre);
            setProducto({ id: '', nombre: '', fecha_de_caducidad: '', descripcion: '', precio: '', cantidad_en_stock: '', categoria: '' });
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    const handleUpdate = async (event) => {
        event.preventDefault();
        if (!producto.id) {
            alert('ID is required for updating a product');
            return;
        }
        try {
            const response = await updateProduct(producto.id, {
                nombre: producto.nombre,
                fecha_de_caducidad: producto.fecha_de_caducidad,
                descripcion: producto.descripcion,
                precio: producto.precio,
                cantidad_en_stock: producto.cantidad_en_stock,
                categoria: producto.categoria,
            });
            alert('Producto actualizado: ' + response.nombre);
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    const handleDelete = async (event) => {
        event.preventDefault();
        if (!producto.id) {
            alert('ID is required to delete a product');
            return;
        }
        try {
            await deleteProduct(producto.id);
            alert('Producto eliminado');
            setProducto({ id: '', nombre: '', fecha_de_caducidad: '', descripcion: '', precio: '', cantidad_en_stock: '', categoria: '' });
        } catch (error) {
            console.error('Error deleting product:', error);
            alert('Error deleting product: ' + error.message);
        }
    };

    return (
        <form>
            <div>
                <label>ID (for update only):</label>
                <input
                    type="text"
                    name="id"
                    value={producto.id}
                    onChange={handleChange}
                    placeholder="ID de Producto"
                />
            </div>
            <div>
                <label>Nombre:</label>
                <input
                    type="text"
                    name="nombre"
                    value={producto.nombre}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Fecha de caducidad:</label>
                <input
                    type="date"
                    name="fecha_de_caducidad"
                    value={producto.fecha_de_caducidad}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Descripción:</label>
                <textarea
                    name="descripcion"
                    value={producto.descripcion}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Precio:</label>
                <input
                    type="number"
                    name="precio"
                    value={producto.precio}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Cantidad:</label>
                <input
                    type="number"
                    name="cantidad_en_stock"
                    value={producto.cantidad_en_stock}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Categoria:</label>
                <select
                    name="categoria"
                    value={producto.categoria}
                    onChange={handleChange}
                    required
                >
                    <option value="">Seleccione una categoría</option>
                    {categorias.map((categoria) => (
                        <option key={categoria.id} value={categoria.id}>
                            {categoria.nombre}
                        </option>
                    ))}
                </select>
            </div>
            <button type="submit" onClick={handleCreate}>Crear Producto</button>
            <button type="submit" onClick={handleUpdate}>Actualizar Producto</button>
            <button type="button" onClick={handleDelete} style={{ backgroundColor: 'red', color: 'white' }}>Eliminar Producto</button>
        </form>
    );
};


export default ProductoForm;