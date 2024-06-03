import React, { useState } from 'react';
import '../MovimientoInventario.css';
import MovimientoInventarioForm from '../Componentes/MovimientoInventarioForm';
import MovimientoInventarioList from '../Componentes/MovimientoInventarioList';

const MovimientoInventarioPage = () => {
    const [refresh, setRefresh] = useState(false);

    const handleMovimientoGuardado = () => {
        setRefresh(!refresh);
    };

    return (
        <div className="movimiento-inventario-page">
            <h1 className="page-header">Administración de Movimientos de Inventario</h1>
            <MovimientoInventarioForm onMovimientoGuardado={handleMovimientoGuardado} />
            <MovimientoInventarioList key={refresh} />
        </div>
    );
};

export default MovimientoInventarioPage;
