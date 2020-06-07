import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import './App.css';
import Homepage from './Pages/Homepage';
import Setuppage from './Pages/Setuppage';

function App() {
  return (
    <div>
      <Router >
        <Route exact path="/" component={Homepage} />
        <Route exact path ="/cart" component ={Setuppage}/>
      </Router>
    </div>
  );
}

export default App;
