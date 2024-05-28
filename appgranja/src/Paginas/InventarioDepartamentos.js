import React from "react";
import { getInventarioDepartamento } from "../Services/InventarioDepartamento";
import { useEffect, useState } from "react";
import { InventarioDepartamento } from "../Componentes/InventarioDepartamento";

export const InventarioDepartamentos = () => {
    const [Departamentos, setDepartamentos] = useState([])

    useEffect(() => {
        const getData = async () => {
            const data = await getInventarioDepartamento()
            const groupedData = data.reduce((acc, curr) => {
                if (!acc[curr.departamento]) {
                    acc[curr.departamento] = [];
                }
                acc[curr.departamento].push(curr);
                return acc;
            }, {});

            setDepartamentos(groupedData);
        }
        getData();

    }, [Departamentos])

    return (
        <div>

            {Object.keys(Departamentos).map((key) => (

                <InventarioDepartamento Departamentos={Departamentos[key]} key={key} />
            ))}
        </div>
    )
}
