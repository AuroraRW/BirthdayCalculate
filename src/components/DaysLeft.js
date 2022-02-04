import React, {useState, useEffect} from 'react';
import {auth} from '../modules/FireAuth';
import {getQuotes} from '../modules/GetQuotes';
import './style.css';
import Button from './Button';
import {Link} from "react-router-dom";

export default function DaysLeft (props){
    const [quote, setQuote] = useState({Text: "", Author: ""})
    
    useEffect(()=>{
        getQuotes('https://type.fit/api/quotes')
        .then((response)=>{
            let index = Math.floor(Math.random()*(response.length-1));
            const newQuote = {
                Text: response[index].text,
                Author: response[index].author
            }
            if (!newQuote.Author){
                newQuote.Author = 'Anonymous'
            }
            
            setQuote(newQuote)
        })
        .catch(()=>{
            console.log("Could not get data from API");
          })
    },[])

    useEffect(()=>{
        props.onReset();
    }, [])
    
    const userLogOut = ()=>{
        auth.signOut()
        .then(() => {
            console.log("Sign out sucessfully!")
        })
        .catch(()=>{
            console.log("Could not log out");
        })
    }
    
    // have not got result
    if(props.result === -1){
        return(
            <></>
        );
    // today is birthday
    }else if(props.result === 0){
            return(
                <div className="row">
                    <div className="col-12 birthday-layout">
                        <div id="birthday-information">
                            <h1 className="happy">Happy birthday, {props.name}</h1>
                            <h4 className="quotes">{quote.Text}</h4>
                            <h5 className="author">{quote.Author}</h5>
                        </div>
                        <Link style={{textDecoration: 'none'}} to="/">
                            <Button type="submit" name="logout-btn" title="Log Out" onClick={userLogOut}/>
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
                        <h1 className="birthday">{props.result} DAYS LEFT</h1>
                        <h3 className="birthday">UNTILL YOUR BIRTHDAY!</h3>
                    </div>
                    <Link style={{textDecoration: 'none'}} to="/">
                        <Button type="submit" name="logout-btn" title="Log Out" onClick={userLogOut}/>
                    </Link>
                </div>
            </div>
        );
    }
}