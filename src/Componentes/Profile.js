import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import './assets/css/App.css'

const Profile = () =>{
    const [logOut, setLogOut] = useState(false);
    const [url,setUrl]=useState('');
    const [img, setImg]=useState(null);
    const [edit,setEdit]=useState(false)
    const [errorP, setErrorP]=useState('');
    const [username, setUsername]=useState('');
    const [first_name, setFirst_name]=useState('')
    const [last_name, setLast_name]=useState('')
    const [email, setEmail]=useState('')
    useEffect(() => {
        document.title='Profile'
        getImg('http://localhost:8000/api/v1/user_profile/profile/'+localStorage.getItem('id_user')+'/')
    }, []);
    let getImg = (url)=>{
        axios.get(url,{
            headers:{
                'Authorization': 'Token '+localStorage.getItem('token')
            }
        }).then(response=>{
            setUrl('http://localhost:8000/api/v1/user_profile/profile'+response.data['name_img'])
        }).catch(()=>{setUrl('')})
    }
    let postImg = ()=>{
        let data = new FormData();
        data.append('name_img',img)
        data.append('id_user', localStorage.getItem('id_user'))
        axios.post('http://localhost:8000/api/v1/user_profile/profile/',data,{
            headers: {
                'Content-type':'multipart/form-data',
                'Authorization': 'Token '+localStorage.getItem('token'),
            },
        }).then(response=>{
            setImg(null)
            getImg('http://localhost:8000/api/v1/user_profile/profile/'+localStorage.getItem('id_user')+'/')
            setErrorP('1')
        }).catch(error=>{
            console.log(error)
        })
    }
    let putImage = ()=>{
        let data = new FormData();
        data.append('name_img',img)
        axios.put('http://localhost:8000/api/v1/user_profile/profile/'+localStorage.getItem('id_user')+'/',data,{
            headers: {
                'Content-type':'multipart/form-data',
                'Authorization': 'Token '+localStorage.getItem('token'),
            },
        }).then((response)=>{
            setImg(null)
            getImg('http://localhost:8000/api/v1/user_profile/profile/'+localStorage.getItem('id_user')+'/')
            setErrorP('1')
        }).catch(e=>{
            console.log(e)
            setErrorP('Primero agrega la imagen')
        })
    }
    let deleteImg = ()=>{
        axios.delete('http://localhost:8000/api/v1/user_profile/profile/'+localStorage.getItem('id_user')+'/',{
            headers:{'Authorization':'Token '+localStorage.getItem('token')}
        }).then(response=>{
            setUrl('')
            setErrorP('1')
        }).catch(()=>{
            setErrorP('No existe la imagen a eliminar')
        })
    }
    let setDatosUser=()=>{
        let datos = {
            'username':username!=='' ? username : localStorage.getItem('username'),
            'first_name':first_name!=='' ? first_name: localStorage.getItem('first_name'),
            'last_name':last_name!=='' ? last_name: localStorage.getItem('last_name'),
            'email':email!==''? email : localStorage.getItem('email')
        }
        axios.put('http://localhost:8000/api/v1/user_profile/change_user/'+localStorage.getItem('id_user')+'/',datos,{
            headers:{
                'Authorization':'Token '+localStorage.getItem('token')
            }
        }).then(response=>{
            setUsername('');
            setFirst_name('');
            setLast_name('');
            setEmail('');
            localStorage.setItem('username',response.data['username']);
            localStorage.setItem('first_name', response.data['first_name'])
            localStorage.setItem('last_name', response.data['last_name'])
            localStorage.setItem('email',response.data['email'])
            document.getElementById('username').value=''
            document.getElementById('username').placeholder=localStorage.getItem('username')
            document.getElementById('fname').value=''
            document.getElementById('fname').placeholder=localStorage.getItem('first_name')
            document.getElementById('lname').value=''
            document.getElementById('lname').placeholder=localStorage.getItem('last_name')
            document.getElementById('email').value=''
            document.getElementById('email').placeholder=localStorage.getItem('email')
            setErrorP(1)
            setEdit(true)
        })
    }
    return(
        <div className='containerP profile'>
            <div>
                <h1>Perfil</h1>
                <div className='imgP'>
                    <img src={url!=='' ? url:'https://d500.epimg.net/cincodias/imagenes/2016/07/04/lifestyle/1467646262_522853_1467646344_noticia_normal.jpg'} alt="Imagen de perfil" ></img>
                </div>
            </div>
            <div>
                <div className='opcion1'>
                    <input className='inputI' type="file" id='inputI' onChange={e=>{setImg(e.target.files[0])}}></input>
                    <button className='boton1' onClick={()=>{
                        deleteImg()
                    }}>Eliminar imagen</button>
                </div>
            </div>
            <div>
                <label>Usuario</label>
                <input type="text"  placeholder={localStorage.getItem('username')} onChange={(e)=>{setUsername(e.target.value); setEdit(true)}} id='username'/>
                <label>Nombre</label>
                <input type="text"  placeholder={localStorage.getItem('first_name')} onChange={e=>{setFirst_name(e.target.value);setEdit(true)}} id='fname'/>
                <label>Apellido</label>
                <input type="text"  placeholder={localStorage.getItem('last_name')} onChange={e=>{setLast_name(e.target.value);setEdit(true)}} id='lname'/>
                <label>Correo</label>
                <input type="email" placeholder={localStorage.getItem('email')} onChange={e=>{setEmail(e.target.value);setEdit(true)}} id='email'/>
            </div>
            <div className='opcion2'>
                <button className='boton2' onClick={() => {
                    if (username !== '' || first_name !== '' || last_name !== '' || email !== '') {
                        setDatosUser();
                    }
                    else setErrorP('No se ha modificado ningún dato')
                }}>Salvar datos </button>
                <p>{errorP}</p>
            </div>
            <div className='opcion3'>
                <button className='boton3' onClick={() => {
                    if (img != null) {
                        if (url !== '') {
                            putImage()
                        } else {
                            postImg()
                        }
                    }
                    else setErrorP('Agregue la imagen a mostrar')
                }}>Salvar imagen</button>
                <p></p>
                <button className='boton3' onClick={() => {
                    localStorage.clear()
                    setLogOut(true)
                }}>Cerrar sesión</button>
                {logOut && <Navigate to='/login/'></Navigate>}
            </div>
        </div>
    )
}

export default Profile;