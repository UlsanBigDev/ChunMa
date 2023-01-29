import React, {useState} from 'react';
import '../App.css';

function Modal(props: any) {

    const status = props.status ? "Modal-container on" : "Modal-container"

    return (
        <div className={status}>
            <h1>..?일</h1>
            {/* <button>+</button> */}
            <div>모달모달...</div>
            <div>모달..</div>
            <button onClick={()=>{}}>x</button>      
        </div>
    );
}

export default Modal;
