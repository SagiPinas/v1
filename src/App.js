import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import "./styles/argon.css";
import "./styles/animations.scss";
import "toastify-js/src/toastify.css";
import "./styles/index.scss";
import "./styles/responsive.scss";
import UnderConstruction from "./components/UnderContruction";

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
          <Route path="/analytics">
            <UnderConstruction />
          </Route>
          <Route path="/dashboard">
            {localStorage.user ? <Dashboard /> : <Login />}
          </Route>
          <Route path="/register-device">
            <UnderConstruction />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
