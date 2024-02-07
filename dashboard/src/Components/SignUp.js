import React ,{useState,useEffect}from 'react'
import './signup.css'
import {useNavigate} from 'react-router-dom'

export default function SignUp() {
    const [name,setName]=useState("");
    const [passwd,setPasswd]=useState("");
    const [email,setEmail]=useState("");
    const navigate=useNavigate();
    
    useEffect(() => {
      const auth = localStorage.getItem('user');
      if (auth) {
        navigate('/')
      }
    })

    //api connected with react js
    const collectdata=async()=>{
        console.warn(name,email,passwd);
        let result=await fetch('http://localhost:5000/signup',{
          method:'post',
          body: JSON.stringify({name,email,passwd}),
          headers:{
            'Content-Type':'application/json'
          },
        });
        result=await result.json();
        // console.warn(result);
        localStorage.setItem("user",JSON.stringify(result));
        if(result){
          navigate('/');
        }
    }

   
  return (
    <div className='signup'>
      <h1>Sign up</h1>
      <input className='input-box' type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder='Enter Name'/>
      <input className='input-box' type="text" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter email'/>
      <input className='input-box' type="password"  value={passwd} onChange={(e)=>setPasswd(e.target.value)} placeholder='Enter password' />
      <button className='btn' onClick={collectdata} type="button">Submit</button>
    </div>
  )
}
