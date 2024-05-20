import React, { useState, useEffect  } from 'react';
import CategoriasGaleria from '../Componentes/CategoriasTabla';
import * as CategoriaServiceCreate from '../Services/CategoriaServiceCreate';
import '../CategoriasGaleria.css';
import '../Categorias.css';
import * as CategoriaService from '../Services/CategoriaService';
const CategoriasPage = () => {
    const [showForm, setShowForm] = useState(false);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState({ id: '', nombre: '', descripcion: '' });
    const [categorias, setCategorias] = useState([]);
    
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const categoriasData = await CategoriaService.getCategorias();
            setCategorias(categoriasData);
        } catch (error) {
            console.error('Error al obtener las categorías:', error);
        }
    };

    const toggleFormVisibility = () => {
        setShowForm(prevShowForm => !prevShowForm);
    };

    const handleCategoriaGuardada = async () => {
        setShowForm(false);
        await fetchData();
        // Recargar las categorías después de guardar
    };

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
            // Recargar las categorías después de guardar
            handleCategoriaGuardada();
        } catch (error) {
            console.error('Error al guardar la categoría:', error);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCategoriaSeleccionada((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleEditCategoria = (categoria) => {
        setCategoriaSeleccionada(categoria);
        setShowForm(true);
    };

    return (
        <div>
            <h1>Categorías</h1>
            <div className="button-container">
                <button
                    className="btn btn-primary"
                    onClick={toggleFormVisibility}
                >
                    {showForm ? 'Ocultar Formulario' : 'Agregar Categoría'}
                </button>
            </div>
            {showForm && (
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
            )}
            <CategoriasGaleria onEditCategoria={handleEditCategoria} />
        </div>
    );
};

export default CategoriasPage;
