import React from 'react'
import {Routes,Route,} from 'react-router-dom';
import Login from "./Login";
import Register from "./Register";
import Profile from "./Profile";
import Home from './Home'


export default function AppRouter() {
    return (
        <div>
            <Routes>
              <Route path="/" element={<Home/>}> </Route>  
              <Route path="/login" element={<Login/>}> </Route>
              <Route path="/register" element={<Register/>}> </Route>
              <Route path="/profile" element={<Profile/>}> </Route>
            </Routes>
        </div>
    )
}