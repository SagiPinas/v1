import React, { useState } from 'react';
import '../styles/dashboard.scss'
import Sidebar from './Sidebar';
import Widgets from './Widgets';
import Profile from './Profile';
import Map from './Map';
import Details from './Details'
import InfoCard from './sidebar-components/InfoCard'


const Dashboard = () => {

  const [profile, setProfile] = useState(false);
  const [viewDetails, setDetails] = useState(false);
  const [currentIncident, setCurrentIncident] = useState({})
  const [currentCard, setCurrentCard] = useState("");


  const toggleProfile = () => {
    if (profile) {
      setProfile(false)
    } else {
      document.getElementById('settings-tab').click();
      setProfile(true)
      setDetails(false)
    }
  }

  const showsidebar = () => {
    document.getElementById('sidebar').style.display = "block"
  }

  return (
    <div>
      <div className="burger" onClick={showsidebar}>
        <i className="fa fa-bars fa-2x" />
      </div>
      <Sidebar
        setDetails={setDetails}
        currentIncident={currentIncident}
        setCurrentIncident={setCurrentIncident}
        viewDetails={viewDetails}
        setProfile={setProfile}
        currentCard={currentCard}
        setCurrentCard={setCurrentCard}
      />
      <div onClick={() => { toggleProfile() }}>
        <Widgets />
      </div>
      {!viewDetails && !profile && (<Map />)}
      {profile && (<Profile />)}
      {viewDetails && (<Details data={currentIncident} setDetails={setDetails} />)}

      {currentCard !== "" ? <InfoCard data={currentIncident} /> : ""}
    </div>
  )
}

export default Dashboard;