import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Modal from './page/Modal';

import './css/main.css';
import Home from './page/Home';

function App() {    
  return (
    <div className='content'>  
      <Home/>
      <Modal/>      
    </div>
  );
}

export default App;
