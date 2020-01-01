import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { coreURL } from '../Utilities'
import moment from 'moment';
import CardSkeleton from './card-skeleton';
import InfoCard from './InfoCard'

const FeedCard = (props) => {

  const [list, setList] = useState("loading")
  const [listData, setListData] = useState([])
  const [currentCard, setCurrentCard] = useState("")
  const [incidentDetails, setDetails] = useState([])



  useEffect(() => {
    axios.get(`${coreURL}/incidents`)
      .then(res => {
        setList("render")
        setListData(res.data);
      })
  }, [])

  const selectCard = (element, cardID, incidentInfo) => {
    if (cardID !== currentCard) {
      let currentActiveCard = document.getElementsByClassName("active-card")[0]
      if (document.contains(currentActiveCard)) {
        currentActiveCard.classList.remove("active-card")
      }
      element.currentTarget.classList.add("active-card")
      setDetails(incidentInfo)
      setCurrentCard(cardID)
    }
  }

  const deSelectCard = () => {
    let infoCardID = `infocard-${incidentDetails.uid}`;
    document.getElementById(infoCardID).classList.replace("fade-in-bottom", "fade-out-bottom")
    setTimeout(() => {
      setCurrentCard("")
      document.getElementsByClassName("active-card")[0].classList.remove("active-card")
    }, 550)
  }

  return (
    <div>
      <button className="d-none" id="deselectCard" onClick={() => { deSelectCard() }} />
      {list === "render" ? (
        listData.map(incident => {
          return (
            incident.status === "unverified" ? (
              <div className="card fade-in-bottom"
                onClick={(e) => {
                  (selectCard(e, incident.uid, incident))
                }}>
                <span className="date">
                  {moment(incident.timestamp).fromNow()}
                </span>
                <span
                  className="reviewers"
                  title="No. of responders reviewing this incident."
                >0</span>
                <span className="tag">
                  <i className="fa fa-bullseye text-danger mr-1"></i>
                  {incident.type}
                </span>
                <hr />
                <div className="body">
                  {incident.details}
                </div>
              </div>
            ) : ""
          )
        })
      ) : (
          <CardSkeleton count={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} />
        )}

      {currentCard !== "" ? <InfoCard data={incidentDetails} /> : ""}

    </div>
  )
}

export default FeedCard;