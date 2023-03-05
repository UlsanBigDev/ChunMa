import React,{useState, useEffect} from 'react';
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
  style? : React.CSSProperties;
}

function Calendar(props : {setModal:Function}) {
  
  function Day(props : IDay) {
    return <div className='day' style={props.style} onClick={()=>{props.clickEvent(props.day)}}><p>{ props.day }</p></div>;
  }

  // 화면에 보이는 달의 배열
  const monthTemp = ["January","Feburary","March","April","May","June","July","Agust","September","October","November","December"];

  // 화면에 보이는 요일의 배열
  const weekArr = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  function openModal(year: number, month: number, day : number) {
    // setModalComponet();
    props.setModal(<DayInfo year = {year} month = {month} day = {day}/>);
  }

  // 오늘 날짜를 state로 받기
  let [date, setDate] = useState(new Date());

  // 이번 년도
  let [viewYear, setViewYear] = useState(date.getFullYear());

  // 이번 월
  let [viewMonth, setViewMonth] = useState(date.getMonth());

  // 지난 달
  let prevLast = new Date(viewYear, viewMonth, 0);
  // 이번 달
  let thisLast = new Date(viewYear, viewMonth + 1, 0);

  // 지난 달 마지막 날짜
  let PLDate = prevLast.getDate();
  // 지난 달 마지막 요일
  let PLDay = prevLast.getDay();

  // 이번 달 마지막 날짜
  let TLDate = thisLast.getDate();
  // 이번 달 마지막 요일
  let TLDay = thisLast.getDay();

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

  // 보이는 달의 날짜를 담을 배열들
  let prevDates = [];
  let thisDates = [];
  let nextDates = [];

  // 이전달을 표시하는 날짜들
  if (PLDay !== 6) { //마지막 날짜가 토요일에 끝아니면 굳이 할 필요가 없으므로
    for ( let i = 0; i < PLDay + 1; i++ ) {
      prevDates.unshift(PLDate - i);
    }
  }

  // 이번달의 날짜
  for ( let i = 1; i <= TLDate; i++ ) {
    thisDates.push(i);
  }

  // 다음 달의 날짜
  for ( let i = 1; i < 7 - TLDay; i++ ) {
    nextDates.push(i);
  }

  // 각각의 배열을 합치기
  let dates = prevDates.concat(thisDates, nextDates);

  // 주 구하기 -1을 해주는 이유는 배열은 0부터 시작하기 때문에
  let weekNum = dates.length / 7 - 1;

  // 원래 있던 배열을 이중 배열로 만들기(css때문에)
  const arrWeek = [];
  for (let i = 0; i <= weekNum; i++){
    arrWeek.push(dates.slice(0 + 7*i, 7 * (i+1))) //0,7 7,14 14,21 21,28 28,35
  }
  
  return (
    <div>
      <div className='month'>
        <p>{monthTemp[viewMonth]} {viewYear}</p>
    </div>
    <div className='MonthMove'>
        <button className ='btn' onClick={() => {beformonth()}}> &lt; </button>
        <button className ='btn-today' onClick={() => {gotoday()}}> Today </button>
        <button className ='btn' onClick={() => {frontmonth()}}> &gt; </button>
    </div>
    <div className='week'>
      {weekArr.map((arr, index)=>{
        return <div><p>{arr}</p></div>
      })}
    </div>
    <div className='calendar'>
      {
        arrWeek.map((weeks, index) => {
          if ( index === 0 ) {
            return (
              <div className='calendar-week'>
                {
                  weeks.map((day, index) => {
                    if ( viewMonth === 0 ) {
                      if ( PLDay === 6 ) {
                        return( <Day year = {viewYear} month = {viewMonth + 1} day = {day} clickEvent = {() => {openModal(viewYear, viewMonth + 1, day)}} /> )
                      } else {
                        if ( index <= PLDay ) {
                          if ( index === 0) {
                            return( <Day year = {viewYear - 1} month = {12} day = {day} clickEvent = {() => {openModal(viewYear - 1, 12, day)}} style = {{color:"rgba(250, 133, 133, 0.5)"}} /> )
                          } else if ( index === 6) {
                            return( <Day year = {viewYear - 1} month = {12} day = {day} clickEvent = {() => {openModal(viewYear - 1, 12, day)}} style = {{color:"rgba(85, 85, 255, 0.5)"}} /> )
                          } else {
                            return( <Day year = {viewYear - 1} month = {12} day = {day} clickEvent = {() => {openModal(viewYear -1 , 12, day)}} style = {{color:"rgba(0, 0, 0, 0.7)"}} /> )
                          }
                        } else {
                          return( <Day year = {viewYear} month = {viewMonth + 1} day = {day} clickEvent = {() => {openModal(viewYear, viewMonth + 1, day)}} /> )
                        }
                      }
                    } else {
                      if ( PLDay === 6 ) {
                        return( <Day year = {viewYear} month = {viewMonth + 1} day = {day} clickEvent = {() => {openModal(viewYear, viewMonth + 1, day)}} /> )
                      } else {
                        if ( index <= PLDay ) {
                          if ( index === 0) {
                            return( <Day year = {viewYear} month = {viewMonth} day = {day} clickEvent = {() => {openModal(viewYear, viewMonth, day)}} style = {{color:"rgba(250, 133, 133, 0.6)"}} /> )
                          } else if ( index === 6) {
                            return( <Day year = {viewYear} month = {viewMonth} day = {day} clickEvent = {() => {openModal(viewYear, viewMonth, day)}} style = {{color:"rgba(85, 85, 255, 0.6)"}} /> )
                          } else {
                            return( <Day year = {viewYear} month = {viewMonth} day = {day} clickEvent = {() => {openModal(viewYear, viewMonth, day)}} style = {{color:"rgba(20, 20, 20, 0.6)"}} /> )
                          }
                        } else {
                          return( <Day year = {viewYear} month = {viewMonth + 1} day = {day} clickEvent = {() => {openModal(viewYear, viewMonth + 1, day)}} /> )
                        }
                      }
                    }
                  })
                }
              </div>
            )
          } else if ( index === weekNum ) {
            return(
              <div className='calendar-week'>
                {
                  weeks.map((day, index) => {
                    if ( viewMonth === 11 ) {
                      if ( TLDay === 6 ) {
                        return( <Day year = {viewYear} month = {viewMonth + 1} day = {day} clickEvent = {() => openModal(viewYear, viewMonth + 1, day)} /> )
                      } else {
                        if ( index <= TLDay ) {
                          return ( <Day year = {viewYear} month = {viewMonth + 1} day = {day} clickEvent = {() => openModal(viewYear, viewMonth + 1, day)} /> )
                        } else {
                          if ( index === 0) {
                            return( <Day year = {viewYear + 1} month = {1} day = {day} clickEvent = {() => {openModal(viewYear + 1, 1, day)}} style = {{color:"rgba(250, 133, 133, 0.6)"}} /> )
                          } else if ( index === 6) {
                            return( <Day year = {viewYear + 1} month = {1} day = {day} clickEvent = {() => {openModal(viewYear + 1, 1, day)}} style = {{color:"rgba(85, 85, 255, 0.6)"}} /> )
                          } else {
                            return( <Day year = {viewYear + 1} month = {1} day = {day} clickEvent = {() => {openModal(viewYear + 1, 1, day)}} style = {{color:"rgba(20, 20, 20, 0.6)"}} /> )
                          }
                        }
                      }
                    } else {
                      if ( TLDay === 6 ) {
                        return( <Day year = {viewYear} month = {viewMonth + 1} day = {day} clickEvent = {() => openModal(viewYear, viewMonth + 1, day)} /> )
                      } else {
                        if ( index <= TLDay ) {
                          return ( <Day year = {viewYear} month = {viewMonth + 1} day = {day} clickEvent = {() => openModal(viewYear, viewMonth + 1, day)} /> )
                        } else {
                          if ( index === 0) {
                            return( <Day year = {viewYear} month = {viewMonth + 2} day = {day} clickEvent = {() => {openModal(viewYear, viewMonth + 2, day)}} style = {{color:"rgba(250, 133, 133, 0.6)"}} /> )
                          } else if ( index === 6) {
                            return( <Day year = {viewYear} month = {viewMonth + 2} day = {day} clickEvent = {() => {openModal(viewYear, viewMonth + 2, day)}} style = {{color:"rgba(85, 85, 255, 0.6)"}} /> )
                          } else {
                            return( <Day year = {viewYear} month = {viewMonth + 2} day = {day} clickEvent = {() => {openModal(viewYear, viewMonth + 2, day)}} style = {{color:"rgba(20, 20, 20, 0.6)"}} /> )
                          }
                        }
                      }
                    }
                  })
                }
              </div>
            )
          } else {
            return(
              <div className='calendar-week'>
                {
                  weeks.map((day, index) => {
                    return (<Day year = {viewYear} month = {viewMonth + 1} day={day} clickEvent={() => {openModal(viewYear, viewMonth + 1, day)}}/>)
                  })
                }
              </div>
            )
          }
        })
      }
      </div>
    </div>
  );
}

export default Calendar;
