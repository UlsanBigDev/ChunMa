import React, { Component } from 'react';
import Modal from '../page/Modal';


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
        {/* <div className='calendar-week'>        
          {weekArr.map((arr, index)=>{
            let aa = index+1
            return (<div className='day'><Modal component={<DayInfo changeDay={"0"+aa}/>} width={300} height={400} day={index+1}/></div>)
          })}
        </div> */}
        {calendarData.map((week) => {
          return(
            <div className='calendar-week'>        
              { week.map((day)=>{
                return <div className='day'><Modal width={300} height={400} day={day}/></div>              
              }) }              
            </div>
          )
        })}
        
      </div>
    </div>
  );
}
export default Home;

