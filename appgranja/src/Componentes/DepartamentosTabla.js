import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import '../Departamentos.css';

const DepartamentosTabla = ({ departamentos, onEditDepartamento, onDeleteDepartamento }) => {
    const handleUpdate = (departamento) => {
        onEditDepartamento(departamento);
    };

    const handleDelete = (id) => {
        onDeleteDepartamento(id);
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
