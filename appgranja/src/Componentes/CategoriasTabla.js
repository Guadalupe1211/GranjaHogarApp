import React, { useEffect, useState } from 'react';
import * as CategoriaService from '../Services/CategoriaService';
import { Link } from 'react-router-dom';
import '../CategoriasGaleria.css'; // Importa el archivo de estilos CSS

export const CategoriasGaleria = () => {
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoriasData = await CategoriaService.getCategorias();
                setCategorias(categoriasData);
            } catch (error) {
                console.error('Error al obtener las categorías:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="galeria">
            {categorias.map((categoria) => (
                <div key={categoria.id} className="categoria-card">
                    <Link to={`/categorias/${categoria.id}`} className="categoria-link">
                        <div className="categoria-imagen" style={{backgroundImage: `url(${categoria.imagen})`}}>
                            {/* No es necesario usar la etiqueta <img> */}
                        </div>
                        <div className="categoria-content">
                            <h2>{categoria.nombre}</h2>
                            <p>{categoria.descripcion}</p>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default CategoriasGaleria;
