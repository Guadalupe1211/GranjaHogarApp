import React from "react";

export const Home = () =>{
    return(
    <div className= "Home" style={{ backgroundImage: `url("/homeBackground.jpg")` }}> 
    <h1>Bienvenido al sistema de inventario de la granja Hogar</h1>
    <p>Este sistema de inventario permite:</p>
    <ul>
<li><strong>Agregar productos:</strong> Registrar los productos disponibles en la granja, como alimentos, suministros y otros elementos.</li>
<li><strong>Crear departamentos:</strong> Organizar los productos en diferentes categorías o áreas, como cocina, almacén, etc.</li>
<li><strong>Registrar movimientos de inventario:</strong> Anotar las entradas y salidas de productos, ya sea por compras, donaciones o consumo interno.</li>
<li><strong>Asignar productos a departamentos:</strong> Vincular los productos a los departamentos correspondientes (por ejemplo, asignar alimentos a la cocina).</li>
<li><strong>Seguimiento de stock:</strong> Ver los niveles de inventario en cada departamento y recibir alertas cuando sea necesario reabastecer o redistribuir productos.</li>
    </ul>
    <p>En resumen, este sistema facilita la administración eficiente de los recursos en la granja hogar.</p>
    </div>)
}