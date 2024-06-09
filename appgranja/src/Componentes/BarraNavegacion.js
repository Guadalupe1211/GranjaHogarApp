import React from "react";
import { NavLink } from "react-router-dom";

export const BarraNavegacion = () => {


    return (
        <nav className="navbar-custom"> {/* Add the custom class here */}
            <div className="home-section">
                
                    <NavLink to="/" activeclassname="active">
                        <img src="/logoNombre.png" alt="Home"></img>
                    </NavLink>
                
                </div>
            <ul>
                <li>
                    <NavLink to="/Categorias" activeclassname="active">
                        Categorias
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/Productos" activeclassname="active">
                        Productos
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/Departamento" activeclassname="active">
                        Departamentos
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/Movimiento-inventario" activeclassname="active">
                        Movimiento de inventario
                    </NavLink>
                </li>
                {/* Add more NavLink components for other navigation items */}
            </ul>

        </nav>

    );
};