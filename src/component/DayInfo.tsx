import {useState, useRef, useEffect} from 'react';
import '../css/main.css';

interface IListItem{
    text:string;
}

interface ToDoList {
    uid : string;
    List : string;
}

function ListItem(props : IListItem){
    let [isChecked,setIsChecked] = useState<boolean>();

    return (
        <div className="todo-line">
            <input type="checkbox" onChange={(e)=>{setIsChecked(e.target.checked);}}/>
            <p style={isChecked ? {textDecoration: "text-through"} : {textDecoration:"none"}}>{props.text}</p>
        </div>
    );
}

export default function DayInfo(props : IDayInfo){

    let [list, setList] = useState<ToDoList[]>([]);
    let [lines, setLines] = useState<Array<JSX.Element>>([]);


    useEffect(() => {
        fetch('https://project-calendar-701d3-default-rtdb.firebaseio.com/ToDoList.json', {
            method : 'GET'
        })
        .then(res => {
            return res.json();
        })
        .then(data => {
            const arr = Object.entries<ToDoList>(data);
            const temp = [...list];
            arr.forEach((value) => {
                value[1] = {
                    ...value[1],
                    uid : value[0]
                }
                temp.push(value[1]);
            });
            setList(temp);
        });
    },[]);

    let [text, setText] = useState<string>("");
    //let [checked, setChecked] = useState<boolean>(false);


    let inputField = useRef<HTMLInputElement>(null);

    function createLine(){

        if(text != ""){
            let line : JSX.Element = (
                <ListItem text={text}/>
            );
            
            // 아련한 복사와 같다
            // let temp : Array<JSX.Element> = [];
            // temp = Array.from(lines);
            // console.log(line);
            // temp.push(line);
            
            // console.log(temp);
            setLines([...lines, line]);
            console.log(lines);
            setText("");

            fetch('https://project-calendar-701d3-default-rtdb.firebaseio.com/ToDoList.json', {
                method : 'POST'
            })
        }
        
    }

    const TODOLIST = {
        List : list
    }
    useEffect(()=>{
        inputField.current?.focus();
    },[]);

    return (
        <div className="day-info">
            <div className="today">{props.year}.{props.month}.{props.day}</div>
            <br/>
            <div className="day-list">
                <div style={{display:"flex"}}>
                    <input type="text" ref={inputField} value={text} onChange={(e)=>{setText(e.currentTarget.value)}} onKeyUp={(e)=>{if(e.key === 'Enter') createLine()}}/>
                    <div className="createLine" onClick={createLine} >추가</div>
                </div>

                <br/>
                <div style={{"overflowY":"scroll","height":"250px"}}>
                    {
                        list.map((TODOLIST : ToDoList , index) => {
                            return (TODOLIST.List)
                        })
                    }
                {/* <ul> */}
                    {/* {lines ? lines : <p>할 일을 추가해보세요</p>} */}
                {/* </ul>     */}
                </div>
                            
            </div>
        </div>
    );
}