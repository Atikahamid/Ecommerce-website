import React from 'react'
import './nav.css'
import { Link ,useNavigate} from 'react-router-dom';
export default function Nav() {
 const auth=localStorage.getItem("user");
 const navigate=useNavigate();
 const logout=()=>{
  localStorage.clear();
  navigate('/signup')
 }
  return (
    <div className='nav-ul'>
       <img className='logo' src="https://www.adobe.com/express/learn/blog/media_196e5176585a00903655922c802ee1e507bb0a6e8.png?width=750&format=png&optimize=medium" alt="logo" />
      {auth ? <ul  className='nav-ul'>
        <li><Link to="/" >Products</Link></li>
        <li><Link to="/add" >Add Products</Link></li>
        <li><Link to="/update/:id" >Update Products</Link></li>
        <li><Link to="/profile" >Profile</Link></li>
        <li><Link to="/signup" onClick={logout} >Logout ({JSON.parse(auth).name})</Link></li>
        
      </ul>
      :
      <ul className="nav-ul nav-right">      
          <li><Link to="/SignUp">Sign Up</Link></li>
          <li><Link to="/login" >Login</Link></li>
      </ul>
       }
       </div>

  )
}
