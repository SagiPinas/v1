import React from 'react';

import '../styles/sidebar.scss';


const Sidebar = () => {
  return (
    <div id="sidebar">
      <div id="gradient-loader">
      </div>
      <div className="sidebar-title">
        <div id="sidebar-logo">
          <div></div>
        </div>
        <strong>SagiPinas</strong>
      </div>
      <div className="tab-menu">
        <ul>
          <li className="active shadow">FEED</li>
          <li>HISTORY</li>
          <li>SETTINGS</li>
        </ul>
      </div>

      <div className="live-feed p-2">
        <div className="card">
        </div>
        <div className="card">
        </div>
        <div className="card">
        </div>
        <div className="card">
        </div>
        <div className="card">
        </div>
      </div>

    </div>
  )
}

export default Sidebar;