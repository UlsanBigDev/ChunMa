import {useState} from 'react';

function createLine(lines : Array<JSX.Element>, setLines : React.Dispatch<React.SetStateAction<JSX.Element[]>>, txt : string){
    if(txt != ""){
        let line : JSX.Element = (
            <div className="todo-line">
                <input type="checkbox"/>
                <p>{txt}</p>
            </div>
            );
        
        let temp : Array<JSX.Element> = [];
        temp = Array.from(lines);
        temp.push(line);
    
        setLines(temp);
    }
    
}

export default function DayInfo(props : IDayInfo){

    let [lines, setLines] = useState<Array<JSX.Element>>([]);
    let [text, setText] = useState<string>("");
    
    return (
        <div className="day-info">
            <div className="today">2023.01.{props.day}</div>
            <br/>
            <div className="day-list">
                <div style={{display:"flex"}}>
                    <input type="text" value={text} onChange={(e)=>{setText(e.currentTarget.value)}}/>
                    <div className="createLine" onClick={() => {createLine(lines as Array<JSX.Element>, setLines, text);}}>추가</div>
                </div>
                
                <br/>
                <div style={{"overflowY":"scroll","height":"250px"}}>
                <ul>
                    {lines ? lines : <p>할 일을 추가해보세요</p>}
                </ul>    
                </div>
                            
            </div>
        </div>
    );
}