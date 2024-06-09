import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import * as CategoriaService from '../Services/CategoriaService';
import * as CategoriaServiceCreate from '../Services/CategoriaServiceCreate';

export const CategoriasGaleria = ({ onEditCategoria, updated }) => {
    const [categorias, setCategorias] = useState([]);
    const navigate = useNavigate();
    const [lastUpdate, setLastUpdate] = useState(Date.now());
    /*control de delete*/
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [selectedID,setSelectedID]=useState(null)
    /**/
    
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
    }, [lastUpdate, updated]);

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
                                    {/*control de delete*/}
                                    <div>
                                        <button className="delete-button" onClick={(e) => { e.stopPropagation();setSelectedID(categoria.id) ;setShowConfirmation(!showConfirmation)}}> 
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </div>
                                </div>
                                
                            </div>
                            {/*confirmación*/}
                            {showConfirmation && selectedID===categoria.id &&(
                                    <div className='delete-confirmation'>
                                        <p><strong>¿Estas seguro de querer borrar esta categoría?</strong>Esto borrará los productos asociados a ella y su historial en movimiento inventario</p>
                                        <button className='boton-si' onClick={(e) => { e.stopPropagation(); handleDelete(categoria.id) }}>Si</button>
                                        <button className='boton-no' onClick={(e) => { e.stopPropagation(); setShowConfirmation(false) }}>No</button>
                                    </div>
                                )} {/**/}
                            <p>{categoria.descripcion}</p>
                        </div>
                    </div>
                ))}
            </div>
            {/* Show confirmation dialog */}

        </div>
    );
};

export default CategoriasGaleria;
