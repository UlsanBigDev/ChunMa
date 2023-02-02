import React, {useState} from 'react';
import '../App.css';

interface IModal {
    width : number;
    height : number;
    day : number;
}

interface IDayInfo {
    day : number;
}

function createLine(lines : NodeListOf<HTMLElement>, setLines : React.Dispatch<React.SetStateAction<NodeListOf<HTMLElement> | undefined>>){
    let line = <li>asdqwedfgert</li>;
    
    let temp = [...lines, line];
    
    setLines(temp);
}

function DayInfo(props : IDayInfo){

    let [lines, setLines] = useState<NodeListOf<HTMLElement>>();

    return (
        <div className="day-info">
            <div className="today">2023.01.{props.day}</div>
            <br/>
            <div className="day-list">
                
                <div className="createLine" onClick={() => {createLine(lines as NodeListOf<HTMLElement>, setLines);}}></div>
                <ul>
                    {lines ? lines?.map((v, index)=>{
                        return <li></li>
                    }) : <p>할 일을 추가해보세요</p>}
                </ul>                
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
