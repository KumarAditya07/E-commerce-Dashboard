import React,{useState,useEffect} from 'react'
import  {useNavigate} from 'react-router-dom'
import '../App.css'

const Login = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem('user');
    if (auth) {
        navigate('/')
    }
  }, [])



   const handleLogin= async ()=>{
    let result = await fetch('http://localhost:5000/login',{
      method:'post',
      body:JSON.stringify({email,password}),

    });
    result = await result.json();
    console.warn(result);
    if(result.user){
      localStorage.setItem('user',JSON.stringify(result.user));
      
      navigate('/');


    }
    else{
      alert('Enter Correct details !!!')
    }
   }


  return (
    <div className='login'>
    <h1>Login</h1>
    <input type="text" className="input-box" placeholder='Enter Email'
        onChange={(e) => setEmail(e.target.value)} value={email} />

    <input type="password" className="input-box" placeholder='Enter Password'
        onChange={(e) => setPassword(e.target.value)} value={password} />

    <button onClick={handleLogin} className="signup-button" type="button">Login</button>
</div>
  )
}

export default Login
