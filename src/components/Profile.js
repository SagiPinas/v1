import React, { useState, useEffect } from 'react'
import '../styles/profile.scss'
import axios from 'axios';
import { coreURL } from './Utilities';
import moment from 'moment';
import loader from '../assets/loading.gif'
import defaultImg from '../assets/default-avatar.png'


const Profile = (props) => {

  const [profileTab, setProfileTab] = useState("loading")
  const [profileInfo, setProfileInfo] = useState([])
  const [history, setHistory] = useState([])
  const [editAccount, setEditing] = useState(false)
  const [changePassword, setChangePass] = useState(false)


  const userData = JSON.parse(localStorage.user)



  const loadHistory = () => {
    let user = JSON.parse(localStorage.user);
    setProfileTab('loading')
    axios.get(`${coreURL}/public/responder/?responderId=${user.id}`)
      .then(res => {
        if (res.data.status === "success") {
          setProfileInfo(res.data.profile)
          setHistory(res.data.history)
          setProfileTab('history')
        } else {
          alert("there was a problem loading your profile")
        }
      })
  }

  useEffect(() => {
    loadHistory();
  }, [])

  const switchTabs = (newTab) => {
    if (newTab !== profileTab) {
      if (newTab === "history") {
        loadHistory();
      } else {
        setProfileTab(newTab);
      }
    }
  }

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  }

  const passwordEdit = () => {
    if (!changePassword) {
      setChangePass(true)
      document.getElementById('old-password').click()
    } else {
      setChangePass(false)
    }
  }

  const accountEdit = () => {
    if (!editAccount) {
      setEditing(true)
    } else {
      setEditing(false)
    }
  }

  const Loading = () => {
    return (
      <div>
        <center>
          <img src={loader} alt="loading" className="loading-profile" />
          <p className="mt-2">Loading Activity History...</p>
        </center>
      </div>

    )
  }





  const ActivityHistory = () => {
    return (
      <div>
        <input className="search-bar" placeholder="Search History" />
        <div className="table-responsive border">
          <table className="table align-items-center table-flush">
            <thead className="thead-light">
              <tr>
                <th scope="col">No.</th>
                <th scope="col">Type</th>
                <th scope="col">Date Reported</th>
                <th scope="col">Date Verified</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>

              {
                history.map((incident, index) => {
                  return (
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <th scope="row"><span className="text-type">
                        {incident.type}
                      </span></th>
                      <td>{moment(incident.timestamp).format('l')}</td>
                      <td>{"..."}</td>
                      <td><strong className="text-success text-uppercase">{incident.status}</strong></td>
                      <td><button className="btn btn-sm btn-outline-primary">
                        <i className="fa fa-ellipsis-h mr-1" /> Details
                  </button></td>
                    </tr>
                  )
                })
              }

            </tbody>
          </table>
        </div>
      </div>
    )
  }

  const AccountSettings = () => {
    return (
      <div>
        <h6 className="heading-small text-muted mb-4">General information</h6>
        <div className="pl-lg-4">
          <div className="row">
            <div className="col-lg-6">
              <div className="form-group">
                <label className="form-control-label" htmlFor="input-username">Full Name</label>
                <input type="text" id="input-username" className="form-control form-control-alternative" placeholder="Username" defaultValue={profileInfo.name} />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="form-group">
                <label className="form-control-label" htmlFor="input-email">Email address</label>
                <input type="email" id="input-email" className="form-control form-control-alternative" placeholder={profileInfo.email} disabled />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="form-group">
                <label className="form-control-label" htmlFor="input-username">City</label>
                <input type="text" id="input-city" className="form-control form-control-alternative" placeholder="City" defaultValue={profileInfo.city} />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="form-group">
                <label className="form-control-label" htmlFor="input-username">Profile picture</label>
                <input type="text" id="input-image" className="form-control form-control-alternative" placeholder="Image Link" defaultValue={profileInfo.profileImage} />
              </div>
            </div>
          </div>
          <button
            className={`btn ${editAccount ? "btn-info" : "btn-dark"}`}
            onClick={() => { accountEdit() }}
          >
            {editAccount ? "Save Changes" : "Edit"}
          </button>
          <hr />
          <h6 className="heading-small text-muted mb-4">Change Password</h6>
          <div className="row">
            <div className="col-lg-6">
              <div className="form-group">
                <label className="form-control-label" htmlFor="input-username">Old password</label>
                <input type="password" id="old-password" className="form-control form-control-alternative" placeholder="Old Password" />
              </div>
            </div>

            <div className="col-lg-6">
              <div className="form-group">
                <label className="form-control-label" htmlFor="input-username">Confirm Password</label>
                <input type="password" id="confirm-password" className="form-control form-control-alternative" placeholder="Confirm Password" />
              </div>
            </div>
          </div>
          <button
            className={`btn ${changePassword ? "btn-info" : "btn-dark"}`}
            onClick={() => { passwordEdit() }}
          >
            {changePassword ? "Save Changes" : "Change Password"}
          </button>
        </div>
      </div>

    )
  }

  return (
    <div className="profile-page" id="profile-page">
      <div className="container-fluid d-flex align-items-center profile-header">
        <div className="row">
          <div className="col-lg-7 col-md-10 py-5">
          </div>
        </div>
      </div>

      <div className="container-fluid mt--7 p-3">
        <div className="row">

          <div className="col-xl-3 order-xl-2 mb-5 mb-xl-0">
            <div className="card card-profile shadow">
              <div className="row justify-content-center">
                <div className="col-lg-3 order-lg-2">
                  <div className="card-profile-image">
                    <img src={userData.profileImg ? userData.profileImg : defaultImg}
                      alt="profile" className="profile-image" />
                  </div>
                </div>
              </div>
              <div className="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
              </div>
              <div className="card-body pt-0 pt-md-4">
                <div className="row">
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center mt-md-2">
                      <div>
                        <span className="heading">22</span>
                        <span className="description account-snippet">Reviews</span>
                      </div>
                      <div>
                        <span className="heading">
                          {history.length}
                        </span>
                        <span className="description account-snippet">Responses</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <h3>
                    {profileInfo.name ? profileInfo.name : <i className="fa fa-ellipsis-h" />}
                  </h3>
                  <div className="h5 font-weight-300">
                    {profileInfo.city ? profileInfo.city : <i className="fa fa-ellipsis-h" />}
                  </div>
                  <div className="h5 mt-4">
                    <i className="ni business_briefcase-24 mr-2" />Responder
                  </div>
                  <hr className="my-4" />
                  <button className="btn btn-dark"
                    onClick={() => { logout() }}
                  >
                    Log out
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-9 order-xl-1">
            <div className="card bg-secondary shadow">
              <div className="card-header bg-white border-0">
                <div className="row align-items-center">
                  <div className="col-5">
                    <h3 className="mb-0">
                      {(profileTab === "history" || profileTab === "loading") ?
                        ("Activity History") : ("Account Settings")
                      }
                    </h3>
                  </div>
                  <ul className="account-tabs pt-2">
                    <li
                      className={(profileTab === "history" || profileTab === "loading") ? "active" : ""}
                      onClick={() => { switchTabs("history") }}
                    >History</li>
                    <li
                      className={profileTab === "settings" ? "active" : ""}
                      onClick={() => { switchTabs("settings") }}
                    >
                      Account Settings</li>
                  </ul>
                </div>
              </div>
              <div className="card-body">
                {profileTab === "loading" ? <Loading /> : ""}
                {profileTab === "history" ? <ActivityHistory /> : ""}
                {profileTab === "settings" ? <AccountSettings /> : ""}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile;