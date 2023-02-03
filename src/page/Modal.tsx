import React, {useEffect, useRef, useState} from 'react';
import '../App.css';



function DayInfo(props : IDayInfo){

    let [lines, setLines] = useState<Array<JSX.Element>>([]);
    let [text, setText] = useState<string>("");
    //let [checked, setChecked] = useState<boolean>(false);


    let inputField = useRef<HTMLInputElement>(null);

    function createLine(){

        //let [isCheck,setIsChecked] = useState<boolean>();
        let isChecked=false;

        if(text != ""){
            let line : JSX.Element = (
                <div className="todo-line">
                    <input type="checkbox" onChange={(e)=>{console.log(isChecked = e.target.checked);console.log(isChecked)}}/>
                    <p style={{textDecoration: isChecked ? 'line-through' : 'none'}}>{text}</p>
                </div>
                );
            
            let temp : Array<JSX.Element> = [];
            temp = Array.from(lines);
            temp.push(line);
        
            setLines(temp);
        }
        setText("");
    }

    useEffect(()=>{
        inputField.current?.focus();
    },[]);

    return (
        <div className="day-info">
            <div className="today">2023.01.{props.day}</div>
            <br/>
            <div className="day-list">
                <div style={{display:"flex"}}>
                    <input type="text" ref={inputField} value={text} onChange={(e)=>{setText(e.currentTarget.value)}} onKeyUp={(e)=>{if(e.key === 'Enter') createLine()}}/>
                    <div className="createLine" onClick={createLine} >추가</div>
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

function Modal(props : IModal) {

    const [isModal, setIsModal] = useState<boolean>(false);
    const toggleModal = () => {
        setIsModal(!isModal);
    };

    return (
        <div>
            <div className='Modal-day' onClick={toggleModal}>NNNNN</div>

            {isModal && (
                <div className='Modal-container'>
                    <div className="Modal-content" style={{
                        minWidth: props.width,
                        minHeight: props.height
                    }}>
                        { <DayInfo day={5555}/> }
                        <button onClick={toggleModal} className="Modal-btn">x</button>      
                    </div>
                </div>
            )}
        </div>
    );
}

export default Modal;
