import React,{useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

import '../App.css'
const Signup=()=> {
    const [name,setName]=useState("");
    const [password,setPassword]=useState("");
    const [email,setEmail]=useState("");
    const navigate = useNavigate();
      
//feature to hide sign up if user is already loged in 
useEffect(() => {
  const auth = localStorage.getItem('user');
  if (auth) {
      navigate('/')
  }
}, [])
    
    const collectData = async ()=>{
       

         let result = await fetch('http://localhost:5000/register',{
          method:'post',
          body:JSON.stringify({name,email,password}),
          headers:{
            'Content-Type':'application/json'
          }
        });
        result = await result.json();
       
        localStorage.setItem('user',JSON.stringify(result));
        
        if(result){
          navigate('/')
        }
        
    }
  return (
    <div className='register'>
      <h1>Register</h1>
      <input className='input-box' type="text" 
        value={name} onChange={(e)=>setName(e.target.value)} placeholder='Enter Name' />

      <input  className='input-box' type="text"
       value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter Email' />

      <input  className='input-box' type="password" 
       value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter Password' />

      <button onClick={collectData} className='signup-button' type='button'>Sign up</button>
    </div>
  )
}

export default Signup
