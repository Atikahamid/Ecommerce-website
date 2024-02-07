import React,{useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import './signup.css'
export default function Login() {
    const [email,setEmail]=useState('');
    const [passwd,setPasswd]=useState('');
    const navigate=useNavigate();
    useEffect(()=>{
        const auth=localStorage.getItem("user");
        if(auth){
            navigate("/")
        }
    })
    const handleLogin=async()=>{
        console.warn(email,passwd);
        let result= await fetch('http://localhost:5000/login',{
            method:'post',
            body:JSON.stringify({email,passwd}),
            headers:{
                'Content-Type':'application/json'
            }
        });
        result=await result.json();
        console.warn(result);
        if(result.email){
            localStorage.setItem("user",JSON.stringify(result));
            navigate("/");
        }
        else{
            alert("please enter correct details")
        }
    }
  return (
    <div className='login'>
      <input type="text"  className="input-box" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter email' />
      <input type="password"  className="input-box" value={passwd} onChange={(e)=>setPasswd(e.target.value)} placeholder='Enter password' />
      <button className='btn' onClick={handleLogin} type="button">Login</button>
    </div>
  )
}
