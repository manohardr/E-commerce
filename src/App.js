import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Cards from './components/Cards';
import ShoppingCart from './components/ShoppingCart';
import ErrorMessage from './components/ErrorMessage';
import './components/Style.css'
import Header from './components/Header';



function App() {
  return (
   <>
   
<Header/>
<ErrorMessage/>
  <Routes>
  <Route path='/' element={<Cards />}/>
  <Route  path='/cart' element={<ShoppingCart />}/>
  </Routes>
   
   </>
   
  );
}

export default App;
