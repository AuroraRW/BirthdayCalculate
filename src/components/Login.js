import React, {useState} from 'react';
import './style.css';
import {db, auth} from '../modules/FireAuth';
import { daysLeft } from '../modules/GetDays';
import Input from './Input';
import Button from './Button';
import {Link} from "react-router-dom";

export default function Login (props){
    const [userInfor, setUserInfor] = useState({Email: "", Password: ""})
    
    const updateState = (key, value)=>{
        setUserInfor({
            ...userInfor,
            [key]: value
        })
    }

    const userLogin = ()=>{
        auth.signInWithEmailAndPassword(userInfor.Email, userInfor.Password)
        .then(() => {
            // get user and the days left to birthday
            getResult();
        }).catch(() => {
            console.log("Could not log in, please input again");
        })
        
    }
    
    const getResult = ()=>{
        const UID = auth.currentUser.uid;
        db.ref().child("Users").child(UID).get()
        .then((snapshot) => {
            if (snapshot.exists()) {
                // get how many days left for birthday
                let {name,days} = daysLeft(snapshot.val())
                // pass the result to App component
                props.onChange(name, days);
            } else {
                console.log("Data not found");
            }
            })
        .catch(() => {
            console.log("Could not get data");
            })
    }
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
                            updateState = {updateState}
                            placeholder=""/>
                    <Input type="password" 
                            name="login-password" 
                            title="Password:" 
                            inputKey="Password"
                            updateState = {updateState}
                            placeholder=""/>
                    <div className="button-layout">
                        <Link style={{textDecoration: 'none'}} to="/days-left">
                            <Button type="submit" name="login-btn" title="Log In" onClick={userLogin}/>
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
