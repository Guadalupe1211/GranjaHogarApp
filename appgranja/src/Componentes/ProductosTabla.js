// CategoriasTabla.js
import React, { useEffect, useState } from 'react';
import * as CategoriaService from '../Services/CategoriaService';
import { Link } from 'react-router-dom';


export const ProductosTabla = () => {
    const [productos, setProductos] = useState([]);

//AYUDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
   

    useEffect(() => {
        CategoriaService.getProductos().then(setCategorias).catch(console.error);
    }, []);

    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Descripción</th>
                </tr>
            </thead>
            <tbody>
                {categorias.map((categoria) => (
                    <tr key={categoria.id}>
                        <td>{categoria.id}</td>
                        <td><Link to={`/categorias/${categoria.id}`}>
                        {categoria.nombre}
                        </Link>
                        </td>
                        <td>{categoria.descripcion}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default CategoriasTabla;