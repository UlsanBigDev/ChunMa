import React, { Component, ReactNode, useState } from 'react';
import DayInfo from '../component/DayInfo';
import Modal from '../page/Modal';
interface IDay {
  day : number;
  clickEvent : Function;
}
function Home() { 
  const weekArr = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]   
  const calendarData = [
    [1,2,3,4,5,6,7],
    [8,9,10,11,12,13,14],
    [15,16,17,18,19,20,21],
    [22,23,24,25,26,27,28],
    [29,30,31,32,32,32,32],
    [32,32,32,32,32,32,32],
  ]
  function Day(props : IDay) {
    return <div className='day' onClick={()=>{props.clickEvent(props.day)}}><p>{ props.day }</p></div>;
  }
  function ModalListener(props : {component? : ReactNode, closeModal : Function}) {
    return props.component ? <Modal width={300} height={400} component={props.component} closeFunction={closeModal} /> : <></>
  }
  const [modalComponent, setModalComponet] = useState<ReactNode|null>();
  function openModal(day : number) {
    setModalComponet(<DayInfo day={day}/>);
  }
  function closeModal() {
    setModalComponet(null);
  }
  return (
    <div className='home'>
      <ModalListener component={modalComponent} closeModal={closeModal}/>
      <div className='month'>
          <p>January 2023</p>
      </div>
      <div className='week'>
        {weekArr.map((arr, index)=>{
          return <div><p>{arr}</p></div>
        })}
      </div>
      <div className='calendar'>        
        {calendarData.map((weeks) => {
          return(
            <div className='calendar-week'>        
              { week.map((day)=>{
                return <Day day={day} clickEvent={openModal}/>
              }) }              
            </div>
          )
        })}
        
      </div>
    </div>
  );
}

export default Home;

