import React, { Component, ReactNode, useState } from 'react';
import DayInfo from '../component/DayInfo';
import Modal from '../page/Modal';
import Calendar from './Calendar';

function Home() { 

  function ModalListener(props : {component? : ReactNode, closeModal : Function}) {
    return props.component ? <Modal width={300} height={400} component={props.component} closeFunction={closeModal} /> : <></>
  }

  const [modalComponent, setModalComponet] = useState<ReactNode|null>();
  function closeModal() {
    setModalComponet(null);
  }

  return (
    <div className='home'>
      <ModalListener component={modalComponent} closeModal={closeModal}/>
      <Calendar setModal={setModalComponet}/>
    </div>
  );
}

export default Home;
