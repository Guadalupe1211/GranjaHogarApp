import React from "react";
import { NavLink } from "react-router-dom";

export const BarraNavegacion = () => {


    return (
        <nav className="navbar-custom"> {/* Add the custom class here */}
            <ul>
                <li>
                    <NavLink to="/" activeclassname="active">
                        Home
                    </NavLink>
                </li>
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
                    <li>
                    <NavLink to="/inventario-departamentos" activeclassname="active">
                        Inventario Departamentos
                    
                    </NavLink>
                </li>
                {/* Add more NavLink components for other navigation items */}
            </ul>

            <div className="navbar-custom-banner"><strong>Inventario Granja Hogar</strong></div>

        </nav>
    );
};