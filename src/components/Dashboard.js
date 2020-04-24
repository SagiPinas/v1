import React, { useState } from 'react';
import '../styles/dashboard.scss'
import Sidebar from './Sidebar';
import Widgets from './Widgets';
import Profile from './Profile';
import Map from './Map';
import Details from './Details'


const Dashboard = () => {

  const [profile, setProfile] = useState(false);
  const [viewDetails, setDetails] = useState(false);
  const [currentIncident, setCurrentIncident] = useState({})


  const toggleProfile = () => {
    if (profile) {
      setProfile(false)
    } else {
      document.getElementById('settings-tab').click();
      setProfile(true)
      setDetails(false)
    }
  }

  return (
    <div>
      <Sidebar
        setDetails={setDetails}
        currentIncident={currentIncident}
        setCurrentIncident={setCurrentIncident}
        viewDetails={viewDetails}
        setProfile={setProfile}
      />
      <div onClick={() => { toggleProfile() }}>
        <Widgets />
      </div>
      <Map />
      {profile && (<Profile />)}
      {viewDetails && (<Details data={currentIncident} setDetails={setDetails} />)}
    </div>
  )
}

export default Dashboard;