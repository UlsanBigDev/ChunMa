import React,{useState} from 'react';
import logo from './logo.svg';
import '../App.css';
import Modal from './Modal';
import Home from './Home';
import DayInfo from '../component/DayInfo';

interface IDay {
  day : number;
  clickEvent : Function;
  year : number;
  month : number;
}

function Calendar(props : {setModal:Function}) {
  
  function Day(props : IDay) {
    return <div className='day' onClick={()=>{props.clickEvent(props.day)}}><p>{ props.day }</p></div>;
  }

  const monthTemp = ["January","Feburary","March","April","May","June","July","Agust","September","October","November","December"];
  const dayTemp = ["SUN","MON","TUE","WED","THU","FRI","SAT"];
    
    // 이전 달의 마지막 날 날짜와 요일 구하기
    let startDay = new Date();
    let prevYear = startDay.getFullYear(); //연도
    let prevMonth = startDay.getMonth(); //달 [0,1,2,3,4,5,6,7,8,9,10,11]
    let prevDate = startDay.getDate(); //날짜 [1,2 ... ?]
    let prevDay = startDay.getDay(); //요일 [0,1,2,3,4,5,6]
    let firstDay = new Date(prevYear,prevMonth,1).getDay();
    let lastDate = new Date(prevYear,prevMonth+1,0).getDate();

    // 저번 달의 마지막 요일
    let previouday = new Date( prevYear, prevMonth, 0).getDay();

    // 저번 달의 마지막 날짜(전 달의 날짜를 표기하기 위해서)
    let previousmonth = new Date(prevYear,prevMonth,0).getDate();

    // 다음 달의 시작 요일(다음 달의 날짜를 표기하기 위해서)
    let nextmonth = new Date(prevYear,prevMonth+1,1).getDay();

    // console.log(lastDate, prevYear, monthTemp[prevMonth], prevDate, dayTemp[prevDay]);

    let weekNum = Math.ceil((firstDay + lastDate) / 7); //prevDay -> firstDay 진짜 바본가

    function openModal(year:number, month:number,day : number) {
      // setModalComponet();
      props.setModal(<DayInfo year = {year} month = {month} day={day}/>);
    }
  
    // const arr=[];

    const testarr = [];

    for ( let i = 0; i < firstDay; i++ ){
      testarr.push(-1);
    }
    for (let i = 1; i<=lastDate; i++){
      testarr.push(i);
    }
    while (testarr.length < weekNum * 7){
      testarr.push(0);
    }
    
    // for (let i = previousmonth - firstDay+1; i<=previousmonth; i++){
    //   arr.push(i);
    // }

    // for (let i = 1; i<=lastDate; i++){
    //   arr.push(i);
    // }

    // let i = 1;
    // while (arr.length < weekNum * 7){
    //   arr.push(i);
    //   i += 1;
    // }


    // 오늘 날짜를 state로 받기
    let [date, setDate] = useState(new Date());

    // 이번 년도
    let [viewYear, setViewYear] = useState(date.getFullYear());

    // 이번 월
    let [viewMonth, setViewMonth] = useState(date.getMonth());

    // 지난 달
    let prevLast = new Date(viewYear, viewMonth, 0);
    // console.log(prevLast);
    // 이번 달
    let thisLast = new Date(viewYear, viewMonth + 1, 0);
    // console.log(thisLast);

    // 지난 달 마지막 날짜
    let PLDate = prevLast.getDate();
    console.log(PLDate);
    // 지난 달 마지막 요일
    let PLDay = prevLast.getDay();
    console.log(PLDay);

    // 이번 달 마지막 날짜
    let TLDate = thisLast.getDate();
    // 이번 달 마지막 요일
    let TLDay = thisLast.getDay();

    let prevDates = [];
    let thisDates = [];
    let nextDates = [];

    // 이전달을 표시하는 날짜들
    if (PLDay !== 6) { //마지막 날짜가 토요일에 끝아니면 굳이 할 필요가 없으므로
      for ( let i = 0; i < PLDay + 1; i++ ) {
        prevDates.unshift(PLDate - i);
      }
    }

    for ( let i = 1; i <= TLDate; i++ ) {
      thisDates.push(i);
    }

    for ( let i = 1; i < 7 - TLDay; i++ ) {
      nextDates.push(i);
    }

    // 이전 달 버튼을 눌렀을 때 작동하는 함수
    function beformonth() {
      if (viewMonth < 1) {
        viewMonth = 12;
        setViewYear(viewYear - 1);
      }
      setViewMonth(viewMonth - 1);
    }

    // 다음 달 버튼을 눌렀을 때 작동하는 함수
    function frontmonth() {
      if ( viewMonth > 10 ) {
        viewMonth = -1;
        setViewYear( viewYear + 1 );
      }
      setViewMonth(viewMonth + 1);
    }

    // 오늘 날짜로 돌아오는 함수
    function gotoday() {
      setViewMonth(date.getMonth());
      setViewYear(date.getFullYear());
    }

    let dates = prevDates.concat(thisDates, nextDates);
    console.log(dates);


    const arrWeek=[];
    for (let i = 0; i<=weekNum; i++){
      arrWeek.push(dates.slice(0 + 7*i, 7 * (i+1))) //0,7 7,14 14,21 21,28 28,35
    }
    const weekArr = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]


    return (
      <div>
        <div className='month'>
          <p>{monthTemp[viewMonth]} {viewYear}</p>
      </div>
      <div className='MonthMove'>
          <button onClick={() => {beformonth()}}> &lt; </button>
          <button onClick={() => {gotoday()}}> Today </button>
          <button onClick={() => {frontmonth()}}> &gt; </button>
      </div>
      <div className='week'>
        {weekArr.map((arr, index)=>{
          return <div><p>{arr}</p></div>
        })}
      </div>
      <div className='calendar'>        
        {/* {arrWeek.map((weeks) => {
          return(
            <div className='calendar-week'>
              { weeks.map((day, index)=>{
                console.log(day);
                if ( index <= PLDay ) {
                  if ( viewMonth === 0 ) {
                    return <Day year = {viewYear} month = {viewMonth + 1} day={day} clickEvent={()=>{openModal(viewYear, viewMonth + 1, day)}}/>
                  } else if ( index <= PLDay) {
                    return <Day year = {viewYear - 1} month = {12} day={day} clickEvent={()=>{openModal(viewYear - 1, 12 , day)}}/>
                  }
                } 
                  // else {
                  //   return <Day year = {viewYear} month = {viewMonth} day={day} clickEvent={()=>{openModal(viewYear, viewMonth, day)}}/>
                  // }
                // else if ( day === 0 ) {
                //   return <Day year = {prevYear} month = {prevMonth+2} day={nextmonth - 5 + index} clickEvent={()=>{openModal(prevYear,prevMonth+2,nextmonth - 5 + index)}}/>
                // } else {
                //   return <Day year = {prevYear} month = {prevMonth+1} day={day} clickEvent={()=>{openModal(prevYear,prevMonth+1,day)}}/>
                // }
              }) }
            </div>
          )
        })} */}
        {
          arrWeek.map((weeks) => {
            return(
              <div className='calendar-week'>
                {
                  weeks.map((day, index) => {
                    if ( viewMonth === 0 ) {
                      if ( PLDay === 6 ) {
                        return( <Day year = {viewYear} month = {12} day={day} clickEvent={() => {openModal(viewYear - 1, 12, day)}}/> )
                      } else {
                        return( <Day year = {viewYear} month = {viewMonth} day={day} clickEvent={() => {openModal(viewYear, viewMonth+1, day)}}/> )
                      }
                  } else if ( viewMonth === 11 ) {
                    return ( <Day year = {viewYear} month = {viewMonth + 1} day = {day} clickEvent = {() => {openModal(viewYear, viewMonth + 1, day)}}/>)
                  } else {
                    return ( <Day year = {viewYear} month = {viewMonth + 1} day = {day} clickEvent = {() => {openModal(viewYear, viewMonth + 1, day)}}/>)
                  }
                  })
                }
              </div>
            )
          })
        }
        {/* {
          dates.map((value) => {
            return <div className='calendar-week'> {value} </div>
          })
        } */}
      </div>        
      </div>
    );
  }

  

  
export default Calendar;