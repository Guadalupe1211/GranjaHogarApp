//import logo from './logo.svg';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import CategoriasPage from './Paginas/Categorias';
import ProductosPorCategoria from './Componentes/ProductosPorCategoria';
import { Productos } from './Paginas/Productos';
import {ProductosPage} from './Paginas/Productos';
import {Home} from './Paginas/Home'
import { BarraNavegacion } from './Componentes/BarraNavegacion';

function App() {
  return (
  <>
      <Router>
      <BarraNavegacion/>
      
        <Routes>
          <Route path="/" element = {<Home/>}/>
          <Route path="/categorias" element={<CategoriasPage />} />
          <Route path="/categorias/:id" element={<ProductosPorCategoria />} />
          <Route path="/Productos/" element={<Productos />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;



