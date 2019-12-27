import React from 'react'

const History = () => {

  return (
    <div className="history">
      <div className="table-responsive border">
        <table className="table align-items-center table-flush">
          <thead className="thead-light">
            <tr>
              <th scope="col">Type</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>

            <tr>
              <th scope="row">Earthquake</th>
              <td><button className="btn btn-sm btn-outline-success">Verified</button></td>
            </tr>
            <tr>
              <th scope="row">Earthquake</th>
              <td><button className="btn btn-sm btn-outline-success">Verified</button></td>
            </tr>


          </tbody>
        </table>
      </div>
    </div>
  )
}

export default History;