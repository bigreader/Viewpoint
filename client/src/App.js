import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import DecisionPage from './pages/DecisionPage';
import AddDecisionPage from './pages/AddDecisionPage';
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" render={props => <AddDecisionPage />} />
        <Route exact path="/decisions/add" render={props => <AddDecisionPage />} />
        <Route path="/decisions/:decision" render={props => <DecisionPage id={props.match.params.decision} />} />
      </Switch>
    </Router>

    // <Decision id="brt51b1xh"/>
  );
}

export default App;
