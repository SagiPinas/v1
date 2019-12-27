import React from 'react'
import '../styles/infocard.scss'

const InfoCard = (props) => {
  return (
    <div className="info-card">
      <div className="status-bar"></div>
      <h3 className="info-title">
        <i className="fa fa-map-marker text-primary mr-2"></i>
        Manila, Philippines
        </h3>
      <hr />
      <div className="px-3 pt-1 type-title">
        <h1 className="type">EARTHQUAKE</h1>
      </div>
    </div>
  )
}

export default InfoCard;

