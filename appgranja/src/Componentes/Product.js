// Product.js
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

export const Product = ({ products, onDelete, onUpdate }) => {
    return (
        <>
            {products.map((product) => (
                <div key={product.id} className="card">
                    <div className="cardBlock">
                        <img src="https://static.vecteezy.com/system/resources/previews/003/005/280/original/chlorine-canister-icon-on-white-vector.jpg" alt="product" />
                        <div className="cardMetadata">
                            <h3>{product.nombre}</h3>
                            <h6>{product.fecha_de_caducidad}</h6>
                            <p>{product.descripcion}</p>
                            <h6>${product.precio}</h6>
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
        </>
    );
};
