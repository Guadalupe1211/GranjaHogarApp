import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import * as CategoriaService from '../Services/CategoriaService';
import * as CategoriaServiceCreate from '../Services/CategoriaServiceCreate';

export const CategoriasGaleria = ({ onEditCategoria,updated  }) => {
    const [categorias, setCategorias] = useState([]);
    const navigate = useNavigate();
    const [lastUpdate, setLastUpdate] = useState(Date.now());

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoriasData = await CategoriaService.getCategorias();
                setCategorias(categoriasData);
            } catch (error) {
                console.error('Error al obtener las categorías:', error);
            }
        };
	console.log("fetching data")
        fetchData();
    }, [lastUpdate,updated]);

    const handleUpdate = (categoria) => {
        onEditCategoria(categoria);
	setLastUpdate(Date.now())
    };

    const handleDelete = async (id) => {
        try {
            await CategoriaServiceCreate.deleteCategoria(id);
            alert('Categoría eliminada correctamente');
            setCategorias((prevCategorias) => prevCategorias.filter((cat) => cat.id !== id));
        } catch (error) {
            console.error('Error al eliminar la categoría:', error);
        }
	    setLastUpdate(Date.now())
    };

    const handleCategoryClick = (categoriaId) => {
        navigate(`/productos/${categoriaId}`);
    };

    return (
        <div>
            <div className="galeria">
                {categorias.map((categoria) => (
                    <div key={categoria.id} className="categoria-card" onClick={() => handleCategoryClick(categoria.id)}>
                        <div className="categoria-imagen" style={{ backgroundImage: `url(${categoria.imagen})` }}></div>
                        <div className="categoria-content">
                            <div className="categoria-header">
                                <h2>{categoria.nombre}</h2>
                                <div className="categoria-buttons">
                                    <button className="update-button" onClick={(e) => { e.stopPropagation(); handleUpdate(categoria); }}>
                                        <FontAwesomeIcon icon={faPenToSquare} />
                                    </button>
                                    <button className="delete-button" onClick={(e) => { e.stopPropagation(); handleDelete(categoria.id); }}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </div>
                            </div>
                            <p>{categoria.descripcion}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoriasGaleria;
