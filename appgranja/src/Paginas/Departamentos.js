import React, { useState, useEffect } from 'react';
import DepartamentosTabla from '../Componentes/DepartamentosTabla';
import * as DepartamentoServices from '../Services/DepartamentoServices';
import '../Departamentos.css';

const DepartamentosPage = () => {
    const [showForm, setShowForm] = useState(false);
    const [departamentoSeleccionado, setDepartamentoSeleccionado] = useState({ id: '', nombre: '', descripcion: '' });
    const [departamentos, setDepartamentos] = useState([]);
    
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const departamentosData = await DepartamentoServices.getDepartamentos();
            setDepartamentos(departamentosData);
        } catch (error) {
            console.error('Error al obtener los departamentos:', error);
        }
    };

    const toggleFormVisibility = () => {
        setShowForm((prevShowForm) => {
            if (prevShowForm) {
                // Limpiar el formulario al ocultarlo
                setDepartamentoSeleccionado({ id: '', nombre: '', descripcion: '' });
            }
            return !prevShowForm;
        });
    };

    const handleDepartamentoGuardado = async () => {
        setShowForm(false);
        setDepartamentoSeleccionado({ id: '', nombre: '', descripcion: '' }); // Limpiar el formulario al guardar
        await fetchData();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const id = departamentoSeleccionado.id;
            const aux = { ...departamentoSeleccionado };
            delete aux.id;
            if (id) {
                await DepartamentoServices.updateDepartamento(id, aux);
                alert('Departamento actualizado correctamente');
            } else {
                await DepartamentoServices.createDepartamento(departamentoSeleccionado);
                alert('Departamento creado correctamente');
            }
            handleDepartamentoGuardado();
        } catch (error) {
            console.error('Error al guardar el departamento:', error);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setDepartamentoSeleccionado((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleEditDepartamento = (departamento) => {
        setDepartamentoSeleccionado(departamento);
        setShowForm(true);
    };

    const handleDeleteDepartamento = async (id) => {
        try {
            await DepartamentoServices.deleteDepartamento(id);
            alert('Departamento eliminado correctamente');
            setDepartamentos((prevDepartamentos) => prevDepartamentos.filter((dep) => dep.id !== id));
        } catch (error) {
            console.error('Error al eliminar el departamento:', error);
        }
    };

    return (
        <div>
            <h1 className="titulo-departamentos">Departamentos</h1>
            <div className="button-container">
                <button
                    className={showForm ? "ocultar-formulario" : "agregar-departamento"}
                    onClick={toggleFormVisibility}
                >
                    {showForm ? 'Ocultar Formulario' : 'Agregar Departamento'}
                </button>
            </div>
            {showForm && (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Nombre:</label>
                        <input
                            type="text"
                            name="nombre"
                            value={departamentoSeleccionado.nombre}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Descripción:</label>
                        <textarea
                            name="descripcion"
                            value={departamentoSeleccionado.descripcion}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit">{departamentoSeleccionado.id ? 'Actualizar Departamento' : 'Crear Departamento'}</button>
                </form>
            )}
            <DepartamentosTabla 
                departamentos={departamentos} 
                onEditDepartamento={handleEditDepartamento} 
                onDeleteDepartamento={handleDeleteDepartamento} 
            />
        </div>
    );
};

export default DepartamentosPage;
