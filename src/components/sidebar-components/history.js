import React, { useState, useEffect } from 'react'
import { coreURL, ellipsis } from '../Utilities';
import axios from 'axios';
import CardSkeleton from './card-skeleton'
import moment from 'moment'

const History = () => {

  const [tabState, setTabState] = useState('loading');
  const [historyData, setHistoryData] = useState([]);


  useEffect(() => {
    let user = JSON.parse(localStorage.user);
    axios.get(`${coreURL}/public/responder/?responderId=${user.id}`)
      .then(res => {
        setHistoryData(res.data.history)
        setTabState('render')
      })
  }, [])


  const EmptyHistory = () => {
    return (
      <p className="ml-2 text-muted">Nothing to show.</p>
    )
  }


  return (
    <div className="history">
      <input placeholder="Search History" id="sidebar-history-search" />
      <hr className="mb-3" />

      {

        tabState === "render" ? (
          historyData.length !== 0 ? (
            historyData.map(history => {
              return (
                <div className="card fade-in-bottom"
                  onClick={(e) => {
                  }}>
                  <span className="date">
                    {moment(history.timestamp).format('l')}
                  </span>
                  <span className="status">
                    <i className="fa fa-circle mr-1" />{history.status}
                  </span>
                  <span className="tag">
                    <i className="fa fa-bars text-primary mr-1"></i>
                    {history.type}
                  </span>
                  <hr />
                  <div className="body">
                    {ellipsis(history.details, 30)}
                  </div>
                </div>
              )
            })
          ) : (<EmptyHistory />)


        ) : (
            <CardSkeleton count={[1, 2, 3, 4, 5, 6, 7, 8]} />
          )

      }




    </div>
  )
}

export default History;