import React, { useState, useEffect } from 'react'
import '../styles/details.scss'
import moment from 'moment';
import axios from 'axios';
import { mapbox_key, openSidebarMobile } from './Utilities';
import loader from '../assets/loading.gif'



const Details = (props) => {

  // eslint-disable-next-line
  const [profile, setProfile] = useState(false)
  const [supportData, setSupport] = useState([])
  const [reportee, setReportee] = useState(null)

  const Responder = JSON.parse(localStorage.user)


  useEffect(() => {

    let point = JSON.parse(localStorage.currentLocation)

    axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${point.long},${point.lat}.json`, {
      params: {
        access_token: mapbox_key
      }
    })
      .then(res => {
        setSupport(res.data.features)
      })


    axios.get(`https://graph.facebook.com/${props.data.id}`, {
      params: {
        fields: "first_name,last_name,profile_pic",
        access_token: process.env.REACT_APP_FACEBOOK_PAGE_ACCESS_TOKEN
      }
    }
    )
      .then(res => {
        let reporteeData = {
          image: res.data.profile_pic,
          name: `${res.data.first_name} ${res.data.last_name}`
        }
        setReportee(reporteeData)
      })

  }, [props.data])


  return (
    <div className="profile-page">
      <div className="container-fluid profile-header">
        <div className="row">
          <div className=" py-5">
          </div>
        </div>
      </div>
      <div className="container-fluid mt--7 px-0 mx-0">
        <div className="container mx-0">
          <div className="info-card full-page ml-3">
            <div className="card-body">
              <div className={`status-bar ${props.data.status}`}></div>
              <div className="px-3 pt-1 pb-1 type-title">
                <h2 className="type pt-2">
                  <i className="fa fa-bullseye text-danger"></i> {props.data.type}
                </h2>
                <span>
                  {moment(props.data.timestamp).format('MMMM D, YYYY')} ({moment(props.data.timestamp).fromNow()})
                </span>
              </div>



              <div className="info-body">

                <center>
                  <div className="mt-1">
                    <div className="event-flow">

                      <div>
                        <p className="text-left"><small>Reportee:</small></p>
                        <div className="event-block">
                          <div className="reportee-profile">

                            {!reportee ? (
                              <div className="skeleton-cards">
                                <div className="skeleton-card info-card-loader">
                                  <div className="dot"><div /></div>
                                  <div className="line"><div /></div>
                                </div>
                              </div>
                            ) : (
                                <span>
                                  <img src={reportee.image} alt="reportee-avatar" className="reportee-img" />
                                  {reportee.name}
                                  <br />
                                </span>
                              )}
                          </div>
                          <div>
                            <p className="m-3"><i className="fa fa-arrow-right text-primary" /></p>
                          </div>
                        </div>
                      </div>

                      {props.data.status === "verified" && (
                        <div>
                          <p className="text-left"><small>Responder:</small></p>
                          <div className="event-block">
                            <div className="reportee-profile">
                              {!localStorage.user ? (
                                <div className="skeleton-cards">
                                  <div className="skeleton-card info-card-loader">
                                    <div className="dot"><div /></div>
                                    <div className="line"><div /></div>
                                  </div>
                                </div>
                              ) : (
                                  <span>
                                    <img src={Responder.avatar} alt="reportee-avatar" className="reportee-img" />
                                    {Responder.name}
                                    <br />
                                  </span>
                                )}
                            </div>
                            <div>
                              <p className="my-3 mx-3"><i className="fa fa-arrow-right text-primary" /></p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* result block */}

                      <div>
                        <p className="text-left"><small>Result:</small></p>
                        <div className="event-block">
                          <div className={`reportee-profile flow-result ${props.data.status}`}>
                            {!localStorage.user ? (
                              <div className="skeleton-cards">
                                <div className="skeleton-card info-card-loader">
                                  <div className="dot"><div /></div>
                                  <div className="line"><div /></div>
                                </div>
                              </div>
                            ) : (
                                <span>
                                  <i className={`${props.data.status === "verified" ? "fa fa-check" : "fa fa-banned"} mr-1`} />
                                  {(props.data.status).toUpperCase()}
                                  <br />
                                </span>
                              )}
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </center>

                <hr className="my-3" />

                <div className="mb-3">
                  <p className="detail-title">
                    <i className="fa fa-circle mr-1"></i>Report Details
                  </p>
                  <div className="report-div">
                    {props.data.details}
                  </div>
                </div>

                {
                  supportData.length !== 0 ? (
                    supportData.map(details => {
                      return (
                        <div className="mb-3">
                          <p className="detail-title">
                            <i className="fa fa-circle mr-1"></i>
                            {`${details.place_type}`}
                          </p>
                          <div className="report-div">
                            {`(${details.text}) , ${details.place_name}`}
                          </div>
                        </div>
                      )
                    })
                  ) : (
                      <center>
                        <div className="loading-card">
                          <img src={loader} alt="loader" />
                          <p>Loading report details...</p>
                        </div>
                      </center>
                    )
                }

              </div>
              <hr />
              <button className="btn btn-dark float-right mb-4"
                onClick={() => {
                  props.setDetails(false);
                  openSidebarMobile()
                }}
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default Details;