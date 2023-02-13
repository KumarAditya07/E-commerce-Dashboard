import './App.css';
import Nav from './components/Nav'
import Footer from './components/Footer';
import Signup from './components/Signup';
import Login from './components/Login';
import UpdateProduct from './components/UpdateProduct';
import AddProduct from './components/AddProduct';
import PrivateComponent from './components/PrivateComponent';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductList from './components/ProductList';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Nav/>
    <Routes>
    <Route element={<PrivateComponent/>}>

      <Route path='/' element={<ProductList/>}/>
      <Route path='/add' element={<AddProduct/>}/>
      <Route path='/update/:id' element={<UpdateProduct/>}/>
      <Route path='/logout' element={<h1>logout component</h1>}/>
      <Route path='/profile' element={<h1>profile component</h1>}/>
      
        </Route>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
      </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
