import React from 'react';
import './style.css';
import {db, auth} from '../modules/FireAuth';
import { daysLeft } from '../modules/GetDays';
import Input from './Input';
import Button from './Button';
import {Link} from "react-router-dom";

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            Email: "",
            Password: "",
        }
        this.updateState = this.updateState.bind(this);
        this.userLogin = this.userLogin.bind(this);
    }
    
    updateState(key, value){
          this.setState({
            [key] : value 
          })
    }
    userLogin(){
        auth.signInWithEmailAndPassword(this.state.Email, this.state.Password)
        .then(() => {
            // get user and the days left to birthday
            this.getResult();
        }).catch(() => {
            console.log("Could not log in, please input again");
        })
        
    }
    getResult(){
        const UID = auth.currentUser.uid;
        db.ref().child("Users").child(UID).get()
        .then((snapshot) => {
            if (snapshot.exists()) {
                // get how many days left for birthday
                let {name,days} = daysLeft(snapshot.val())
                // pass the result to App component
                this.props.onChange(name, days);
            } else {
                console.log("Data not found");
            }
            })
        .catch(() => {
            console.log("Could not get data");
            })
    }
    render(){
        return(
            <>
              <div className="row layout-row">
                <div className="col layout">
                    <form action="" id="login-form">
                        <h3>Log In</h3>
                        <Input type="email" 
                               name="login-email" 
                               title="Email:" 
                               inputKey="Email"
                               updateState = {this.updateState}
                               placeholder=""/>
                        <Input type="password" 
                               name="login-password" 
                               title="Password:" 
                               inputKey="Password"
                               updateState = {this.updateState}
                               placeholder=""/>
                        <div className="button-layout">
                            <Link style={{textDecoration: 'none'}} to="/days-left">
                                <Button type="submit" name="login-btn" title="Log In" onClick={this.userLogin}/>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>  
            <div className="row">
                <div className="col layout">
                    <h5>No account? <Link className="text-warning" style={{textDecoration: 'none'}} to="/sign-up">Sign Up</Link></h5>
                </div>
            </div>
            </>
        );
    }
}

export default Login;