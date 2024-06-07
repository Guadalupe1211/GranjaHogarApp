//import logo from './logo.svg';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CategoriasPage from './Paginas/Categorias';
import ProductosPorCategoria from './Componentes/ProductosPorCategoria';
import { Productos } from './Paginas/Productos';
import {ProductosPage} from './Paginas/Productos';
import { InventarioDepartamento } from './Componentes/InventarioDepartamento';
import {Home} from './Paginas/Home'
import { BarraNavegacion } from './Componentes/BarraNavegacion';
import DepartamentosPage from './Paginas/Departamentos';
import MovimientoInventarioPage from './Paginas/MovimientoInventario';
import './App.css';
import './BarraNavegacion.css'

function App() {
  return (
  <>
      <Router>
      <BarraNavegacion/>
      
        <Routes>
          <Route path="/" element = {<Home/>}/>
          <Route path="/categorias" element={<CategoriasPage />} />
          <Route path="/productos/:id" element={<ProductosPorCategoria />} />
          <Route path="/Productos/" element={<Productos />} />
          <Route path="/Departamento" element={<DepartamentosPage />} />
          <Route path="/Movimiento-inventario" element={<MovimientoInventarioPage />} />
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
        <Route path="inventario-departamento/:id" element={<InventarioDepartamento/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;



