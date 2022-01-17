import React from 'react';
import './style.css';

class TitleText extends React.Component{
    render(){
        return(
            <div className="row">
                <div className="col title-layout">
                    <h1 className="title">How many days left to your birthday?</h1>
                </div>
            </div>
        );
    }
}

export default TitleText;



