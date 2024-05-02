import React, { useState, useEffect } from 'react';
import { fetchProductsByCategoryId } from '../Services/CategoriaServiceCreate';
import { useParams } from 'react-router-dom';
import { Product } from './Product';


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
      <Product products={Productos}/>
    );
};

export default ProductosPorCategoria;
