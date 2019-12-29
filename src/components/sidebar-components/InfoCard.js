import React from 'react'
import '../../styles/infocard.scss'
import moment from 'moment'

import user from '../../assets/bryce.jpg'


const InfoCard = (props) => {

  const cancelReview = () => {
    document.getElementById('deselectCard').click();
  }

  return (
    <div className="info-card fade-in-bottom" id={`infocard-${props.data.uid}`}>
      <div className="status-bar"></div>
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
            <span>
              <img src={user} alt="reportee-avatar" className="reportee-img" />
              Bryce Narciso C. Mercines<br />
            </span>
          </div>
        </center>

        <hr className="my-3" />

        <p className="detail-title">
          <i className="fa fa-circle mr-1"></i>Report Details
        </p>

        <div className="report-div">
          {props.data.details}
        </div>

      </div>
      <div className="info-footer">
        <button className="btn-verify"><i className="fa fa-check mr-1"></i>Verify</button>
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

