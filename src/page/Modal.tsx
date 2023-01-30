import React, {useState} from 'react';
import '../App.css';

function Modal() {
    const [isModal, setIsModal] = useState<boolean>(false);
    const toggleModal = () => {
        setIsModal(!isModal);
    };

    return (
        <div>
            <button onClick={toggleModal}>CLICK</button>

            {isModal && (
                <div className="Modal-content">
                    <h2>This is Modal</h2>
                    <div>this is modal modla modal</div>
                    <button onClick={toggleModal}>X</button>      
                </div>
            )}
            
        </div>
        
    );
}

export default Modal;
