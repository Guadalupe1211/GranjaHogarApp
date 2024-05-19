import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Cambia useHistory a useNavigate
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import * as CategoriaService from '../Services/CategoriaService';
import * as CategoriaServiceCreate from '../Services/CategoriaServiceCreate';
import '../CategoriasGaleria.css';

export const CategoriasGaleria = () => {
    const [categorias, setCategorias] = useState([]);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState({ id: '', nombre: '', descripcion: '' });
    const navigate = useNavigate(); // Cambia useHistory a useNavigate

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

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const id = categoriaSeleccionada.id;
            const aux = categoriaSeleccionada;
            delete aux.id;
            if (id) {
                await CategoriaServiceCreate.updateCategoria(id, aux);
                alert('Categoría actualizada correctamente');
            } else {
                await CategoriaServiceCreate.createCategoria(categoriaSeleccionada);
                alert('Categoría creada correctamente');
            }
            const categoriasData = await CategoriaService.getCategorias();
            setCategorias(categoriasData);
            setCategoriaSeleccionada({ id: '', nombre: '', descripcion: '' });
        } catch (error) {
            console.error('Error al guardar la categoría:', error);
        }
    };

    const handleUpdate = (categoria) => {
        setCategoriaSeleccionada(categoria);
    };

    const handleDelete = async (id) => {
        try {
            await CategoriaServiceCreate.deleteCategoria(id);
            alert('Categoría eliminada correctamente');
            setCategorias((prevCategorias) => prevCategorias.filter((cat) => cat.id !== id));
        } catch (error) {
            console.error('Error al eliminar la categoría:', error);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCategoriaSeleccionada((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleCategoryClick = (categoriaId) => {
        navigate(`/productos/${categoriaId}`); // Cambia history.push a navigate
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre:</label>
                    <input
                        type="text"
                        name="nombre"
                        value={categoriaSeleccionada.nombre}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Descripción:</label>
                    <textarea
                        name="descripcion"
                        value={categoriaSeleccionada.descripcion}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">{categoriaSeleccionada.id ? 'Actualizar Categoría' : 'Crear Categoría'}</button>
            </form>

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
