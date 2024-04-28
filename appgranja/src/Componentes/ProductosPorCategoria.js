import React, { useState, useEffect } from 'react';
import { fetchProductsByCategoryId } from '../Services/CategoriaServiceCreate';
import { useParams } from 'react-router-dom';


const ProductosPorCategoria = () => {
    const { id } = useParams();
    const [Productos, setProductos] = useState([]);
    console.log (id)
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


    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Codigo de barra</th>
                    <th>Descripción</th>
                    <th>Precio</th>
                    <th>Cantidad en stock</th>
                    <th>Categoria</th>

                </tr>
            </thead>
            <tbody>
                {Productos.map((productos) => (
                    <tr key={productos.id}>
                        <td>{productos.id}</td>
                        <td>{productos.nombre}</td>
                        <td>{productos.codigo_barra}</td>
                        <td>{productos.descripcion}</td>
                        <td>{productos.precio}</td>
                        <td>{productos.cantidad_en_stock}</td>
                        <td>{productos.categoria}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ProductosPorCategoria;
