import React, {useState} from 'react';
import '../App.css';
interface IModal {
    component : React.ReactNode;
}
function Modal(props : IModal) {
    const [isModal, setIsModal] = useState<boolean>(false);
    const toggleModal = () => {
        setIsModal(!isModal);
    };

    return (
        <div>
            <button onClick={toggleModal}>CLICK</button>

            {isModal && (
                <div className='Modal-container'>
                    <div className="Modal-content">
                        { props.component }
                        <button onClick={toggleModal} className="Modal-btn">x</button>      
                    </div>
                </div>
            )}
            
        </div>
        
    );
}

export default Modal;
