import React from 'react';
import './style.css';


export default function Button (props){
    const handleClick = ()=>{
        props.onClick();
    }
    return(
        <button className="btn btn-warning" 
                type={props.type} 
                name={props.name}
                onClick={handleClick}>{props.title}
        </button>
    )
}