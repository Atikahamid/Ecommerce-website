import React, { useEffect, useState } from 'react'
import './productlist.css'
import {Link} from 'react-router-dom';
export default function ProductList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, [])

    const getProducts = async () => {
        let result = await fetch("http://localhost:5000/products");
        result = await result.json();
        setProducts(result);
    }
    console.warn("products", products);

    const deleteProduct=async(id)=>{
        console.warn(id)
        let result=await fetch(`http://localhost:5000/product/${id}`,{
            method:'delete'
        });
        result=await result.json();
        if(result){
            alert("record is deleted")
            if(alert){
                getProducts();
            }
            
        }
    }
    const searchHandler=async(event)=>{
        // console.warn(event.target.value);
        let key=event.target.value;
        if(key){
            let result=await  fetch(`http://localhost:5000/search/${key}`);
            result=await result.json();
            if(result){
                setProducts(result);
            }
        }else{
            getProducts();
        }
    }
    return (
        <div className='product-list'>
            <h1>Product List</h1>
            <input type="text" className='search-input' onChange={searchHandler} placeholder='search Product' />
            <button >Search</button>
            <ul>
                <li>S.no</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Company</li>
                <li>operation</li>
            </ul>
            {
               products.length>0 ? products.map((item, index) => 
                    <ul key={item._id}>
                        <li>{index+1}</li>
                        <li>{item.name}</li>
                        <li>$ {item.price}</li>
                        <li>{item.category}</li>
                        <li>{item.company}</li>
                        <li><button onClick={()=>deleteProduct(item._id)}> Delete</button>
                        <Link to={"/update/"+item._id}>Update</Link>
                        </li>
                    </ul>
                )
                : <h1>No Result Foound</h1>
            }
        </div>
    )
}
