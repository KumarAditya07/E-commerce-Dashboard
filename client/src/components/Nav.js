import react from 'react';
import {Link,useNavigate} from 'react-router-dom';
import '../App.css';

const Nav = ()=>{
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const logout=()=>{
        localStorage.clear();
        navigate('/signup')
    }
   
   return (
    <div>
    <img className='logo' src="https://freevector-images.s3.amazonaws.com/uploads/vector/preview/36682/36682.png" 
          alt="logo" />
      { auth ?  <ul className='nav-ul'>
            <li><Link to="/">Products</Link></li>
            <li><Link to="/add">Add Products</Link></li>
            <li><Link to="/update">Update Products</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link onClick={logout} to="/signup">Logout ({JSON.parse(auth).name})</Link></li>
            

        </ul>
        :
        <ul className='nav-ul nav-right'>
        
        <li><Link to="/signup">Sign Up</Link></li>
            
            <li><Link to="/login">Login</Link></li>
    
        </ul>
      }
    </div>
   )
}
export default Nav;