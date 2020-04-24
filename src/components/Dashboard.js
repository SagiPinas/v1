import React, { useState } from 'react';
import '../styles/dashboard.scss'
import Sidebar from './Sidebar';
import Widgets from './Widgets';
import Profile from './Profile';
import Map from './Map';
import Details from './Details'


const Dashboard = () => {

  const [profile, setProfile] = useState(false);
  const [viewDetails, setDetails] = useState(true);
  const [currentIncident, setCurrentIncident] = useState({})


  const toggleProfile = () => {
    if (profile) {
      setProfile(false)
    } else {
      document.getElementById('settings-tab').click();
      setProfile(true)
    }
  }

  return (
    <div>
      <Sidebar
        setDetails={setDetails}
        currentIncident={currentIncident}
        setCurrentIncident={setCurrentIncident}
        viewDetails={viewDetails}
      />
      <div onClick={() => { toggleProfile() }}>
        <Widgets />
      </div>
      <Map />
      {profile && (<Profile />)}
      {viewDetails && (<Details />)}
    </div>
  )
}

export default Dashboard;