import React,{useState,useEffect} from "react";
import { getProducts } from "../Services/ProductsServices";
import {Product} from "../Componentes/Product"

export const Products = () => {
    const[data, setData] = useState([])

    useEffect( () => {
        
        const loadProducts = async () =>{
            try{
            const data = await getProducts();
            setData(data)
            console.log(data)
        }catch(error){
            console.error("Error while getting products")
            throw error;
        }
        }
        loadProducts();
    },[])

    return(
    <>

        <Product products = {data} />
    </>
    )
}