import React, {useState} from 'react';
import '../App.css';

function createLine(lines : Array<JSX.Element>, setLines : React.Dispatch<React.SetStateAction<JSX.Element[]>>){
    let line : JSX.Element = <li>asdqwedfgert</li>;
    
    let temp : Array<JSX.Element> = [];
    temp = Array.from(lines);
    temp.push(line);

    
    setLines(temp);
}


function DayInfo(props : IDayInfo){

    let [lines, setLines] = useState<Array<JSX.Element>>([]);

    return (
        <div className="day-info">
            <div className="today">2023.01.{props.day}</div>
            <br/>
            <div className="day-list">
                
                <div className="createLine" onClick={() => {createLine(lines as Array<JSX.Element>, setLines);}}></div>
                <br/>
                <div style={{"overflowY":"scroll","height":"250px"}}>
                <ul>
                    {lines ? lines?.map((v, index)=>{
                        return <div className="todo-line" key={index}>asd</div>
                    }) : <p>할 일을 추가해보세요</p>}
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
            <div className='Modal-day' onClick={toggleModal}>{props.day}</div>

            {isModal && (
                <div className='Modal-container'>
                    <div className="Modal-content" style={{
                        minWidth: props.width,
                        minHeight: props.height
                    }}>
                        { <DayInfo day={props.day}/> }
                        <button onClick={toggleModal} className="Modal-btn">x</button>      
                    </div>
                </div>
            )}
        </div>
    );
}

export default Modal;
