import React, {useState} from 'react';
import '../App.css';



function Modal(props : IModal) {

    const [isModal, setIsModal] = useState<boolean>(false);
    const toggleModal = () => {
        setIsModal(!isModal);
    };

    return (
        <div>            
            <div className='Modal-container'>
                <div className="Modal-content" style={{
                    minWidth: props.width,
                    minHeight: props.height
                }}>
                    {props.component}                    
                </div>                
            </div>
        </div>
    );
}

export default Modal;
