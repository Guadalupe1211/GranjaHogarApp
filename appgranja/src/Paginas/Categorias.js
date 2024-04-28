// CategoriasPage.js
import React from 'react';
//import CategoriasTabla from './CategoriasTabla';
//import CategoriasTabla from './Componentes/CategoriasTabla';
import CategoriasTabla from '../Componentes/CategoriasTabla';
import CreateCategorias from '../Componentes/CreateTabla';


const CategoriasPage = () => {
    return (
        <div>
            <h1>Categorias</h1>
            <CategoriasTabla />
            <CreateCategorias />
    
    

        </div>
    );
};

export default CategoriasPage;

