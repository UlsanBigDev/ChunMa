import React, { Component } from 'react';
import Modal from '../page/Modal';
import DayInfo from '../component/DayInfo';

function Home() {    
  return (
    <div className='home'>
        <div className='month'>
            <p>January 2023</p>
        </div>
      <div className='week'>
        <div><p>SUN</p></div>
        <div><p>MON</p></div>
        <div><p>TUE</p></div>
        <div><p>WED</p></div>
        <div><p>THU</p></div>
        <div><p>FRI</p></div>
        <div><p>SAT</p></div>
      </div>
      <div className='calendar'>
        <div className='calendar-week'>
            <div className='day'><Modal component={<DayInfo/>} width={300} height={400} day={1}/></div>
            <div className='day'><p>1</p></div>
            <div className='day'><p>1</p></div>
            <div className='day'><p>1</p></div>
            <div className='day'><p>1</p></div>
            <div className='day'><p>1</p></div>
            <div className='day'><p>1</p></div>
        </div>
        <div className='calendar-week'>
            <div className='day'><p>1</p></div>
            <div className='day'><p>1</p></div>
            <div className='day'><p>1</p></div>
            <div className='day'><p>1</p></div>
            <div className='day'><p>1</p></div>
            <div className='day'><p>1</p></div>
            <div className='day'><p>1</p></div>
        </div>
        <div className='calendar-week'>
            <div className='day'><p>1</p></div>
            <div className='day'><p>1</p></div>
            <div className='day'><p>1</p></div>
            <div className='day'><p>1</p></div>
            <div className='day'><p>1</p></div>
            <div className='day'><p>1</p></div>
            <div className='day'><p>1</p></div>
        </div>
        <div className='calendar-week'>
            <div className='day'><p>1</p></div>
            <div className='day'><p>1</p></div>
            <div className='day'><p>1</p></div>
            <div className='day'><p>1</p></div>
            <div className='day'><p>1</p></div>
            <div className='day'><p>1</p></div>
            <div className='day'><p>1</p></div>
        </div>
        <div className='calendar-week'>
            <div className='day'><p>1</p></div>
            <div className='day'><p>1</p></div>
            <div className='day'><p>1</p></div>
            <div className='day'><p>1</p></div>
            <div className='day'><p>1</p></div>
            <div className='day'><p>1</p></div>
            <div className='day'><p>1</p></div>
        </div>
        <div className='calendar-week'>
            <div className='day'><p>1</p></div>
            <div className='day'><p>1</p></div>
            <div className='day'><p>1</p></div>
            <div className='day'><p>1</p></div>
            <div className='day'><p>1</p></div>
            <div className='day'><p>1</p></div>
            <div className='day'><p>1</p></div>
        </div>
      </div>
    </div>
  );
}

export default Home;