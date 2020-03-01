import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { coreURL, ellipsis } from '../Utilities'
import moment from 'moment';
import CardSkeleton from './card-skeleton';
import InfoCard from './InfoCard'
import Trophy from '../../assets/award.svg'
import sound from '../../assets/deduction.mp3'
import io from 'socket.io-client'


const FeedCard = (props) => {

  const [list, setList] = useState("loading")
  const [listData, setListData] = useState([])
  const [currentCard, setCurrentCard] = useState("")
  const [incidentDetails, setDetails] = useState([])

  const socket = io(coreURL);

  const refreshFeed = () => {
    setList("loading")
    axios.get(`${coreURL}/incidents`)
      .then(res => {
        let incidentList = res.data.filter(x => x.status === "unverified")
        setListData(incidentList);
        setList("render")
      })
  }

  socket.on("report", () => {
    if (localStorage.sound === "true") {
      let notifSound = document.getElementById('tone');
      notifSound.pause();
      notifSound.currentTime = 0;
      notifSound.play();
    }
    refreshFeed()
  })

  socket.on("activity", () => {
    document.getElementById('inactive-line').style.display = "none";
    document.getElementById('active-line').style.display = "block";

    setTimeout(() => {
      document.getElementById('inactive-line').style.display = "block";
      document.getElementById('active-line').style.display = "none";
    }, 3000)
  })

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
    if (cardID !== currentCard) {
      let currentActiveCard = document.getElementsByClassName("active-card")[0]
      if (document.contains(currentActiveCard)) {
        currentActiveCard.classList.remove("active-card")
        deleteMarkers()
      }
      element.currentTarget.classList.add("active-card")
      setDetails(incidentInfo)
      setCurrentCard(cardID)
      localStorage.currentIncident = JSON.stringify(incidentInfo);
      localStorage.currentLocation = JSON.stringify(incidentInfo.location)
      document.getElementById('mapJump').click()
    }
  }


  const deleteMarkers = () => {
    let currentIncidentID = JSON.parse(localStorage.currentIncident).uid;
    let markers = document.getElementsByClassName(`marker-${currentIncidentID}`);

    for (var i = 0; i < markers.length; i++) {
      markers[i].remove();
      console.log('removig marker:', currentIncidentID)
    }

    // remove drawn route

    document.getElementById('removeRoutes').click()

  }

  const deSelectCard = () => {
    let infoCardID = `infocard-${incidentDetails.uid}`;
    deleteMarkers()
    document.getElementById(infoCardID).classList.replace("fade-in-bottom", "fade-out-bottom")
    setTimeout(() => {
      setCurrentCard("")
      document.getElementsByClassName("active-card")[0].classList.remove("active-card")
      refreshFeed();
    }, 550)
  }

  return (
    <div>
      <button className="d-none" id="deselectCard" onClick={() => { deSelectCard() }} />
      <audio className="d-none" id="tone" controls>
        <source src={sound} type="audio/mpeg" />
      </audio>
      {list === "render" ? (
        listData.length !== 0 ? (
          listData.map(incident => {
            return (
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