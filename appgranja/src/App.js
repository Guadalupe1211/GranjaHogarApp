//import logo from './logo.svg';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import CategoriasPage from './Paginas/Categorias';
import ProductosPorCategoria from './Componentes/ProductosPorCategoria';
import { Productos } from './Paginas/Productos';
import {ProductosPage} from './Paginas/Productos';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1> Inventario </h1>
      </header>
      <Router>
        <Routes>
          <Route path="/categorias" element={<CategoriasPage />} />
          <Route path="/productos/:id" element={<ProductosPorCategoria />} />
          <Route path="/Productos/" element={<Productos />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;



