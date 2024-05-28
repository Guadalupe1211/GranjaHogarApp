//import logo from './logo.svg';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import CategoriasPage from './Paginas/Categorias';
import ProductosPorCategoria from './Componentes/ProductosPorCategoria';
import { Productos } from './Paginas/Productos';
import {ProductosPage} from './Paginas/Productos';
import { InventarioDepartamento } from './Componentes/InventarioDepartamento';
import { InventarioDepartamentos } from './Paginas/InventarioDepartamentos';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1> Inventario </h1>
      </header>
      <Router>
        <Routes>
          <Route path="/categorias" element={<CategoriasPage />} />
          <Route path="/categorias/:id" element={<ProductosPorCategoria />} />
          <Route path="/Productos/" element={<Productos />} />
          {/* <Route path="inventario-departamento" element={ <InventarioDepartamento Departamento={[{
        "id": 0,
        "producto": {
            "id": 0,
            "nombre": "producto",
            "fecha_de_caducidad": null,
            "descripcion": "descripcion",
            "precio": "0",
            "cantidad_en_stock": 6,
            "categoria": 0
        },
        "departamento": 3,
        "cantidad_en_stock": 0
    }]}/>}/> */}
        <Route path="inventario-departamento" element={<InventarioDepartamentos/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;



