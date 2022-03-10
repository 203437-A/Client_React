import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { Navigate, NavLink } from 'react-router-dom';

const Register = ()=>{

    useEffect(()=>{
        document.title='Register'
    }, []);

    const [registro, setRegistro] = useState(false)
    const [username, setUsername] = useState();
    const [name, setName] = useState();
    const [lastname, setLastName] = useState();
    const [email, setEmail]= useState();
    const [password, setPassword] = useState();
    const [password2, setPassword2] = useState();

    const post = (url) =>{
        axios.post(url, {'username':username, 'first_name':name, 'last_name':lastname, 'email':email, 'password':password, 'password2':password2}).then(response=>{
            alert('Se ha registrado, ahora ira a iniciar sesión');
            setRegistro(true)
            console.log(response.data)
        })
    }

    return(
        <div  className="containerR register">
            <h1>Register</h1>
            <label>Nombre de Usuario</label>
            <input type="text" placeholder="Nombre del usuario" id='username'  onChange={e=>setUsername(e.target.value)}></input>
            
            <label>Nombre</label>
            <input type="text" placeholder="Nombre"  onChange={e=>setName(e.target.value)}></input>
            
            <label>Apellidos</label>
            <input type="text" placeholder="Apellidos"  onChange={e=>setLastName(e.target.value)}></input>
            
            <label>Email</label>
            <input type="email" placeholder="Email"  onChange={e=>setEmail(e.target.value)}></input>
            
            <label>Contraseña</label>
            <input type="password" placeholder="Contraseña"  onChange={e=>setPassword(e.target.value)}></input>
            
            <label>Validar contraseña</label>
            <input type="password" placeholder="Validar contraseña"  onChange={e=>setPassword2(e.target.value)}></input>
            
            <button onClick={()=>{
                post('http://localhost:8000/api/v2/register/')
            }}> Crear cuenta</button>
            <NavLink to="/">Cancelar</NavLink>
            {registro && <Navigate to='/login'/>}
        </div>
    )
}

export default Register;