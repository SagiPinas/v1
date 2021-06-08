import React, { useState } from 'react';
import Navbar from './Navbar'
import Footer from './Footer'
import { coreURL, validateEmail, authSSO } from './Utilities'
import Nprogress from 'nprogress'
import axios from 'axios'
import GoogleLogin from 'react-google-login';

const Signup = () => {

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")


  const registerError = (message) => {
    Nprogress.done();
    setLoading(false)
    setError(message)
  }

  const responseGoogle = (response) => {
    Nprogress.start();
    authSSO(response.profileObj)
  }


  const register = () => {
    setLoading(true)
    let email = document.getElementById("email").value.trim()
    let name = document.getElementById("name").value.trim()
    let city = document.getElementById("city").value.trim()
    let confirmPassword = document.getElementById("confirmPass").value.trim()
    let password = document.getElementById("password").value.trim()

    if (validateEmail(email)) {

      if (email && name && city && confirmPassword && password) {
        Nprogress.start()
        if (password !== confirmPassword) {
          registerError("Passwords did not match!")
        } else {
          axios(
            {
              method: 'post',
              url: `${coreURL}/signup`,
              data: {
                email: email,
                name: name,
                password: password,
                city: city
              }
            }
          )
            .then(res => {
              if (res.data.status === "success") {
                localStorage.flag = "Account Created! Please login to you account."
                window.location.href = "/login"
              } else {
                registerError(res.data.message)
              }
            })

            .catch(err => {
              registerError("Sign up failed. please try again later.")
            })
        }
      } else {
        registerError("Please complete the form to continue.")
      }
    } else {
      registerError("Please provide a proper email address.")
      setLoading(false)
    }
  }

  window.onkeyup = (e) => {
    if (e.keyCode === 13) {
      if (window.location.href.includes("register")) {
        register()
      }
    }
  }



  return (
    <div className="main-content">
      <Navbar active="register" />
      <div className="header bg-gradient-primary py-7 py-lg-8">
        <div className="container">
          <div className="header-body text-center mb-7">
            <div className="row justify-content-center">
              <div className="col-lg-5 col-md-6">
                <h1 className="text-white">Welcome!</h1>
                <p className="text-lead text-light">Create an account and become a responder today.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="separator separator-bottom separator-skew zindex-100">
          <svg x={0} y={0} viewBox="0 0 2560 100" preserveAspectRatio="none" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <polygon className="fill-default" points="2560 0 2560 100 0 100" />
          </svg>
        </div>
      </div>
      <div className="container mt--9 pb-5">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8">
            <div className="card bg-secondary shadow border-0">
              <div className="card-header bg-transparent pb-5">
                <div className="text-muted text-center mt-2 mb-4"><small>Sign up with</small></div>
                <div className="btn-wrapper text-center">

                  <GoogleLogin
                    clientId="451403226679-qhc12ctq9lfvqk3mo6sdv3hmigo8rt0l.apps.googleusercontent.com"
                    onSuccess={responseGoogle}
                    isSignedIn={true}
                    buttonText="Google"
                  />

                </div>
              </div>
              <div className="card-body px-lg-5 py-lg-4">
                <div className="text-center text-muted mb-4">
                  <small>Or sign up with credentials</small>
                </div>
                <div className="form-group">
                  <div className="input-group input-group-alternative mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text"><i className="ni ni-hat-3" /></span>
                    </div>
                    <input className="form-control" id="name" placeholder="Name" type="text" />
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group input-group-alternative mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text"><i className="ni ni-hat-3" /></span>
                    </div>
                    <input className="form-control" id="city" placeholder="City Name" type="text" />
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group input-group-alternative mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text"><i className="ni ni-email-83" /></span>
                    </div>
                    <input className="form-control" id="email" placeholder="Email" type="email" />
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group input-group-alternative">
                    <div className="input-group-prepend">
                      <span className="input-group-text"><i className="ni ni-lock-circle-open" /></span>
                    </div>
                    <input className="form-control" id="password" placeholder="Password" type="password" />
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group input-group-alternative">
                    <div className="input-group-prepend">
                      <span className="input-group-text"><i className="ni ni-lock-circle-open" /></span>
                    </div>
                    <input className="form-control" id="confirmPass" placeholder="Confirm Password" type="password" />
                  </div>
                </div>
                <div className="text-center text-danger"><small>
                  {error}
                </small></div>
                <div className="row my-4">
                  <div className="col-12">
                    <div className="custom-control custom-control-alternative custom-checkbox">
                      <input className="custom-control-input" id="customCheckRegister" type="checkbox" />
                      <label className="custom-control-label" htmlFor="customCheckRegister">
                        <span className="text-muted">I agree with the <a href="/privacy-and-policy">Privacy Policy</a></span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <button type="button" className="btn btn-primary mt-4"
                    onClick={() => {
                      register()
                    }}
                  >
                    {loading ? <i className="fa fa-spinner spin mr-1" /> : ""}
                    {loading ? "Signing up..." : "Create Account"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Signup;