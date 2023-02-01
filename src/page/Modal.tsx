import React, {useState} from 'react';
import '../App.css';
interface IModal {
    component : React.ReactNode;
    width : number;
    height : number;
    day : number;
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
                        { props.component }
                        <button onClick={toggleModal} className="Modal-btn">x</button>      
                    </div>
                </div>
            )}
            
        </div>
        
    );
}

export default Modal;
