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
                <div className='Modal-container'>
                    <div className="Modal-content">
                        <h2>This is Modal</h2>
                        <p>
                            This letter started as a secret in England...
                        </p>
                        <button onClick={toggleModal} className="Modal-btn">x</button>      
                    </div>
                </div>
            )}
            
        </div>
        
    );
}

export default Modal;
