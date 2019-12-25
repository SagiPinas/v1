import React from 'react';
import '../styles/dashboard.scss'
import Sidebar from './Sidebar';
// import Profile from './Profile';


const Dashboard = () => {
  return (
    <div>
      <Sidebar />

      <div id="content-area">
        {/* <Profile /> */}
      </div>
    </div>
  )
}

export default Dashboard;