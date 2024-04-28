import React, { useState } from 'react';
import { createCategoria, updateCategoria, deleteCategoria } from '../Services/CategoriaServiceCreate';


const CategoriaForm = () => {
    const [categoria, setCategoria] = useState({
        id: '', // This will be empty for POST and filled for PUT
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
            // Clear form after posting
            setCategoria({ id: '', nombre: '', descripcion: '' });
        } catch (error) {
            console.error('Error creating category:', error);
        }
        window.location.reload();
    };

    const handleUpdate = async (event) => {
        event.preventDefault();
        if (!categoria.id) {
            alert('ID is required for updating a category');
            return;
        }
        try {
            const response = await updateCategoria(categoria.id, {
                nombre: categoria.nombre,
                descripcion: categoria.descripcion
            });
            alert('Categoría actualizada: ' + response.nombre);
        } catch (error) {
            console.error('Error updating category:', error);
        }
        window.location.reload();
    };

    const handleDelete = async (event) => {
        event.preventDefault();
        if (!categoria.id) {
            alert('ID is required to delete a category');
            return;
        }
        try {
            await deleteCategoria(categoria.id);
            alert('Categoría eliminada');
            setCategoria({ id: '', nombre: '', descripcion: '' }); // Clear form after deletion
        } catch (error) {
            console.error('Error deleting category:', error);
            alert('Error deleting category: ' + error.message);
        }
    };

    return (
        <form>
            <div>
                <label>ID (for update only):</label>
                <input
                    type="text"
                    name="id"
                    value={categoria.id}
                    onChange={handleChange}
                    placeholder="ID de Categoría"
                />
            </div>
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
            <button type="submit" onClick={handleUpdate}>Actualizar Categoría</button>
        
        {/* Form inputs for ID, nombre, descripcion here */}
        
            <button type="button" onClick={handleDelete} style={{ backgroundColor: 'red', color: 'white' }}>Eliminar Categoría</button>
        
        </form>
    );
};

export default CategoriaForm;
