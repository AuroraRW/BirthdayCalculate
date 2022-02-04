import React, { useState } from 'react';
import './style.css';
import {db, auth} from '../modules/FireAuth';
import Input from './Input';
import Button from './Button';
import {Link} from "react-router-dom";

export default function SignUp(){
    const [userProfile, setUserProfile] = useState({
        DateOfBirth: "", 
        Name : "", 
        Email : "",
        Password: "",})

    const updateState = (key, value)=>{
        setUserProfile({
            ...userProfile,
            [key]: value
        })
    }

    const userSignUp = ()=>{
        auth.createUserWithEmailAndPassword(userProfile.Email, userProfile.Password)
        .then(() => {
            // write user information into database
            console.log("in userSignUp");
            const UID = auth.currentUser.uid;
            const ref = db.ref("Users");
            const ref2 = ref.child(UID);
            ref2.set(userProfile);

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

    return(
        <div className="row">
            <div className="col layout">
                <form action="" id="signup-form">
                    <h3>Sign Up</h3>
                    <Input type="text" 
                            name="signup-name" 
                            title="Name:" 
                            inputKey="Name" 
                            updateState = {updateState}/>
                    <Input type="date" 
                            name="signup-birthday" 
                            title="Birthday:" 
                            inputKey="DateOfBirth" 
                            updateState = {updateState}/>
                    <Input type="email" 
                            name="signup-email" 
                            title="Email:" 
                            inputKey="Email" 
                            updateState = {updateState} 
                            placeholder="name@example.com"/>
                    <Input type="password" 
                            name="signup-password" 
                            title="Password:" 
                            inputKey="Password" 
                            updateState = {updateState} 
                            placeholder="at least 6 characters"/>
                    <div className="button-layout">
                        <Link style={{textDecoration: 'none'}} to="/login">
                            <Button type="submit" name="signup-btn" title="Sign Up" onClick={userSignUp}/>
                        </Link>
                    </div>
                </form>
            </div>
        </div>   
    );
}