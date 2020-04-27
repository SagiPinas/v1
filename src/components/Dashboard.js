import React from 'react';
import '../styles/dashboard.scss'
import Sidebar from './Sidebar';
import Map from './Map';


const Dashboard = () => {


  const showsidebar = () => {
    document.getElementById('sidebar').style.display = "block"
  }

  return (
    <div>
      <div className="burger" onClick={showsidebar}>
        <i className="fa fa-bars fa-2x" />
      </div>
      <Sidebar />
      <Map />
    </div>
  )
}

export default Dashboard;