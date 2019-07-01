import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Decision from './pages/Decision';
import './App.css';

function App() {
  return (
    <Router>
      <Route exact path="/" render={props => <p>Welcome to Viewpoint!</p>}/>
      <Route path="/decisions/:decision" render={props => <Decision id={props.match.params.decision}/>}/>
    </Router>

    // <Decision id="brt51b1xh"/>
  );
}

export default App;
