import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { coreURL, ellipsis } from '../Utilities'
import moment from 'moment';
import CardSkeleton from './card-skeleton';
import InfoCard from './InfoCard'
import Trophy from '../../assets/award.svg'

const FeedCard = (props) => {

  const [list, setList] = useState("loading")
  const [listData, setListData] = useState([])
  const [currentCard, setCurrentCard] = useState("")
  const [incidentDetails, setDetails] = useState([])

  const EmptyFeed = () => {
    return (
      <div className="fade-in-bottom">
        <center>
          <img src={Trophy} alt="award" className="trophy" />
          <p className="ml-2">
            <strong>
              Hooray. No Incidents!
          </strong>
          </p>
          <small className="text-muted">
            All incidents are either reviewed or responded to.
            Good Job!
          </small>
        </center>
      </div>
    )
  }


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
        listData.length !== 0 ? (
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
                    {ellipsis(incident.details, 70)}
                  </div>
                </div>
              ) : ""
            )
          })
        ) : (<EmptyFeed />)
      ) : (
          <CardSkeleton count={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} />
        )}

      {currentCard !== "" ? <InfoCard data={incidentDetails} /> : ""}

    </div>
  )
}

export default FeedCard;