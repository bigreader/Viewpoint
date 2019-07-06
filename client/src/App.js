import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import DecisionPage from './pages/DecisionPage';
import AddDecisionPage from './pages/AddDecisionPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import './App.css';

function App() {
  return (
    <Router>
      <p>hello there!</p>
      <Switch>
        <Route exact path="/" component={UserPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={LoginPage} />
        <Route path="/decisions/add" component={AddDecisionPage} />
        <Route path="/decisions/:decision" render={props => <DecisionPage id={props.match.params.decision} />} />
      </Switch>
    </Router>
  );
}

export default App;
