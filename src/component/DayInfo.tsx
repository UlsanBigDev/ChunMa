import {useState, useRef, useEffect} from 'react';
import '../css/main.css';


interface IListItem{
    testtext:string;
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
            <p style={isChecked ? {textDecoration: "line-through"} : {textDecoration:"none"}}>{props.testtext}</p>
        </div>
    );
}

export default function DayInfo(props : IDayInfo){

    let [list, setList] = useState<ToDoList[]>([]);
    let [lines, setLines] = useState<Array<JSX.Element>>([]);

    useEffect(() => {
        fetch(`https://project-calendar-701d3-default-rtdb.firebaseio.com/ToDoList/${props.year}/${props.month}/${props.day}.json`, {
            method : 'GET'
        })
        .then(res => {
            return res.json();
        })
        .then(data => {
            let arr = Object.entries<ToDoList>(data);
            let temp = [...list];
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
                <ListItem testtext={text}/>
            );
            
            // 아련한 복사와 같다
            // let temp : Array<JSX.Element> = [];
            // temp = Array.from(lines);
            // console.log(line);
            // temp.push(line);
            
            // console.log(temp);
            setLines([...lines, line]);
            const ToDoList = {
                List : text
            }

            fetch(`https://project-calendar-701d3-default-rtdb.firebaseio.com/ToDoList/${props.year}/${props.month}/${props.day}/.json`, {
                method : 'POST',
                body : JSON.stringify(ToDoList)
            })
            setText("");
        }

    }

    function deleteList(list : any) {
        fetch(`https://project-calendar-701d3-default-rtdb.firebaseio.com/ToDoList/${props.year}/${props.month}/${props.day}/${list.uid}.json`, {
            method : 'DELETE'
        })
    }

    let [is2Checked, setIs2Checked] = useState<boolean>();
    console.log(list);
    console.log(list.length);

    return (
        <div className="day-info"> {/* 모달 창 */}
            <div className="today">{props.year}.{props.month}.{props.day}</div>
            <br/>
                <div className="day-list">
                    <div style={{display:"flex"}}>
                        <input type="text" ref={inputField} value={text} onChange={(e)=>{setText(e.currentTarget.value)}} onKeyUp={(e)=>{if(e.key === 'Enter') createLine()}}/>
                        <div className = "deleteLine" onClick={createLine} >추가</div>
                    </div>

                    <br/>
                    <div style={{"overflowY":"scroll","height":"250px"}}>
                        <ul>
                            {
                                list.length == 0 ?
                                (
                                    <li className="todo-line">
                                        <p style={is2Checked ? {textDecoration: "line-through"} : {textDecoration:"none"}} > 로딩 중 </p>
                                    </li>
                                )
                                :
                                list.map((value : ToDoList, index) => {
                                    return(
                                        <li className='todo-line'>
                                            <input type="checkbox" onChange={(e)=>{setIs2Checked(e.target.checked);}}/>
                                            <p style={is2Checked ? {textDecoration: "line-through"} : {textDecoration:"none"}} >{value.List} </p>
                                            <div className = "createLine" onClick = {() => {deleteList(value)}}> 삭제 </div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
        </div>
    );
}