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
}

function Calendar(props : {setModal:Function}) {
  
  function Day(props : IDay) {
    return <div className='day' onClick={()=>{props.clickEvent(props.day)}}><p>{ props.day }</p></div>;
  }

  const monthTemp = ["January","Feburary","March","April","May","June","July","Agust","September","October","November","December"];
    
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
    // console.log(prevLast);

    // 이번 달
    let thisLast = new Date(viewYear, viewMonth + 1, 0);
    // console.log(thisLast);

    let TLFirstDate = new Date(viewYear,viewMonth,1).getDate();

    // 지난 달 마지막 날짜
    let PLDate = prevLast.getDate();
    // console.log(PLDate);

    // 지난 달 마지막 요일
    let PLDay = prevLast.getDay();
    // console.log(PLDay);

    // 이번 달 마지막 날짜
    let TLDate = thisLast.getDate();
    // 이번 달 마지막 요일
    let TLDay = thisLast.getDay();

    let prevDates = [];
    let thisDates = [];
    let nextDates = [];

    // let weekNum = Math.ceil((firstDay + lastDate) / 7); //prevDay -> firstDay 진짜 바본가

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
    let weekNum = dates.length / 7 - 1; //해당 달 주 수 - 1

    const arrWeek = [];
    for (let i = 0; i <= weekNum; i++){
      arrWeek.push(dates.slice(0 + 7*i, 7 * (i+1))) //0,7 7,14 14,21 21,28 28,35
    }

    const weekArr = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]

    return (
      <div>
        <div className='month'>
          <p>{monthTemp[viewMonth]} {viewYear}</p>
      </div>
      <div className='MonthMove'>
          <button className='btn' onClick={() => {beformonth()}}> &lt; </button>
          <button className='btn-today' onClick={() => {gotoday()}}> Today </button>
          <button className='btn' onClick={() => {frontmonth()}}> &gt; </button>
      </div>
      <div className='week'>
        {weekArr.map((arr, index)=>{
          return <div className='week'><p>{arr}</p></div>
        })}
      </div>
      <div className='calendar'>        
        {
          // 1. index가 0일 때, (첫째 주) -> 달 변경 , day 가져오기 -> 1월 일 때, 2~11월 일 때, 12월 일때
          // 2. index가 마지막일 때 (마지막 주) -> 달 변경, day 가져오기 -> 1월 일 때, 2~11월 일 때, 12월 일때
          // 3. 나머지 (나머지 주) -> 달, day 가져오기 -> 1월 일 때, 2~11월 일 때, 12월 일때
          arrWeek.map((weeks,index) => {
            console.log(weekNum,weeks,index)
            if(index==0){
              return(
                <div className='calendar-week'>{
                  weeks.map((day, index)=>{
                    if ( viewMonth === 0 ) {
                      if ( PLDay === 6 ) {
                        return( <Day year = {viewYear} month = {viewMonth + 1} day={day} clickEvent={() => {openModal(viewYear, viewMonth + 1, day)}}/> )
                      }
                      else {
                        if (index<=PLDay){
                          return(<Day year = {viewYear - 1} month = {12} day={weeks[index]} clickEvent={() => {openModal(viewYear - 1, 12, weeks[index])}}/>)
                        }
                        else {
                          return(<Day year = {viewYear} month = {viewMonth + 1} day={weeks[index]} clickEvent={() => {openModal(viewYear, viewMonth + 1, weeks[index])}}/>)
                        }
                      }
                    } else {
                      if ( PLDay === 6 ){
                        return( <Day year = {viewYear} month = {viewMonth + 1} day={day} clickEvent={() => {openModal(viewYear, viewMonth + 1, day)}}/> )
                      }
                      else {
                        if ( index <= PLDay ) {
                          return(<Day year = {viewYear} month = {viewMonth} day = {weeks[index]} clickEvent = { () => {openModal(viewYear, viewMonth, weeks[index])}}/> )
                        }
                        else {
                          return(<Day year = {viewYear} month = {viewMonth + 1} day = {weeks[index]} clickEvent = { () => {openModal(viewYear, viewMonth + 1, weeks[index])}}/> )
                        }
                      }
                    }
                  })
                }
                </div>
              )
            }
            else if(index==weekNum){
              return(
                <div className='calendar-week'>
                  {weeks.map((day,index)=>{
                    if (viewMonth==11){
                      if ( TLDay === 6 ) {
                          return( <Day year = {viewYear} month = {viewMonth + 1} day={day} clickEvent={() => {openModal(viewYear, viewMonth + 1, day)}}/> )
                        } else {
                          if ( day <= index ) {
                            return( <Day year = {viewYear + 1} month = {1} day={day} clickEvent={() => {openModal(viewYear + 1, 1, day)}}/> )
                          } else {
                            return( <Day year = {viewYear} month = {viewMonth + 1} day={day} clickEvent={() => {openModal(viewYear, viewMonth + 1, day)}}/> )
                          }
                        }
                      } else {
                        if ( TLDay === 6 ) {
                          return( <Day year = {viewYear} month = {viewMonth + 1} day={day} clickEvent={() => {openModal(viewYear, viewMonth + 1, day)}}/> )
                        } else {
                          if ( TLDay < index ) {
                            return( <Day year = {viewYear} month = {viewMonth + 2} day={day} clickEvent={() => {openModal(viewYear, viewMonth + 2, day)}}/> )
                          } else {
                            return( <Day year = {viewYear} month = {viewMonth + 1} day={day} clickEvent={() => {openModal(viewYear, viewMonth + 1, day)}}/> )
                          }
                        }
                      }
                    }
                  )}
                </div>
              )
            }
            else {
              return(
                <div className = 'calendar-week'> {
                  weeks.map((day, index) => {
                    return (<Day year = {viewYear} month = {viewMonth + 1} day={day} clickEvent={() => {openModal(viewYear, viewMonth + 1, day)}}/>)
                  })
                }
                </div>
              )
            }

            
            // return(
            //   <div className='calendar-week'>
                
            //     {
            //       weeks.map((day, index) => {
            //         console.log(day, index)
            //         if ( viewMonth === 0 ) {
            //           if ( PLDay === 6 ) {
            //             return( <Day year = {viewYear} month = {12} day={day} clickEvent={() => {openModal(viewYear - 1, 12, day)}}/> )
            //           } else {
            //             return( <Day year = {viewYear} month = {viewMonth} day={day} clickEvent={() => {openModal(viewYear, viewMonth+1, day)}}/> )
            //           }
            //       } else if ( viewMonth === 11 ) {
            //         return ( <Day year = {viewYear} month = {viewMonth + 1} day = {day} clickEvent = {() => {openModal(viewYear, viewMonth + 1, day)}}/>)
            //       } else {
            //         return ( <Day year = {viewYear} month = {viewMonth + 1} day = {day} clickEvent = {() => {openModal(viewYear, viewMonth + 1, day)}}/>)
            //       }
            //       })
            //     }
            //   </div>
            // )
          })
        }
      </div>        
      </div>
    );
  }

  

  
export default Calendar;