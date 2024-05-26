import React, { useState, useEffect } from 'react';
import { createProduct, updateProduct } from '../Services/ProductsServices';
import { getCategorias } from '../Services/CategoriaService';

const ProductoForm = ({ productoInicial, onProductoGuardado }) => {
    
    const [producto, setProducto] = useState(productoInicial);
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

    useEffect(() => {
        setProducto(productoInicial);
    }, [productoInicial]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setProducto(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const id = producto.id;
            const aux = producto;
            delete aux.id;
            if (id) {
                
                await updateProduct(id, aux);
                alert('Producto actualizado correctamente');
            } else {
                await createProduct(producto);
                alert('Producto creado correctamente');
            }
            onProductoGuardado();
        } catch (error) {
            console.error('Error al guardar el producto:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
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
            <label>Estado:</label>
                <select
                    name="estado"
                    value={producto.estado}
                    onChange={handleChange}
                    required
                >
                    <option value="">Seleccione un estado</option>
                    <option value="donado">Donado</option>
                    <option value="comprado">Comprado</option>
                </select>
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
            <button type="submit">{producto.id ? 'Actualizar Producto' : 'Crear Producto'}</button>
        </form>
    );
};

ProductoForm.defaultProps = {
    productoInicial: {
        id: '',
        nombre: '',
        fecha_de_caducidad: '',
        descripcion: '',
        precio: '',
        cantidad_en_stock: '',
        categoria: '',
    }
};

export default ProductoForm;
