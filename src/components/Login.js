import React, { useState } from 'react';
import "../styles/login.scss"

import Navbar from "./Navbar";
import googleLogo from '../assets/google.svg';
import { Link } from 'react-router-dom';
import Footer from './Footer'
import axios from 'axios'
import { coreURL, validateEmail } from './Utilities'
import Nprogress from 'nprogress'

const Login = () => {

  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const loginProccess = () => {
    setLoading(true)
    let email = document.getElementById('uemail').value;
    let password = document.getElementById('upassword').value;

    if (validateEmail(email)) {
      if (email.trim() === "" || password.trim() === "") {
        setError("Error: Incomplete credentials!")
        setLoading(false);
      } else {
        Nprogress.start()
        axios(
          {
            method: 'post',
            url: `${coreURL}/login`,
            data: {
              email: email,
              password: password,
            }
          }
        )
          .then(res => {
            if (res.data.status === "success") {
              localStorage.user = JSON.stringify(res.data.userData);
              window.location.href = "/dashboard"
            } else {
              setError(res.data.message);
              setLoading(false);
            }
            Nprogress.done()
          })

          .catch(err => {
            if (err) {
              setError("Login failed! please try again later.");
              setLoading(false);
              Nprogress.done()
            }
          })
      }
    } else {
      setError('Please provide a valid email address.')
      setLoading(false);
    }
  }


  document.body.onkeyup = (e) => {
    if (e.keyCode === 13) {
      if (window.location.href.includes("login") ||
        window.location.href.includes("dashboard")
      ) {
        loginProccess()
      }
    }
  }




  return (
    <div className="main-content">
      <Navbar active="login" />
      <div className="header bg-gradient-primary login-header">
        <div className="separator separator-bottom separator-skew zindex-100">
          <svg x={0} y={0} viewBox="0 0 2560 100"
            preserveAspectRatio="none" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <polygon className="fill-default" points="2560 0 2560 100 0 100" />
          </svg>
        </div>
      </div>
      <div className="container mt--8 pb-5">
        <div className="row justify-content-center">
          <div className="col-lg-5 col-md-7">
            <div className="card bg-secondary shadow border-0 login-card">
              <div className="card-header bg-transparent pb-5">
                <div className="text-muted text-center mt-2 mb-3"><small>Sign in with</small></div>
                <div className="btn-wrapper text-center">
                  <button className="btn btn-neutral btn-icon">
                    <span className="btn-inner--icon"><img src={googleLogo} alt="googleLogo" /></span>
                    <span className="btn-inner--text">Google</span>
                  </button>
                </div>
              </div>
              <div className="card-body px-lg-5 py-lg-4">
                <div className="text-center text-muted mb-4">
                  <small>Or sign in with credentials</small>
                  <p class="text-success small">
                    {localStorage.flag}
                  </p>
                </div>
                <div className="form-group mb-3">
                  <div className="input-group input-group-alternative">
                    <div className="input-group-prepend">
                      <span className="input-group-text"><i className="ni ni-email-83" /></span>
                    </div>
                    <input className="form-control" id="uemail" placeholder="Email" type="email" />
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group input-group-alternative">
                    <div className="input-group-prepend">
                      <span className="input-group-text"><i className="ni ni-lock-circle-open" /></span>
                    </div>
                    <input className="form-control" id="upassword" placeholder="Password" type="password" />
                  </div>
                  <p className="text-danger small mt-3 text-center">{error}</p>
                </div>

                <div className="text-center">
                  <button type="button" className="btn btn-primary my-4"
                    onClick={() => { loginProccess() }}
                  >
                    {isLoading ? <i className="fa fa-spinner mr-1 spin" /> : ""}
                    {isLoading ? "Signing in.." : "Sign in"}
                  </button>
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-6">
                <Link to="/password-recovery">
                  <p className="text-light"><small>Forgot password?</small></p>
                </Link>
              </div>
              <div className="col-6 text-right">
                <Link to="/register">
                  <p className="text-light"><small>Create new account</small></p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;