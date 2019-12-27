import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import "./styles/argon.css"
import "./styles/animations.scss"
import "./styles/index.scss"
import Login from './components/Login'
import Signup from './components/Signup'
import Dashboard from './components/Dashboard'

const App = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Signup />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
