import React,{useState} from "react";
import {useNavigate,Link} from 'react-router-dom';
import './signup.css';


function Login(){
    const navigate=useNavigate();
    const [login,setlogin]=useState({
        username:'',
        password:''

    })
    const handleChange=(e)=>{
        const {name,value}=e.target;
        setlogin({
            ...login, [name]: value,
        })

    }
    
    
    const handleLogin=(e)=>{
        e.preventDefault();
        fetch('/app/goto/',{
            method:'POST',
            headers:{'Content-type':'application/json',},
            body: JSON.stringify(login),
        }).then(response=>response.json())
            .then((data)=>{
                console.log('success: ',data);
                if(data.success){

                    const userid1=data.userid;
                    localStorage.setItem('userid',userid1);

                alert('Login successful');
                navigate('/home');
                }
                else{
                    alert('Login failed')
                }

            }).catch((error)=>{
                console.error('Error:',error);
                
            });
            
    };
    
    return(
        <div className="signup">
        <form onSubmit={handleLogin} className="form">
            <h1>Login</h1>
            <br/>
            <label htmlFor="username">Username : </label>
            <input 
                type="text"
                id="username"
                name="username"
                value={login.username}
                onChange={handleChange}
                required />
            <br/>
            <label htmlFor="password">Passwowrd : </label>
            <input 
                type="password"
                id="password"
                name="password"
                value={login.password}
                onChange={handleChange}
                required/>
            <br/>
            <button type="submit">Login</button>
            <br/>
            <p>Don't have an account ? 
            <Link to="/signup"> Sign up</Link> </p>
        </form>
        
        </div>
        
    )
}
export default Login;