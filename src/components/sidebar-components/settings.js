import React, { useState, useEffect } from "react";
import swal from "sweetalert2";
import { Link } from "react-router-dom";

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
  }, []);

  const toggleSound = () => {
    if (!localStorage.sound || localStorage.sound === "false") {
      setSound(true);
      localStorage.sound = true;
    } else {
      setSound(false);
      localStorage.sound = false;
    }
  };

  const setPosition = (position) => {
    let newLocation = {
      lat: position.coords.latitude,
      long: position.coords.longitude,
    };

    document.querySelector("#nlat").innerHTML = newLocation.lat;
    document.querySelector("#nlng").innerHTML = newLocation.long;

    localStorage.originLocation = JSON.stringify(newLocation);

    swal.fire({
      title: "Success",
      text: "location set successfully!",
      icon: "success",
      showCancelButton: false,
      showConfirmButton: false,
      timer: 1200,
    });
  };

  const toggleToast = () => {
    if (!localStorage.toast || localStorage.toast === "false") {
      setToast(true);
      localStorage.toast = true;
    } else {
      setToast(false);
      localStorage.toast = false;
    }
  };

  const displayError = (error) => {
    var errors = {
      1: "Permission denied",
      2: "Position unavailable",
      3: "Request timeout",
    };
    swal.fire("Error!", `Geo Location API : ${errors[error.code]}`, "error");
  };

  const requestlocation = () => {
    swal.fire({
      title: "Requesting",
      text:
        "kindly accept to location prompt to pin down your current location.",
      icon: "info",
      showConfirmButton: false,
      showCancelButton: true,
      allowOutsideClick: false,
    });

    swal.showLoading();

    if (navigator.geolocation) {
      var timeoutVal = 10 * 1000 * 1000;
      navigator.geolocation.getCurrentPosition(setPosition, displayError, {
        enableHighAccuracy: true,
        timeout: timeoutVal,
        maximumAge: 0,
      });
    } else {
      swal.fire("Error", "GPS is not supported for your device", "error");
    }
  };

  return (
    <div className="settings">
      <div className="border rounded setting-card">
        <span className="title">
          <i className="fa fa-bell"></i> Notifications
        </span>
        <hr />
        <ul>
          <li
            className={sound ? "activated" : ""}
            onClick={() => {
              toggleSound();
            }}
          >
            <i className={sound ? "fa fa-toggle-on" : "fa fa-toggle-off"}></i>{" "}
            Sound
          </li>

          <li
            className={toast ? "activated" : ""}
            onClick={() => {
              toggleToast();
            }}
          >
            <i className={toast ? "fa fa-toggle-on" : "fa fa-toggle-off"}></i>{" "}
            Toast Notifications
          </li>
        </ul>
      </div>

      {localStorage.originLocation && (
        <div className="border rounded setting-card">
          <span className="title">
            <i className="fa fa-map-marker"></i> Current Location
          </span>
          <hr />
          <div className="p-2">
            <small className="text-muted">
              Your current location information:
            </small>
            <br />
            <small>
              <span>
                <strong className="text-primary">
                  Latitude:{" "}
                  <span id="nlat">
                    {JSON.parse(localStorage.originLocation).lat}
                  </span>
                </strong>{" "}
              </span>{" "}
              <br />
              <span>
                <strong className="text-primary">
                  Longitude:{" "}
                  <span id="nlng">
                    {JSON.parse(localStorage.originLocation).long}
                  </span>
                </strong>{" "}
              </span>
            </small>
          </div>
        </div>
      )}

      <div className="setting-menu-card" onClick={requestlocation}>
        <div className="icon-wrapper">
          <i className="fa fa-map-marker" />
        </div>
        <span>Set Location</span>
      </div>

      <Link to="/analytics">
        <div className="setting-menu-card">
          <div className="icon-wrapper">
            <i className="fa fa-line-chart" />
          </div>
          <span>Analytics</span>
        </div>
      </Link>

      <Link to="/register-device">
        <div className="setting-menu-card">
          <div className="icon-wrapper">
            <i className="fa fa-sitemap" />
          </div>
          <span>Device Registry</span>
        </div>
      </Link>
    </div>
  );
};

export default Settings;
