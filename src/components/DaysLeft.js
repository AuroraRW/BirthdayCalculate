import React from 'react';
import {auth} from '../modules/FireAuth';
import {getQuotes} from '../modules/GetQuotes';
import './style.css';
import Button from './Button';
import {Link} from "react-router-dom";

class DaysLeft extends React.Component{
    constructor(props){
        super(props);
        // reset the result 
        this.props.onReset();

        this.state = {
            Text: "",
            Author: ""
        }
    }
    componentDidMount () {
        getQuotes('https://type.fit/api/quotes')
        .then((response)=>{
            let index = Math.floor(Math.random()*(response.length-1));
    
            this.setState({
                Text: response[index].text,
                Author: response[index].author
              })
            if (!this.state.Author){
                this.state.Author = 'Anonymous';
            } 
        })
        .catch(()=>{
            console.log("Could not get data from API");
          })
    }
    userLogOut(){
        auth.signOut()
        .then(() => {
            console.log("Sign out sucessfully!")
        })
        .catch(()=>{
            console.log("Could not log out");
        })
    }
    
    render(){
        // have not got result
        if(this.props.result === -1){
            return(
                <></>
            );
        // today is birthday
        }else if(this.props.result === 0){
                return(
                    <div className="row">
                        <div className="col-12 birthday-layout">
                            <div id="birthday-information">
                                <h1 className="happy">Happy birthday, {this.props.name}</h1>
                                <h4 className="quotes">{this.state.Text}</h4>
                                <h5 className="author">{this.state.Author}</h5>
                            </div>
                            <Link style={{textDecoration: 'none'}} to="/">
                                <Button type="submit" name="logout-btn" title="Log Out" onClick={()=>this.userLogOut()}/>
                            </Link>
                        </div>
                    </div>
                );
        }
        // show the days left to birthday
        else{
            return(
                <div className="row">
                    <div className="col-12 birthday-layout">
                        <div id="birthday-information">
                            <h1 className="birthday">{this.props.result} DAYS LEFT</h1>
                            <h3 className="birthday">UNTILL YOUR BIRTHDAY!</h3>
                        </div>
                        <Link style={{textDecoration: 'none'}} to="/">
                            <Button type="submit" name="logout-btn" title="Log Out" onClick={()=>this.userLogOut()}/>
                        </Link>
                    </div>
                </div>
            );
        }
        
    }
}

export default DaysLeft;