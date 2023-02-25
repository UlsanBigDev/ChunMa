import {useState, useRef, useEffect} from 'react';
import '../css/main.css';

interface IListItem{
    text:string;
}

function ListItem(props : IListItem){
    let [isChecked,setIsChecked] = useState<boolean>();

    return (
        <div className="todo-line">
            <input type="checkbox" onChange={(e)=>{setIsChecked(e.target.checked);}}/>
            <p style={isChecked ? {textDecorationLine: "line-through"} : {textDecorationLine:"none"}}>{props.text}</p>
        </div>
    );
}

export default function DayInfo(props : IDayInfo){

    let [lines, setLines] = useState<Array<JSX.Element>>([]);
    let [text, setText] = useState<string>("");
    //let [checked, setChecked] = useState<boolean>(false);


    let inputField = useRef<HTMLInputElement>(null);

    function createLine(){

        if(text != ""){
            let line : JSX.Element = <ListItem text={text}/>
            
            setLines([...lines, line])
        
            setText("");
        }
        
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
                <ul>
                    {lines.length != 0 ? lines : <p>할 일을 추가해보세요</p>}
                </ul>    
                </div>
                            
            </div>
        </div>
    );
}