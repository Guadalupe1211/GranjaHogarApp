import React, { useState } from 'react';
import { createCategoria } from '../Services/CategoriaServiceCreate';

const CreateCategorias = ({ onCategoriaGuardada }) => {
    const [categoria, setCategoria] = useState({
        id: '',
        nombre: '',
        descripcion: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCategoria(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleCreate = async (event) => {
        event.preventDefault();
        try {
            const response = await createCategoria({
                nombre: categoria.nombre,
                descripcion: categoria.descripcion
            });
            alert('Categoría creada: ' + response.nombre);
            setCategoria({ id: '', nombre: '', descripcion: '' });
            if (onCategoriaGuardada) {
                onCategoriaGuardada(); // Aquí llamamos a la función para actualizar la lista de categorías
            }
        } catch (error) {
            console.error('Error creating category:', error);
        }
    };

    return (
        <form>
            <div>
                <label>Nombre:</label>
                <input
                    type="text"
                    name="nombre"
                    value={categoria.nombre}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Descripción:</label>
                <textarea
                    name="descripcion"
                    value={categoria.descripcion}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit" onClick={handleCreate}>Crear Categoría</button>
        </form>
    );
};

export default CreateCategorias;
