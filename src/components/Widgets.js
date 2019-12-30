import React from 'react'
import Bryce from '../assets/bryce.jpg'

const Widgets = (props) => {
  return (
    <div className="widgets" id="profileWidget">
      <div className="user-tab">
        <img src={Bryce} alt="user-img" className="user-img" />
        Bryce
      </div>
    </div>
  )
}

export default Widgets;