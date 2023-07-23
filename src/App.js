import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Cards from './components/Cards';
import CardsDetails from './components/CardsDetails';
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
  <Route  path='/cart' element={<CardsDetails />}/>
  </Routes>
   
   </>
   
  );
}

export default App;
