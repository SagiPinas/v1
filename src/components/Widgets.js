import React from 'react'
import defaultImg from '../assets/default-avatar.png'

const Widgets = (props) => {
  const userData = JSON.parse(localStorage.user)
  return (
    <div className="widgets unselectable" id="profileWidget">
      <div className="user-tab">
        <img src={userData.avatar ? userData.avatar : defaultImg} alt="user-img" className="user-img" />
        {userData.name ? userData.name.split(" ")[0] : "User"}
      </div>
    </div>
  )
}

export default Widgets;