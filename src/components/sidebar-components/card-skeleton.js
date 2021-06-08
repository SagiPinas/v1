import React from 'react';

const defaultNo = [1, 2, 3, 4, 5, 6, 7];

const CardSkeleton = (props) => {
  return (
    <div className="skeleton-cards">
      {
        props.count ? (
          props.count.map(card => {
            return (
              <div className="skeleton-card">
                <div className="dot"><div /></div>
                <div className="line"><div /></div>
                <div className="line"><div /></div>
                <div className="line"><div /></div>
              </div>
            )
          })
        ) : (
            defaultNo.map(card => {
              return (
                <div className="skeleton-card">
                  <div className="dot"><div /></div>
                  <div className="line"><div /></div>
                  <div className="line"><div /></div>
                  <div className="line"><div /></div>
                </div>

              )
            })
          )
      }
    </div>
  )
}

export default CardSkeleton;