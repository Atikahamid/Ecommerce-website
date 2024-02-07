import React,{useEffect, useState} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import'./signup.css';

export default function UpdateProduct() {
    const [name,setName]=useState("");
    const [price,setPrice]=useState("");
    const [category,setCategory]=useState("");
    const [company,setCompany]=useState("");
    const params=useParams();
    const navigate=useNavigate();
    useEffect(()=>{
        getProductDetails();
    },[])

    const getProductDetails=async()=>{
        console.warn(params);
        let result=await fetch(`http://localhost:5000/product/${params.id}`);
        result=await result.json();
        console.warn(result); 
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company); 
    }
    
    const updateProduct=async()=>{
        console.log(name,price,category,company);
        let result=await fetch(`http://localhost:5000/product/${params.id}`,{
            method:'put',
            body:JSON.stringify({name,price,category,company}),
            headers:{
                "Content-Type":"application/json"
            }
        });
        result=await result.json();
        console.warn(result);
        navigate("/")

    }
  return (
    <div className='product'>
      <h1>Update product</h1>
      
      <input type="text" className='input-box' placeholder='Enter product name' value={name} onChange={(e)=>setName(e.target.value)} />
     
      <input type="text" className='input-box' placeholder='Enter price' value={price} onChange={(e)=>setPrice(e.target.value)}/>
      
      <input type="text" className='input-box' placeholder='Enter category' value={category} onChange={(e)=>setCategory(e.target.value)} />
   
      <input type="text" className='input-box' placeholder='Enter company' value={company} onChange={(e)=>setCompany(e.target.value)} />
    
        <button className='btn' onClick={updateProduct}>Update Product</button>
        
    </div>
  )
}
