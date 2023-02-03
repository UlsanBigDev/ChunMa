import React from 'react';
import logo from './logo.svg';
import '../App.css';

function Calendar() {

    // 이전 달의 마지막 날 날짜와 요일 구하기
    let startDay = new Date();
    let prevDate = startDay.getDate();
    let prevDay = startDay.getDay();
    console.log(prevDate, prevDay);

    return (
      <div>
        <h1> 달력 만들기 </h1>
      </div>
    );
  }

export default Calendar;