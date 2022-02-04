import React, {useState} from 'react';
import TitleText from './components/TitleText';
import SignUp from './components/SignUp';
import Login from './components/Login';
import DaysLeft from './components/DaysLeft';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";

export default function App(){
  const [daysForUser, setDaysForUser] = useState({Name: "", Days: -1})

  const getDays = (name, days) =>{
    const newDaysForUser = {
      Name: name,
      Days: days
    }
    setDaysForUser(newDaysForUser)
  }
  
  const resetResult = ()=>{
    const newDaysForUser = {
      Name: "",
      Days: -1
    }
    setDaysForUser(newDaysForUser)
  }
  
  return (
    <Router>
      <TitleText />
      <Switch>
        <Route path="/sign-up">
          <SignUp />
        </Route>
        <Route path="/login">
          <Login onChange={getDays} />
        </Route>
        <Route path="/days-left">
          <DaysLeft result={daysForUser.Days} name={daysForUser.Name} onReset={resetResult}/>
        </Route>
        <Route path="/">
          <Login onChange={getDays} />
        </Route>
      </Switch>
    </Router>
  );
  }
