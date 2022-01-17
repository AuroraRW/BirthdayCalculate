import React from 'react';
import TitleText from './components/TitleText';
import SignUp from './components/SignUp';
import Login from './components/Login';
import DaysLeft from './components/DaysLeft';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";

class App extends React.Component{
  constructor(props) {
    super(props);

    this.state = { 
      Name: "",
      Days: -1 };

    this.getDays = this.getDays.bind(this);
    this.resetResult = this.resetResult.bind(this);
  }

  getDays(name, days) {
    this.setState({
      Name: name,
      Days: days
    });
  }
  resetResult(){
    this.setState({
      Name: "",
      Days: -1
    });
  }
  render (){
    return (
      <Router>
        <TitleText />
        <Switch>
          <Route path="/sign-up">
            <SignUp />
          </Route>
          <Route path="/login">
            <Login onChange={this.getDays} />
          </Route>
          <Route path="/days-left">
            <DaysLeft result={this.state.Days} name={this.state.Name} onReset={this.resetResult}/>
          </Route>
          <Route path="/">
            <Login onChange={this.getDays} />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
