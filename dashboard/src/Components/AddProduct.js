import React,{useState} from 'react'
import './signup.css'
export default function AddProduct() {
  const [name,setName]=useState("");
  const [price,setPrice]=useState("");
  const [category,setCategory]=useState("");
  const [company,setCompany]=useState("");
  const [error,setError]=useState(false)

  const handleProduct=async(e)=>{
    e.preventDefault();
    // console.warn(!name);
    if(!name || !price ||!category || !company){
      setError(true);
      return false;
    }
    console.warn(name,price,category,company);
    const userId=JSON.parse(localStorage.getItem("user"))._id;
    let result=await fetch("http://localhost:5000/add-product",{
      method:'post',
      body:JSON.stringify({name,price,category,company,userId}),
      headers:{
        "Content-Type":"application/json"
      }
    });
    result=await result.json();
    console.warn(result);
    if(result){
      setError(false);
      setName('');
      setPrice('');
      setCategory('');
      setCompany('');
    }
   
  }
  // const submitHandler=()=>{
  //   setName('');
  //   setPrice('');
  //   setCategory('');
  //   setCompany('');
  // }

  return (
    <div className='product'>
      <h1>Add product</h1>
      <form >
      <input type="text" className='input-box' placeholder='Enter product name' value={name} onChange={(e)=>setName(e.target.value)} />
     {error && !name &&  <span className='invalid'>Enter valid name</span>}
      <input type="text" className='input-box' placeholder='Enter price' value={price} onChange={(e)=>setPrice(e.target.value)}/>
      {error && !price &&  <span className='invalid'>Enter valid price</span>}
      <input type="text" className='input-box' placeholder='Enter category' value={category} onChange={(e)=>setCategory(e.target.value)} />
      {error && !category &&  <span className='invalid'>Enter valid category</span>}
      <input type="text" className='input-box' placeholder='Enter company' value={company} onChange={(e)=>setCompany(e.target.value)} />
      {error && !company &&  <span className='invalid'>Enter valid company</span>}
        <button className='btn' onClick={handleProduct}>Add Product</button>
        </form>
    </div>
  )
}
