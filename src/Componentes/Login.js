import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { Navigate, NavLink } from 'react-router-dom';
import './assets/css/App.css'

const Login = (props) =>{
    useEffect(()=>{
        document.title='Login'
    }, []);

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [login, setLogin] = useState();

    const post = (url) =>{
        axios.post(url, {'username':username, 'password':password}).then(response=>{
            localStorage.setItem('token', response.data['token']);
            console.log(localStorage.getItem('token'));
            localStorage.setItem('id_user', response.data['user_id']);
            console.log(localStorage.getItem('id_user'));
            localStorage.setItem('username',response.data['username'])
            console.log(localStorage.getItem('username'))
            localStorage.setItem('first_name', response.data['first_name']);
            console.log(localStorage.getItem('first_name'));
            localStorage.setItem('last_name', response.data['last_name']);
            console.log(localStorage.getItem('last_name'));
            localStorage.setItem('email', response.data['email']);
            console.log(localStorage.getItem('email'));
            setLogin(2);     
        })
    }
    return(
        <div className="containerL login">
            <h1>Login</h1>
            <label>Usuario</label>
            <input type='text' placeholder='Nombre del usuario' id='nombre'  onChange={e=>setUsername(e.target.value)}></input>
            <label>Contraseña</label>
            <input type='password' placeholder='Contraseña' id='contraseña'  onChange={e=>setPassword(e.target.value)}></input>
            <button onClick={()=>{
            post('http://localhost:8000/api/v1/login/')               
            }}> Iniciar</button>
            {(localStorage.getItem('token')!==null || login===2) && <Navigate to={'/profile/'}/>} 
            <h2>Si aún no esta registrado puede</h2>
            <NavLink to="/register">Crear una cuenta</NavLink>
        </div>
    )
}
export default Login;