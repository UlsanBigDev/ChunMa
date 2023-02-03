import React, { Component } from 'react';
import Modal from '../page/Modal';
interface IDay {
  day : number;
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
    return <div className='day'><p>{ props.day }</p></div>;
  }
  return (
    <div className='home'>
        <div className='month'>
            <p>January 2023</p>
        </div>
      <div className='week'>
        {weekArr.map((arr, index)=>{
          return <div><p>{arr}</p></div>
        })}
      </div>
      <div className='calendar'>        
        {calendarData.map((week) => {
          return(
            <div className='calendar-week'>        
              { week.map((day)=>{
                return <Day day={day}/>
              }) }              
            </div>
          )
        })}
        
      </div>
    </div>
  );
}

export default Home;

