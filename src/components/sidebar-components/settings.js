import React, { useState, useEffect } from 'react'
import swal from 'sweetalert2';

const Settings = (props) => {

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

  const setPosition = (position) => {
    let newLocation = {
      lat: position.coords.latitude,
      long: position.coords.longitude,
    }

    localStorage.originLocation = JSON.stringify(newLocation)

    swal.fire({
      title: "Success",
      text: "location set successfully!",
      icon: 'success',
      showCancelButton: false,
      showConfirmButton: false,
      timer: 1200,
    })
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

  const displayError = (error) => {
    var errors = {
      1: 'Permission denied',
      2: 'Position unavailable',
      3: 'Request timeout'
    };
    swal.fire("Error!", `Geo Location API : ${errors[error.code]}`, 'error');
  }

  const requestlocation = () => {
    swal.fire({
      title: "Requesting",
      text: "kindly accept to location prompt to pin down your current location.",
      icon: "info",
      showConfirmButton: false,
      showCancelButton: true,
      allowOutsideClick: false
    })

    swal.showLoading()

    if (navigator.geolocation) {
      var timeoutVal = 10 * 1000 * 1000;
      navigator.geolocation.getCurrentPosition(
        setPosition,
        displayError,
        { enableHighAccuracy: true, timeout: timeoutVal, maximumAge: 0 }
      )
    } else {
      swal.fire("Error", "GPS is not supported for your device", "error")
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
          <br />
          <button className="btn btn-sm btn-primary mt-2" onClick={requestlocation}>Set Location</button>
        </div>
      </div>


    </div>
  )
}

export default Settings;
