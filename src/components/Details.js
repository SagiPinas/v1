import React, { useState, useEffect } from 'react'
import '../styles/profile.scss'
// import axios from 'axios';
// import { coreURL } from './Utilities';
// import moment from 'moment';



const Details = (props) => {

  return (
    <div className="profile-page d-block">
      <div className="container-fluid d-flex align-items-center profile-header">
        <div className="row">
          <div className="col-lg-7 col-md-10 py-5">
          </div>
        </div>
      </div>

      <div className="container-fluid mt--7 p-3">
        <div className="row">


          <div className="container">
            <div className="card bg-secondary shadow">
              <div className="card-header bg-white border-0">
                <div className="row align-items-center">
                  <div className="col-5">
                    <h3 className="mb-0">
                      Incident Overview
                    </h3>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <h1>Hello</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Details;