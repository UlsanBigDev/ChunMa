import React, {useState} from 'react';
import './App.css';
import Modal from './page/Modal';

import './css/main.css';
import Home from './page/Home';
import DayInfo from './component/DayInfo';

function App() {    
  return (
    <div className='content'>  
      <Home/>
      <Modal component={<DayInfo/>} width={300} height={400} day={13132426}/>
    </div>
  );
}

export default App;
