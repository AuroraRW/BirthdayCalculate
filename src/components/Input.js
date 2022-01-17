import React from 'react';
import './style.css';

class Input extends React.Component{
    updateParentState(e){
        this.props.updateState(this.props.inputKey, e.target.value);
    }
    render(){
        return(
            <div>
                <label htmlFor={this.props.name} className="input-item">{this.props.title}  </label>
                <input id={this.props.name} 
                       type={this.props.type} 
                       name={this.props.name} 
                       placeholder={this.props.placeholder} 
                       onChange = {(e)=>this.updateParentState(e)}/>
            </div>
        );
    }
}

export default Input;