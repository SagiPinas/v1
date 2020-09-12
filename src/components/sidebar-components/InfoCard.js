import React, { useState, useEffect } from "react";
import "../../styles/infocard.scss";
import moment from "moment";
import axios from "axios";
import io from "socket.io-client";
import { coreURL, toast, googleMapsAPIKEY, normalizeText } from "../Utilities";
import loader from "../../assets/loading.gif";

const socket = io(coreURL);

const InfoCard = (props) => {
  const cancelReview = () => {
    document.getElementById("deselectCard").click();
  };

  const verifyReport = () => {
    props.data.responder = JSON.parse(localStorage.user).id;
    socket.emit("verifyReport", props.data);
    setreportStatus("verified");
    toast("Report Verified!", "success");
    setTimeout(() => {
      setreportStatus("verified");
      document.getElementById("deselectCard").click();
    }, 1500);
  };

  const [reporteeDetails, setReporteeDetails] = useState(null);
  const [reportStatus, setreportStatus] = useState("");
  const [supportData, setSupport] = useState([]);

  useEffect(() => {
    axios
      .get(`https://graph.facebook.com/${props.data.id}`, {
        params: {
          fields: "first_name,last_name,profile_pic",
          access_token: process.env.REACT_APP_FACEBOOK_PAGE_ACCESS_TOKEN,
        },
      })
      .then((res) => {
        let reporteeData = {
          image: res.data.profile_pic,
          name: `${res.data.first_name} ${res.data.last_name}`,
        };
        setReporteeDetails(reporteeData);
      });

    let point = JSON.parse(localStorage.currentLocation);

    axios
      .get(`https://maps.googleapis.com/maps/api/geocode/json?`, {
        params: {
          latlng: `${point.lat},${point.long}`,
          key: googleMapsAPIKEY,
        },
      })
      .then((res) => {
        setSupport(res.data.results);
      });
  }, [props, setSupport]);

  return (
    <div className="info-card fade-in-bottom" id={`infocard-${props.data.uid}`}>
      <div className={`status-bar ${reportStatus}`}></div>
      <h3 className="info-title">
        <i className="fa fa-map-marker text-primary mr-2"></i>
        {supportData.length !== 0 && supportData[0].formatted_address}
      </h3>

      <div className="px-3 pt-1 pb-1 type-title border-top">
        <h2 className="type pt-2">
          <i className="fa fa-bullseye text-danger"></i> {props.data.type}
        </h2>
        <span>{moment(props.data.timestamp).fromNow()}</span>
      </div>
      <div className="info-body">
        <center>
          <div className="reportee-profile mt-1">
            {reporteeDetails ? (
              <span>
                <img
                  src={reporteeDetails.image}
                  alt="reportee-avatar"
                  className="reportee-img"
                />
                {reporteeDetails.name}
                <br />
              </span>
            ) : (
              <div className="skeleton-cards">
                <div className="skeleton-card info-card-loader">
                  <div className="dot">
                    <div />
                  </div>
                  <div className="line">
                    <div />
                  </div>
                </div>
              </div>
            )}
          </div>
        </center>

        <hr className="my-3" />

        <div className="mb-3">
          <p className="detail-title">
            <i className="fa fa-circle mr-1"></i>Report Details
          </p>
          <div className="report-div">{props.data.details}</div>
        </div>

        <p className="detail-title">
          <i className="fa fa-circle mr-1"></i> Location information
        </p>
        <hr />

        {supportData.length !== 0 ? (
          supportData.map((details) => {
            return (
              <div className="mb-3">
                <p className="detail-title">
                  <i className="fa fa-circle mr-1"></i>
                  {`${normalizeText(details.types[0])}`}
                </p>
                <div className="report-div">
                  {`${details.formatted_address}, (${normalizeText(
                    details.geometry.location_type
                  )})`}
                </div>
              </div>
            );
          })
        ) : (
          <center>
            <div className="loading-card">
              <img src={loader} alt="loader" />
              <p>Loading report details...</p>
            </div>
          </center>
        )}
      </div>
      <div className="info-footer">
        <button
          className="btn-verify"
          onClick={() => {
            verifyReport(props.data);
          }}
        >
          <i className="fa fa-check mr-1"></i>Verify
        </button>
        <button
          className="btn-cancel"
          onClick={() => {
            cancelReview();
          }}
        >
          Dismiss
        </button>
      </div>
    </div>
  );
};

export default InfoCard;
