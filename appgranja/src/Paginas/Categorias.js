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
    const [lastUpdate, setLastUpdate] = useState(Date.now())

    useEffect(() => {
        fetchData();
	    
    }, [lastUpdate]);

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
        setCategoriaSeleccionada ({
            id: '',
            nombre: '',
            descripcion: ''
        })
    };

    const handleCategoriaGuardada = async (categoriaActualizada) => {
        setShowForm(false);
        if (categoriaActualizada.id) {
            setCategorias(prevCategorias =>
                prevCategorias.map(cat => (cat.id === categoriaActualizada.id ? categoriaActualizada : cat))
            );
            setCategoriaSeleccionada ({
                id: '',
                nombre: '',
                descripcion: ''
            })
        } else {
            fetchData();
        }
	    setLastUpdate(Date.now())
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const id = categoriaSeleccionada.id;
            const aux = categoriaSeleccionada;
            delete aux.id;
            if (id) {
                const updatedCategoria = await CategoriaServiceCreate.updateCategoria(id, aux);
                alert('Categoría actualizada correctamente');
                handleCategoriaGuardada(updatedCategoria);
                setCategoriaSeleccionada ({
                    id: '',
                    nombre: '',
                    descripcion: ''
                })
		    setLastUpdate(Date.now())
            } else {
                const nuevaCategoria = await CategoriaServiceCreate.createCategoria(categoriaSeleccionada);
                alert('Categoría creada correctamente');
                setShowForm(false);
                setCategorias([...categorias, nuevaCategoria]);
                setCategoriaSeleccionada ({
                    id: '',
                    nombre: '',
                    descripcion: ''
                })
              setLastUpdate(Date.now()) 
            }
            
        } catch (error) {
            console.error('Error al guardar la categoría:', error);
        }
	    setLastUpdate(Date.now())
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
	    setLastUpdate(Date.now())
    };

    return (
        <div>
            <h1 className="titulo-categorias">Categorías</h1>
            <div className="button-container">
            <button
                    className={showForm ? "ocultar-formulario" : "agregar-categoria"}
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
            <CategoriasGaleria onEditCategoria={handleEditCategoria} updated={lastUpdate}/>
        </div>
    );
};

export default CategoriasPage;
