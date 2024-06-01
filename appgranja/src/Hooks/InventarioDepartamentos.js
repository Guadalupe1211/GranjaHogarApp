import { getInventarioDepartamento } from "../Services/InventarioDepartamento";
import { useEffect, useState } from "react";



export const useGetInventarioDepartamento = (depId) => {
    const [DBInventarioDepartamentos, setDBInventarioDepartamentos] = useState([])
    const [invDep, setInvDep] = useState([])
    console.log("hook: "+invDep)
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

            setDBInventarioDepartamentos(groupedData);
            
        }
        getData();
    }, [])

    useEffect(()=>{
        // Iterate over the keys in DBInventarioDepartamentos
        Object.keys(DBInventarioDepartamentos).forEach((key) => (
           DBInventarioDepartamentos[key].find(d => d.departamento === depId) ? setInvDep(DBInventarioDepartamentos[key]) : invDep));
    }, [DBInventarioDepartamentos])
    return (
        invDep
    )
}
