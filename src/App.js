import React from 'react';

import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Cards from './components/Cards';
import CardsDetails from './components/CardsDetails';
import ErrorMessage from './components/ErrorMessage';
import './components/Style.css'

function App() {
  return (
   <>
   
<Header/>
<ErrorMessage/>
  <Routes>
  <Route path='/' element={<Cards />}/>
  <Route path='/cart/:id' element={<CardsDetails />}/>
  </Routes>
   
   </>
   
  );
}

export default App;
