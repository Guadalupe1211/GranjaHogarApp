import React, { useState, useEffect } from 'react';
import { updateInventarioDepartamento, deleteInventarioDepartamento, getInventarioDepartamento } from '../Services/InventarioDepartamento';
import { getDepartamento } from '../Services/DepartamentoServices';
import { useParams } from 'react-router-dom';



export const InventarioDepartamento = () => {
    const depId = useParams()
    
    
    const [invDep, setInvDep] = useState([
        {
            id: 0,
            departamento: 0,
            producto: { nombre: "loading" }
        }
    ])

    const [DbInvDep, setDBInvDep]=useState([
        {
            id: 0,
            departamento: 0,
            producto: { nombre: "loading" }
        }
    ])

    const [lastUpdate, setLastUpdate] = useState(Date.now())
    const [NombreDepartamento, setNombreDepartamento] = useState("nombre")
    

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
            

            Object.keys(groupedData).forEach((key) => {
                if(groupedData[key].find(d => d.departamento === parseInt(depId.id))){
                const data = groupedData[key]
                setDBInvDep(data)
                setInvDep(data)
            }
        })}
        getData();    


    }, [lastUpdate])
  

    useEffect(() => {

        const callNombreDep = async () => {
            try {

                    const { nombre } = await getDepartamento(parseInt(depId.id))
                    setNombreDepartamento(nombre)
                
            } catch (error) {
                console.log("Loading")
            }
        }
        callNombreDep()
    }, [])

    const handleIncrementar = (id) => {
        setInvDep(invDep.map(dep =>
            dep.id === id && dep.cantidad_en_stock < DbInvDep.find(d => d.id === id).cantidad_en_stock
                ? { ...dep, cantidad_en_stock: dep.cantidad_en_stock + 1 }
                : dep
        ))
    }

    const handleDecrementar = (id) => {
        setInvDep(invDep.map(dep =>
            dep.id === id && dep.cantidad_en_stock > 0
                ? { ...dep, cantidad_en_stock: dep.cantidad_en_stock - 1 }
                : dep
        ))
    }

    const handleGuardar = async () => {
        const dataUpdates = invDep.map(dep => ({
            id: dep.id,
            data: {
                producto_id: dep.producto.id,
                departamento: dep.departamento,
                cantidad_en_stock: dep.cantidad_en_stock
            }
        }));

        for (const item of dataUpdates) {
            if (item.data.cantidad_en_stock === 0) {
                // Send a toast here
                await deleteInventarioDepartamento(item.id);
                setLastUpdate(Date.now())
            } else {
                await updateInventarioDepartamento(item.id, item.data);
                setLastUpdate(Date.now())
            }
        }

    }


    return (
<>
{console.log(invDep[0].id)}
        {
           
            invDep[0].id==0 ? (
                <>
                
                <h1>El departamento {NombreDepartamento} no tiene productos aun...</h1>
                </>
            ) : (
                <>
                
                <div className='header-container-deptoinv'>
                <h1 className = 'header-dpto'>{ NombreDepartamento }</h1>
                <button className="guardar inv-dep" onClick={() => {
                handleGuardar()
                
            }}>
                Guardar
            </button>
            </div>
            <div className='caja-dptoinv'>

                {invDep.map((dep) => (
                    <div className='dptoinv' key={dep.id}>
                        <div className='img-inv'>
                            <img src="\img_dptoinv.jpg" alt="imagen inventario" width="200" height="150" />
                        </div>
                        <div className='section-heading'>
                            {dep.producto.nombre}
                        </div>
                        <div className='Button-incdec'>
                            <button id="decrementar" onClick={() => handleDecrementar(dep.id)}>
                                ▼
                            </button>
                            <div className='item-stock'>
                                {dep.cantidad_en_stock}
                            </div>
                            <button id="incrementar" onClick={() => handleIncrementar(dep.id)}>
                                ▲
                            </button>
                        </div>
                    </div>
                ))}
            </div>

        </>
    )}
    </>
    )
}
