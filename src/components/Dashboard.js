import React, { useState } from 'react';
import '../styles/dashboard.scss'
import Sidebar from './Sidebar';
import Widgets from './Widgets';
import Profile from './Profile';


const Dashboard = () => {

  const [profile, setProfile] = useState(true);

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
          <div id="content-area">
          </div>
        )
      }
    </div>
  )
}

export default Dashboard;