import React from 'react'

const Settings = () => {

  return (
    <div className="settings">

      <div className="border rounded setting-card">
        <span className="title">Profile</span>
        <hr />
        <button className="btn btn-sm btn-primary m-2">View user profile</button>
      </div>

      <div className="border rounded setting-card">
        <span className="title">Notifications</span>
        <hr />
        <ul>
          <li>Sound</li>
          <li>Toast Notification</li>
        </ul>
      </div>

      <div className="border rounded setting-card">
        <span className="title">Location</span>
        <hr />
        <div className="p-2">
          <small className="text-muted">Set your current physical location.</small>
          <input placeholder="Latitude,Longitude" className="mt-2" id="clatlong" />
          <button className="btn btn-sm btn-primary mt-2">Set using Device</button>
        </div>
      </div>


    </div>
  )
}

export default Settings;
