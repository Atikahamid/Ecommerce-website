import './App.css';
import Footer from './Components/Footer';
import Nav from './Components/Nav';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import SignUp from './Components/SignUp';
import PrivateCompo from './Components/PrivateCompo';
import Login from './Components/Login';
import AddProduct from './Components/AddProduct';
import ProductList from './Components/ProductList';
import UpdateProduct from './Components/UpdateProduct';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav />
      <Routes>
        <Route element={ <PrivateCompo/> }>
        <Route path="/" element={ <ProductList/>} />
        <Route path="/add" element={ <AddProduct/>} />
        <Route path="/update/:id" element={ <UpdateProduct/>} />
        <Route path="/logout" element={ <h1>Logout componet</h1>} />
        <Route path="/profile" element={ <h1>Profile componet</h1>} />
        </Route>

        <Route path="/SignUp" element={ <SignUp/>} />
        <Route path="/login" element={<Login/>}/>
      </Routes>
      </BrowserRouter>
      <Footer/>
      
    </div>
  );
}

export default App;
