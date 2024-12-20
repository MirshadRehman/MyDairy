import React from 'react'
import { useState } from 'react'
import './signup.css'
import { useNavigate } from 'react-router-dom'

function Signup(){
    const navigate=useNavigate();

    const [data,setdata]=useState({
        username:'',
        name:'',
        email:'',
        password:''
    })
    const handleChange=(e)=>{
        const {name,value}=e.target;
        setdata({
            ...data, [name]:value,
        })
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        fetch('/app/submit/',{
            method:'POST',
            headers:{'Content-type':'application/json',},
            body: JSON.stringify(data),
        }).then(response=>response.json())
          .then((data)=>{
            console.log('success:',data);
            alert('data submitted');
            navigate('/home');
            setdata({username:'',name:'',email:'',password:''});
          })
          .catch((error)=>{
            console.error('Error:',error);
            
          });
          
    }

    return(
        <div className='signup'>
        <form onSubmit={handleSubmit} className='form'>
            <h1>Signup</h1>
            <br/> 
            <label htmlFor='username'>Username : </label>
            <input 
                type='text' 
                name='username' 
                id='username'
                value={data.username}
                onChange={handleChange}
                required />
            <br/>
            <label htmlFor='name'>Name : </label>
            <input 
                type='text' 
                name='name' 
                id='name'
                value={data.name}
                onChange={handleChange}
                required />
            <br/>
            <label htmlFor='email'>Email : </label>
            <input 
                type='text' 
                name='email' 
                id='email'
                value={data.email}
                onChange={handleChange}
                required />
            <br/>
            <label htmlFor='password'>Passwowrd : </label>
            <input 
                type='password'
                name='password'
                id='password'
                value={data.password}
                onChange={handleChange}
                required />
            <br/>
            <button type='submit'>Submit</button>
        </form>
        </div>
    )
}
export default Signup;