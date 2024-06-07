import React from "react";
import '../Home.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fa1, fa2, fa3, faClipboard, faArrowsToDot, faCubesStacked } from '@fortawesome/free-solid-svg-icons';

export const Home = () => {
    return (
        <><div class="bg-color">
            <div className="Home" style = {{backgroundImage: `url("/HomeLandscapeWallpaper.png")`}}>
                <h1>Bienvenido al sistema de inventario de la granja Hogar</h1>

                {/*Boxes 1rst section*/}
                <div class="wrapper">
                    <div class="box-area">
                        <div class="icon-area">
                            <i class="icon one"><FontAwesomeIcon icon={fa1} /></i>
                        </div>
                        <h6>Crear Categoría</h6>
                        <p>Organizar los productos por categorías dependiendo del uso, como herramientas, despensa, utiles escolares,etc.</p>
                    </div>
                    <div class="box-area">
                        <div class="icon-area">
                            <i class="icon two"><FontAwesomeIcon icon={fa2} /></i>
                        </div>
                        <h6>Agregar Producto</h6>
                        <p>Registrar los productos disponibles en la granja, como alimentos, suministros y otros elementos.</p>
                    </div>
                    <div class="box-area">
                        <div class="icon-area">
                            <i class="icon three"><FontAwesomeIcon icon={fa3} /></i>
                        </div>
                        <h6>Crear Departamento</h6>
                        <p>Organizar los productos en diferentes categorías o áreas, como cocina, almacén, etc.</p>
                    </div>
                </div>
            </div>


            {/*Boxes 2nd section*/}

            <section class="first-section">
                <div class="row-area">
                    <div class="box-icon-area">
                        <i class="icon-clipboard"><FontAwesomeIcon icon={faClipboard} /></i>
                    </div>
                    <summary>
                        <h6>Registrar movimientos de inventario</h6>
                        <h5>Menu: Movimiento inventario</h5>
                        <p>Anotar las entradas y salidas de productos, ya sea por compras, donaciones o consumo interno.</p>
                    </summary>
                </div>
            </section>

            <section class="second-section">
                <div class="row-area">
                    <summary>
                        <h6>Asignar productos a departamentos</h6>
                        <h5>Menu: Movimiento inventario</h5>
                        <p>Vincular los productos a los departamentos correspondientes (por ejemplo, asignar alimentos a la cocina).</p>
                    </summary>
                    <div class="even-box-icon-area">
                        <i class="icon-arrowtodot"><FontAwesomeIcon icon={faArrowsToDot} /></i>
                    </div>
                </div>
            </section>

            <section class="third-section">
                <div class="row-area">
                    <div class="box-icon-area">
                        <i class="icon-cubes"><FontAwesomeIcon icon={faCubesStacked} /></i>
                    </div>
                    <summary>
                        <h6>Seguimiento de stock</h6>
                        <p>Ver los niveles de inventario en cada departamento y recibir alertas cuando sea necesario reabastecer o redistribuir productos. (en desarrollo)</p>
                    </summary>
                </div>
            </section>
        </div>

        </>
    )
}
