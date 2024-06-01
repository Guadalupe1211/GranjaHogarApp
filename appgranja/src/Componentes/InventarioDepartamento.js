import React, { useState, useEffect } from 'react';
import { updateInventarioDepartamento, deleteInventarioDepartamento } from '../Services/InventarioDepartamento';
import { getDepartamento } from '../Services/DepartamentoServices';
import { useParams } from 'react-router-dom';
import { useGetInventarioDepartamento } from '../Hooks/InventarioDepartamento';




export const InventarioDepartamento = () => {
    const depId = useParams()
    const DbInvDep = useGetInventarioDepartamento(parseInt(depId.id))
    const [invDep, setInvDep] = useState([
        {
            id:0,
            departamento: 0,
            producto: { nombre: "loading" }
        }
    ])
    const [NombreDepartamento, setNombreDepartamento] = useState("nombre")
    const [refresh, setRefresh] = useState(false)
    
    useEffect(() => {
        if(DbInvDep){
        setInvDep(DbInvDep)
        }
    }, [DbInvDep])

    useEffect(() => {
        
        const callNombreDep = async () => {
            try{

            if(invDep[0].departamento!==0){
            const { nombre } = await getDepartamento(invDep[0].departamento)
            setNombreDepartamento(nombre)
            }
            }catch(error){
                console.log("Loading")
            }
        }
        callNombreDep()
        setRefresh(!refresh)
    }, [invDep])

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
            } else {
                await updateInventarioDepartamento(item.id, item.data);
            }
        }
    }


    return (
        <>
            <h1 className='header-dpto'>{NombreDepartamento}</h1>
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
            <button className="guardar inv-dep" onClick={() => {
                handleGuardar()
                setRefresh(!refresh)
            }}>
                Guardar
            </button>
        </>
    )
}
