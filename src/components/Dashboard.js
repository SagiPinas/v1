import React from 'react';
import '../styles/dashboard.scss'
import Sidebar from './Sidebar';



const Dashboard = () => {
  return (
    <div>
      <Sidebar />

      <div id="content-area">
      </div>
    </div>
  )
}

export default Dashboard;