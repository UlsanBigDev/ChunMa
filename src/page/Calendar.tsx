import React from 'react';
import logo from './logo.svg';
import '../App.css';

function Calendar() {
  const monthTemp = ["January","Feburary","March","April","June","July","Agust","September","October","November","December"];
  const dayTemp = ["SUN","MON","TUE","WED","THU","FRI","SAT"];
    
    // 이전 달의 마지막 날 날짜와 요일 구하기
    let startDay = new Date();
    let prevYear = startDay.getFullYear(); //연도
    let prevMonth = startDay.getMonth(); //달 [0,1,2,3,4,5,6,7,8,9,10,11]
    let prevDate = startDay.getDate(); //날짜 [1,2 ... ?]
    let prevDay = startDay.getDay(); //요일 [0,1,2,3,4,5,6]
    let firstDay = new Date(prevYear,prevMonth,1).getDay();
    let lastDate = new Date(prevYear,prevMonth+1,0).getDate();

    console.log(prevYear, monthTemp[prevMonth], prevDate, dayTemp[prevDay]);

    let weekNum = Math.ceil((prevDay + lastDate) / 7);
    
    const arr=[];
    for (let i = 0; i<firstDay; i++){
      arr.push(-1);
    }
    for (let i = 1; i<=lastDate; i++){
      arr.push(i);
    }
    for (arr.length; arr.length < weekNum * 7; ){
      arr.push(0);
    }

    return (
      <div>
        <center>
          <h1>{monthTemp[prevMonth]} {prevYear}</h1>
          {dayTemp.map((day)=>{
            return(
              <b><span>{day}{" "}</span></b>
            )
          })}
          <br/>
          {arr.map((date,index)=>{
            if ((index+1) % 7 == 0){
              return <div>{date}<hr/></div>
            }
            else {
              return <div>{date}</div>
            }
          })}
        </center>
      </div>
    );
  }

  
export default Calendar;