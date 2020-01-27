import React, { useState } from 'react';
import '../styles/dashboard.scss'
import Sidebar from './Sidebar';
import Widgets from './Widgets';
import Profile from './Profile';
import Map from './Map';


const Dashboard = () => {

  const [profile, setProfile] = useState(false);

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
      <Sidebar />
      <div onClick={() => { toggleProfile() }}>
        <Widgets />
      </div>
      {
        profile ? (<Profile />) : (
          <Map />
        )
      }
    </div>
  )
}

export default Dashboard;