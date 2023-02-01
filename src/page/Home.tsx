import React, { Component } from 'react';
import Modal from '../page/Modal';
import DayInfo from '../component/DayInfo';

function Home() { 
  const weekArr = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]   
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
        <div className='calendar-week'>
          {weekArr.map((arr, index)=>{
            return (<div className='day'><Modal component={<DayInfo changeDay={index+1}/>} width={300} height={400} day={index+1}/></div>)
          })}
        </div>
        <div className='calendar-week'>
          {weekArr.map((arr, index)=>{
            return (<div className='day'><Modal component={<DayInfo changeDay={index+8}/>} width={300} height={400} day={index+8}/></div>)
          })}
        </div>
        <div className='calendar-week'>
          {weekArr.map((arr, index)=>{
            return (<div className='day'><Modal component={<DayInfo changeDay={index+15}/>} width={300} height={400} day={index+15}/></div>)
          })}
        </div>
        <div className='calendar-week'>
          {weekArr.map((arr, index)=>{
            return (<div className='day'><Modal component={<DayInfo changeDay={index+22}/>} width={300} height={400} day={index+22}/></div>)
          })}
        </div>
        <div className='calendar-week'>
          {weekArr.map((arr, index)=>{
            return (<div className='day'><Modal component={<DayInfo changeDay={index+29}/>} width={300} height={400} day={index+29}/></div>)
          })}
        </div>
        <div className='calendar-week'>
          {weekArr.map((arr, index)=>{
            return (<div className='day'><Modal component={<DayInfo changeDay={index+36}/>} width={300} height={400} day={index+36}/></div>)
          })}
        </div>
      </div>
    </div>
  );
}
export default Home;