// Product.js
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

export const Product = ({ products, onDelete, onUpdate }) => {
    return (
        <>
        <div className="box-space">
            {products.map((product) => (
                <div key={product.id} className="card">
                    <div className="cardBlock">
                        <img src="Productos.png" alt="productos" />
                        <div className="cardMetadata">
                            <h3>{product.nombre}</h3>
                            <h6>{product.fecha_de_caducidad}</h6>
                            <p>{product.descripcion}</p>
                            <h6>{product.procedencia}</h6>
                            <h6>Cantidad: {product.cantidad_en_stock}</h6>
                        </div>
                    </div>
                    <div className="cardContainerButtons">
                        <button className="update-button" onClick={() => onUpdate(product)}>
                            <FontAwesomeIcon icon={faPenToSquare} />
                        </button>
                        <button className="delete-button" onClick={() => onDelete(product.id)}>
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </div>
                </div>
            ))}
            </div>
        </>
    );
};
