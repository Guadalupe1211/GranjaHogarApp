import React from 'react';
import MovimientoInventarioList from '../Componentes/MovimientoInventarioList';
import '../MovimientoInventario.css';



const MovimientoInventarioPage = () => {
    return (
        <div className="movimiento-inventario-page">
            <h1 className="page-header">Administración de Movimientos de Inventario</h1>
            <MovimientoInventarioList />
        </div>
    );
};

export default MovimientoInventarioPage;
