import React from 'react';
import './style.css';
import {db, auth} from '../modules/FireAuth';
import Input from './Input';
import Button from './Button';
import {Link} from "react-router-dom";

class SignUp extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            DateOfBirth: "",
            Name : "",
            Email : "",
            Password: "",
        }
        this.updateState = this.updateState.bind(this);
    }
    updateState(key, value){
          this.setState({
            [key] : value 
          })
        }

    userSignUp(){
        auth.createUserWithEmailAndPassword(this.state.Email, this.state.Password)
        .then(() => {
            // write user information into database
            console.log("in userSignUp");
            const UID = auth.currentUser.uid;
            const ref = db.ref("Users");
            const ref2 = ref.child(UID);
            ref2.set(this.state);

            // Sign out after sign up
            auth.signOut()
            .then(() => {
                console.log("sign out sucessfully!")
            })
            .catch(err => {
                console.log("Could not sign out");
            })
        })
        .catch(() => {
            console.log("Could not sign up, please input correct format");
        })
    }

    render(){
        return(
            <div className="row">
                <div className="col layout">
                    <form action="" id="signup-form">
                        <h3>Sign Up</h3>
                        <Input type="text" 
                               name="signup-name" 
                               title="Name:" 
                               inputKey="Name" 
                               updateState = {this.updateState}/>
                        <Input type="date" 
                               name="signup-birthday" 
                               title="Birthday:" 
                               inputKey="DateOfBirth" 
                               updateState = {this.updateState}/>
                        <Input type="email" 
                               name="signup-email" 
                               title="Email:" 
                               inputKey="Email" 
                               updateState = {this.updateState} 
                               placeholder="name@example.com"/>
                        <Input type="password" 
                               name="signup-password" 
                               title="Password:" 
                               inputKey="Password" 
                               updateState = {this.updateState} 
                               placeholder="at least 6 characters"/>
                        <div className="button-layout">
                            <Link style={{textDecoration: 'none'}} to="/login">
                                <Button type="submit" name="signup-btn" title="Sign Up" onClick={()=>this.userSignUp()}/>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>   
        );
    }
}

export default SignUp;