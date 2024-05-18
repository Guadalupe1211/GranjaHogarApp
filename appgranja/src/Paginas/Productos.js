// CombinedProductsPage.js
import React, { useState, useEffect } from 'react';
import { getProducts } from '../Services/ProductsServices';
import { Product } from '../Componentes/Product';
import CreateProducts from '../Componentes/CreateProducts';

export const Productos = () => {
    const [data, setData] = useState([]);

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

    return (
        <div>
            <h1>Productos</h1>
            <CreateProducts />
            <Product products={data} />
        </div>
    );
};
