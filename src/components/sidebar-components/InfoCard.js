import React, { useState, useEffect } from 'react'
import '../../styles/infocard.scss'
import moment from 'moment'
import axios from 'axios'
import io from 'socket.io-client'
import { coreURL } from '../Utilities'

const InfoCard = (props) => {

  const socket = io(coreURL)

  const cancelReview = () => {
    document.getElementById('deselectCard').click();
  }

  const verifyReport = () => {
    props.data.responder = JSON.parse(localStorage.user).id;
    console.log(props.data)
    socket.emit('verifyReport', props.data)
    setreportStatus("verified")
    setTimeout(() => {
      document.getElementById('deselectCard').click();
    }, 1500)
  }

  const [reporteeImage, setImage] = useState("")
  const [reporteeName, setReporteeName] = useState("")
  const [profile, setProfile] = useState(false)
  const [reportStatus, setreportStatus] = useState("")

  useEffect(() => {
    axios.get(`https://graph.facebook.com/${props.data.id}`, {
      params: {
        fields: "first_name,last_name,profile_pic",
        access_token: "PAGE_ACCESS_TOKEN"
      }
    }
    )
      .then(res => {
        setImage(res.data.profile_pic)
        setReporteeName(`${res.data.first_name} ${res.data.last_name}`)
        setProfile(true)
      })
  })


  return (
    <div className="info-card fade-in-bottom" id={`infocard-${props.data.uid}`}>
      <div className={`status-bar ${reportStatus}`}></div>
      <h3 className="info-title">
        <i className="fa fa-map-marker text-primary mr-2"></i>
        Manila, Philippines
        </h3>
      <hr />
      <div className="px-3 pt-1 pb-1 type-title">
        <h2 className="type pt-2">
          <i className="fa fa-bullseye text-danger"></i> {props.data.type}
        </h2>
        <span>{moment(props.data.timestamp).fromNow()}</span>
      </div>
      <div className="info-body">

        <center>
          <div className="reportee-profile mt-1">
            {
              profile ? (
                <span>
                  <img src={reporteeImage} alt="reportee-avatar" className="reportee-img" />
                  {reporteeName}
                  <br />
                </span>
              ) : (
                  <div className="skeleton-cards">
                    <div className="skeleton-card info-card-loader">
                      <div className="dot"><div /></div>
                      <div className="line"><div /></div>
                    </div>
                  </div>
                )
            }
          </div>
        </center>

        <hr className="my-3" />

        <div className="mb-3">
          <p className="detail-title">
            <i className="fa fa-circle mr-1"></i>Report Details
        </p>
          <div className="report-div">
            {props.data.details}
          </div>
        </div>

      </div>
      <div className="info-footer">
        <button className="btn-verify"
          onClick={() => { verifyReport(props.data) }}
        ><i className="fa fa-check mr-1"></i>Verify</button>
        <button className="btn-dismiss"><i className="fa fa-times-circle mr-1"></i>Dismiss</button>
        <button className="btn-cancel"
          onClick={() => { cancelReview() }}
        >
          Cancel
        </button>
      </div>
    </div >
  )
}

export default InfoCard;

