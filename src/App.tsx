import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Modal from './page/Modal';

function App() {
  const [isModal, setIsModal] = useState<boolean>(false);

  return (
    <div>
      <button onClick={()=>{setIsModal(!isModal)}}>??일</button>
      <Modal status={isModal}/>      
    </div>
  );
}

export default App;
