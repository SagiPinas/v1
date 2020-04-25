import React, { useState, useEffect } from 'react'
import { coreURL, ellipsis, closeSidebarMobile } from '../Utilities';
import axios from 'axios';
import CardSkeleton from './card-skeleton'
import moment from 'moment'
import Fuse from 'fuse.js'

const History = (props) => {

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


  const openDetails = (data) => {
    props.setCurrentIncident(data)
    props.setDetails(true)
    props.setProfile(false)
    closeSidebarMobile()
  }


  const EmptyHistory = () => {
    return (
      <p className="ml-2 text-muted">Nothing to show.</p>
    )
  }

  const searchOptions = {
    isCaseSensitive: false,
    findAllMatches: false,
    includeMatches: false,
    includeScore: false,
    useExtendedSearch: false,
    minMatchCharLength: 2,
    shouldSort: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    keys: [
      "status",
      "type",
      "details"
    ]
  };


  const searchHistory = (pattern) => {
    setTabState("loading")
    let user = JSON.parse(localStorage.user);
    axios.get(`${coreURL}/public/responder/?responderId=${user.id}`)
      .then(res => {
        if (pattern.trim() !== "") {
          const fuse = new Fuse(res.data.history, searchOptions);
          let result = fuse.search(pattern).map(data => data.item);
          setHistoryData(result)
        } else {
          setHistoryData(res.data.history)
        }
        setTabState('render')
      })

  }


  return (
    <div className="history">
      <input
        placeholder="Search History"
        id="sidebar-history-search"
        onKeyUp={e => {
          if (e.keyCode === 13) {
            searchHistory(e.target.value)
          }
        }}
      />
      <hr className="mb-3" />

      {

        tabState === "render" ? (
          historyData.length !== 0 ? (
            historyData.map(history => {
              return (
                <div className="card fade-in-bottom"
                  onClick={() => {
                    openDetails(history)
                  }}>
                  <span className="date">
                    {moment(history.timestamp).format('l')}
                  </span>
                  <span className={`status ${history.status}`}>
                    <i className={`fa ${history.status === 'cancelled' ? 'fa-ban' : 'fa-circle'} mr-1`} />{history.status}
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