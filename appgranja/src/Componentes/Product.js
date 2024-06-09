// Product.js
import React, { useState, useEffect } from 'react';
// import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

export const Product = ({ products, onDelete, onUpdate }) => {
    /*control de delete*/
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [selectedID, setSelectedID] = useState(null)
    /**/
    return (
        <>
            <div className="box-space">
                {products.map((product) => (
                    <div key={product.id} className="card">
                        <div className="cardBlock">
                            <img src="/productos.png" alt="productos" />
                            <div className="cardMetadata">
                                <h3>{product.nombre}</h3>
                                <h6>{product.fecha_de_caducidad}</h6>
                                <p className='descripcion-producto'>{product.descripcion}</p>
                                <h6>{product.procedencia}</h6>
                                <h6>Cantidad: {product.cantidad_en_stock}</h6>
                            </div>
                        </div>
                        <div className="cardContainerButtons">
                            <button className="update-button" onClick={() => onUpdate(product)}>
                                <FontAwesomeIcon icon={faPenToSquare} />
                            </button>
                            <button className="delete-button" onClick={() => { setSelectedID(product.id); setShowConfirmation(!showConfirmation) }}> {/*onDelete(product.id)*/}
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </div>
                        <div>
                            {/*confirmación*/}
                            {showConfirmation && selectedID === product.id && (
                                <div className='delete-confirmation'>
                                    <p><strong>¿Estas seguro de querer borrar este producto?</strong>Esto borrará su historial en movimiento inventario</p>
                                    <button className='boton-si' onClick={() => { onDelete(product.id) }}>Si</button>
                                    <button className='boton-no' onClick={() => { setShowConfirmation(false) }}>No</button>
                                </div>
                            )} {/**/}
                        </div>
                    </div>

                ))}
            </div>
        </>
    );
};
