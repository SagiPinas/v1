import React, { useState, useEffect } from 'react'

const Settings = () => {

  const [sound, setSound] = useState(true);
  const [toast, setToast] = useState(true);

  useEffect(() => {
    if (!localStorage.sound || localStorage.sound === "false") {
      setSound(false);
    }
    if (!localStorage.sound || localStorage.toast === "false") {
      setToast(false);
    }
  }, [])

  const toggleSound = () => {
    if (!localStorage.sound || localStorage.sound === "false") {
      setSound(true);
      localStorage.sound = true
    } else {
      setSound(false);
      localStorage.sound = false
    }
  }

  const toggleToast = () => {
    if (!localStorage.toast || localStorage.toast === "false") {
      setToast(true);
      localStorage.toast = true
    } else {
      setToast(false);
      localStorage.toast = false
    }
  }


  return (
    <div className="settings">


      <div className="border rounded setting-card">
        <span className="title"><i className="fa fa-bell"></i> Notifications</span>
        <hr />
        <ul>

          <li
            className={sound ? "activated" : ""}
            onClick={() => { toggleSound() }}
          >
            <i className={sound ? "fa fa-toggle-on" : "fa fa-toggle-off"}></i> Sound
          </li>

          <li
            className={toast ? "activated" : ""}
            onClick={() => { toggleToast() }}
          >
            <i className={toast ? "fa fa-toggle-on" : "fa fa-toggle-off"}></i> Toast Notifications
          </li>


        </ul>
      </div>

      <div className="border rounded setting-card">
        <span className="title"><i className="fa fa-map-marker"></i> Location</span>
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
