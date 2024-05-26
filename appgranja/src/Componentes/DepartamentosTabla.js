import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

import * as DepartamentoServices from '../Services/DepartamentoServices';
import '../Departamentos.css';

const DepartamentosTabla = ({ onEditDepartamento }) => {
    const [departamentos, setDepartamentos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const departamentosData = await DepartamentoServices.getDepartamentos();
                setDepartamentos(departamentosData);
            } catch (error) {
                console.error('Error al obtener los departamentos:', error);
            }
        };

        fetchData();
    }, []);

    const handleUpdate = (departamento) => {
        onEditDepartamento(departamento);
    };

    const handleDelete = async (id) => {
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
            <div className="galeria">
                {departamentos.map((departamento) => (
                    <div key={departamento.id} className="departamento-card">
                        <div className="departamento-imagen" style={{ backgroundImage: `url(${departamento.imagen})` }}></div>
                        <div className="departamento-content">
                            <div className="departamento-header">
                                <h2>{departamento.nombre}</h2>
                                <div className="departamento-buttons">
                                    <button className="update-button" onClick={(e) => { e.stopPropagation(); handleUpdate(departamento); }}>
                                        <FontAwesomeIcon icon={faPenToSquare} />
                                    </button>
                                    <button className="delete-button" onClick={(e) => { e.stopPropagation(); handleDelete(departamento.id); }}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </div>
                            </div>
                            <p>{departamento.descripcion}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DepartamentosTabla;
