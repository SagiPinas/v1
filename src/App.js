import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import "./styles/bootstrap.css"
import "./styles/index.scss"
import Login from './components/Login'
import Signup from './components/Signup'
import Dashboard from './components/Dashboard'


function App() {
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
          <Route path="/">
            <Dashboard />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
