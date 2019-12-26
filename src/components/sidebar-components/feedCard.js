import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { coreURL } from '../Utilities'
import moment from 'moment';

const FeedCard = (props) => {

  const [list, setList] = useState("loading")
  const [listData, setListData] = useState([])

  useEffect(() => {
    axios.get(`${coreURL}/incidents`)
      .then(res => {
        setList("render")
        setListData(res.data);
        console.log(res.data)
      })
  }, [])

  return (
    <div>
      {list === "render" ? (
        listData.map(incident => {
          return (
            incident.status === "unverified" ? (
              <div className="card">
                <span className="date">
                  {moment(incident.timestamp).fromNow()}
                </span>
                <span
                  className="reviewers"
                  title="No. of responders reviewing this incident."
                >0</span>
                <span className="tag">
                  <i className="fa fa-bullseye text-danger mr-1"></i>
                  {incident.type}
                </span>
                <hr />
                <div className="body">
                  {incident.details}
                </div>
              </div>
            ) : ""
          )
        })
      ) : ("")}
    </div>
  )
}

export default FeedCard;