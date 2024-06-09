import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import '../Departamentos.css';
import { useNavigate } from 'react-router-dom';

const DepartamentosTabla = ({ departamentos, onEditDepartamento, onDeleteDepartamento }) => {
    /*control de delete*/
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [selectedID, setSelectedID] = useState(null)
    /**/

    const navigate = useNavigate()
    const handleUpdate = (departamento) => {
        onEditDepartamento(departamento);
    };

    const handleDelete = (id) => {
        onDeleteDepartamento(id);
    };

    const handleCardCLick = (id) => {

        navigate(`/inventario-departamento/${id}`)

    }

    return (
        <div>
            <div className="galeria">
                {departamentos.map((departamento) => (
                    <div key={departamento.id} className="departamento-card" onClick={() => handleCardCLick(departamento.id)}>
                        <div className="departamento-imagen" style={{ backgroundImage: `url(${departamento.imagen})` }}></div>
                        <div className="departamento-content">
                            <div className="departamento-header">
                                <h2>{departamento.nombre}</h2>
                                <div className="departamento-buttons">
                                    <button className="update-button" onClick={(e) => { e.stopPropagation(); handleUpdate(departamento); }}>
                                        <FontAwesomeIcon icon={faPenToSquare} />
                                    </button>
                                    <button className="delete-button" onClick={(e) => { e.stopPropagation(); setSelectedID(departamento.id); setShowConfirmation(!showConfirmation); }}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </div>
                                {/*confirmación*/}
                            </div>
                            <div>
                                {showConfirmation && selectedID === departamento.id && (
                                    <div className='delete-confirmation'>
                                        <p><strong>¿Estas seguro de querer borrar esta departamento?</strong>Esto borrará su historial en movimiento inventario</p>
                                        <button className='boton-si' onClick={(e) => { e.stopPropagation(); handleDelete(departamento.id) }}>Si</button>
                                        <button className='boton-no' onClick={(e) => { e.stopPropagation(); setShowConfirmation(false) }}>No</button>
                                    </div>
                                )} {/**/}</div>
                            <p>{departamento.descripcion}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DepartamentosTabla;
