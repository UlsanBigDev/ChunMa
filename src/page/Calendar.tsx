import React,{useState} from 'react';
import logo from './logo.svg';
import '../App.css';
import Modal from './Modal';
import Home from './Home';
import DayInfo from '../component/DayInfo';

interface IDay {
  day : number;
  clickEvent : Function;
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

    let [updateMonth, setUpdateMonth] = useState(prevMonth);
    let [updateYear, setUpdateYear] = useState(prevYear);

    // 저번 달의 마지막 날짜(전 달의 날짜를 표기하기 위해서)
    let previousmonth = new Date(prevYear,prevMonth,0).getDate();
    
    console.log(lastDate, prevYear, monthTemp[prevMonth], prevDate, dayTemp[prevDay]);

    let weekNum = Math.ceil((firstDay + lastDate) / 7); //prevDay -> firstDay

    function openModal(day : number) {
      // setModalComponet();
      props.setModal(<DayInfo year = {updateYear} month = {updateMonth+1} day={day}/>);
    }
  
    const arr=[];

    for (let i = previousmonth - firstDay+1; i<=previousmonth; i++){
      arr.push(i);
    }

    for (let i = 1; i<=lastDate; i++){
      arr.push(i);
    }

    let i = 1;
    while (arr.length < weekNum * 7){
      arr.push(i);
      i += 1;
    }

    const arrWeek=[];
    for (let i = 0; i<weekNum; i++){
      arrWeek.push(arr.slice(0 + 7*i, 7 * (i+1))) //0,7 7,14 14,21 21,28 28,35
    }
    const weekArr = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]   
    
    // ---------추가된 코드----------(달(O), 년, 일(O), openModal 수정)
    // 이전 달 버튼을 눌렀을 때 작동하는 함수
    function beforemonth() {
      if (updateMonth < 1) {
        updateMonth = 12;
        setUpdateYear(updateYear - 1)
      }
      setUpdateMonth(updateMonth - 1)
    }

    // 다음 달 버튼을 눌렀을 때 작동하는 함수
    function frontmonth() {
      if (updateMonth > 10) {
        updateMonth = -1;
        setUpdateYear(updateYear + 1)
      } 
      setUpdateMonth(updateMonth + 1)
    }

    // 오늘 날짜로 돌아오는 함수
    function today() {
      setUpdateMonth(prevMonth);
      setUpdateYear(prevYear);
    }
    
    return (
      <div>
        <div className='month'>
          <p>{monthTemp[updateMonth]} {updateYear}</p>
      </div>
      {/* 추가된 코드 */}
      <div className='MonthMove'>
          <button onClick={()=>{beforemonth()}}> &lt; </button>
          <button onClick={() => {today()}}> Today </button>
          <button onClick={() => {frontmonth()}}> &gt; </button>
      </div>
      <div className='week'>
        {weekArr.map((arr, index)=>{
          return <div><p>{arr}</p></div>
        })}
      </div>
      <div className='calendar'>        
        {arrWeek.map((weeks) => {
          return(
            <div className='calendar-week'>        
              { weeks.map((day)=>{
                return <Day day={day} clickEvent={()=>{openModal(day)}}/>
              }) }              
            </div>
          )
        })}
        
      </div>        
      </div>
    );
  }

  

  
export default Calendar;