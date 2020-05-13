import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { coreURL, ellipsis, closeSidebarMobile, openSidebarMobile } from '../Utilities'
import moment from 'moment';
import CardSkeleton from './card-skeleton';
import Trophy from '../../assets/award.svg'




const FeedCard = (props) => {

  const [list, setList] = useState("loading")
  const [listData, setListData] = useState([])
  const [incidentDetails, setDetails] = useState([])



  const updateFeed = () => {
    setList("loading")
    axios.get(`${coreURL}/incidents`)
      .then(res => {
        let incidentList = res.data.filter(x => x.status === "unverified")
        setListData(incidentList);
        setList("render")
      })
  }


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
        let incidentList = res.data.filter(x => x.status === "unverified")
        setListData(incidentList);
        setList("render")
      })
  }, [])



  const selectCard = (element, cardID, incidentInfo) => {
    if (cardID !== props.currentCard) {
      let currentActiveCard = document.getElementsByClassName("active-card")[0]
      if (document.contains(currentActiveCard)) {
        currentActiveCard.classList.remove("active-card")
        deleteMarkers()
      }
      element.currentTarget.classList.add("active-card")
      setDetails(incidentInfo)
      props.setCurrentIncident(incidentInfo)
      props.setCurrentCard(cardID)
      localStorage.currentIncident = JSON.stringify(incidentInfo);
      localStorage.currentLocation = JSON.stringify(incidentInfo.location)
      document.getElementById('mapJump').click()
      closeSidebarMobile()
    }
  }


  const deleteMarkers = () => {
    document.getElementById('removeRoutes').click()
  }

  const deSelectCard = () => {
    let infoCardID = `infocard-${incidentDetails.uid}`;
    deleteMarkers()
    if (document.contains(document.getElementById(infoCardID))) {
      document.getElementById(infoCardID).classList.replace("fade-in-bottom", "fade-out-bottom")
    }

    openSidebarMobile();
    setTimeout(() => {
      props.setCurrentCard("")
      if (document.contains(document.getElementsByClassName("active-card")[0])) {
        document.getElementsByClassName("active-card")[0].classList.remove("active-card")
      }
      updateFeed();
    }, 550)
  }

  return (
    <div>
      <button className="d-none" id="deselectCard" onClick={deSelectCard} />
      <button className="d-none" id="update-feed" onClick={updateFeed} />
      {list === "render" ? (
        listData.length !== 0 ? (
          listData.map((incident, index) => {
            return (
              <div
                className="card fade-in-bottom"
                key={index}
                id={`feed-card-${incident.uid}`}
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
            )
          })
        ) : (<EmptyFeed />)
      ) : (
          <CardSkeleton count={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} />
        )}
    </div>
  )
}

export default FeedCard;