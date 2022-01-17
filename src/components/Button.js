import React from 'react';
import './style.css';


class Button extends React.Component{
    handleClick(){
        this.props.onClick();
    }
    render(){
        return(
            <button className="btn btn-warning" 
                    type={this.props.type} 
                    name={this.props.name}
                    onClick={()=>this.handleClick()}>{this.props.title}
            </button>
        )
    }
}

export default Button;