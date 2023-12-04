import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Home from './core/Home' 
import About from './core/About'
import Shop from './core/Shop'
import Contact from './core/Contact'
import Login from './core/Login'
import Signup from './core/Signup'
import Update from './core/Update'


const MainRouter = () => {
return ( <div> 
<Routes>
<Route exact path="/" element={<Home />}/> 
<Route exact path="/about" element={<About />}/> 
<Route exact path="/shop" element={<Shop />}/> 
<Route exact path="/contact" element={<Contact />}/> 
<Route exact path="/login" element={<Login/>}/> 
<Route exact path="/signup" element={<Signup />}/> 
<Route exact path="/update" element={<Update/>}/>


</Routes>
</div> 
)
}
export default MainRouter