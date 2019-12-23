import React from 'react'

import logo from '../assets/logon.png'
import { Link } from "react-router-dom"

const Navbar = (props) => {
  return (
    <nav className="navbar navbar-top navbar-horizontal navbar-expand-md navbar-dark">
      <div className="container px-4">
        <a className="navbar-brand" href="/">
          <img src={logo} alt="logo" className="mr-1" /> Sagi<span>Pin</span>as
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-collapse-main" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbar-collapse-main">
          {/* Collapse header */}
          <div className="navbar-collapse-header d-md-none">
            <div className="row">
              <div className="col-6 collapse-brand">
                <a href="/">
                  <img src={logo} alt="logo" /> SagiPinas
                  </a>
              </div>
              <div className="col-6 collapse-close">
                <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbar-collapse-main" aria-controls="sidenav-main" aria-expanded="false" aria-label="Toggle sidenav">
                  <span />
                  <span />
                </button>
              </div>
            </div>
          </div>
          {/* Navbar items */}
          <ul className="navbar-nav ml-auto">
            <li className="nav-item mr-3">
              <Link to="/login">
                <p className={'nav-link nav-link-icon ' + (props.active === "login" ? "active" : "")}>
                  <i className="ni ni-planet" />
                  <span className="nav-link-inner--text">Login</span>
                </p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/register">
                <p className={'nav-link nav-link-icon ' + (props.active === "register" ? "active" : "")}>
                  <i className="ni ni-circle-08" />
                  <span className="nav-link-inner--text">Register</span>
                </p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav >
  )
}

export default Navbar;