import React from 'react';
import './style.css';

export default function Input (props){
    const updateParentState = (e)=>{
        props.updateState(props.inputKey, e.target.value);
    }
    return(
        <div>
            <label htmlFor={props.name} className="input-item">{props.title}  </label>
            <input id={props.name} 
                    type={props.type} 
                    name={props.name} 
                    placeholder={props.placeholder} 
                    onChange = {(e)=>updateParentState(e)}/>
        </div>
    );
}