import React, { Component } from 'react';
import Modal from '../page/Modal';

function Home(props: IHome) { 
  const weekArr = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]   
  // const calendarData = [
  //   [1,2,3,4,5,6,7],
  //   [8,9,10,11,12,13,14],
  //   [15,16,17,18,19,20,21],
  //   [22,23,24,25,26,27,28],
  //   [29,30,31,32,32,32,32],
  //   [32,32,32,32,32,32,32],
  // ]
  const calendarData = props.qwert;
  console.log(calendarData);
  return (
    <div className='home'>
        <div className='month'>
            <p>{props.month} {props.year}</p>
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
              { weeks.map((days)=>{
                return <div className='day'><Modal width={300} height={400} asdf={days}/></div>              
              }) }              
            </div>
          )
        })}
        
      </div>
    </div>
  );
}

export default Home;

