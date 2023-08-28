import React from 'react'
import  {Routes,Route,Navigate, BrowserRouter} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import Register from "./views/Register"
import Login from './views/Login';
import Consent from './views/Consent';
import Home from "./views/Home";
import Category from './views/Category';
import Product from './views/Product';
import Cart from './views/Cart';
import Pay from './views/Pay';
import Success from './views/Success';
import { useSelector } from 'react-redux';


const App = () => {
  const user = useSelector(state => state.user.currentUser);

  return (
    <div className="app">
      <BrowserRouter>
         <Routes>
           <Route exact path="/" element={<Home />}/>

           <Route  path="/register" element={user ? <Navigate to="/" /> : <Register />} />
           <Route  path="/login" element={user ? <Navigate to="/" /> : <Login />} />
           <Route path="/consent" element={<Consent />}/>


           <Route  path="/category/:cat" element={<Category />}/>
           <Route  path="/product/:id" element={<Product />}/>
           <Route  path="/cart" element={<Cart />}/>
           <Route  path="/pay" element={<Pay />}/>
           <Route  path="/success" element={<Success />}/>
         </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
