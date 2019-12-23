import React from 'react'

const Footer = () => {
  return (
    <footer className="py-5">
      <div className="container">
        <div className="row align-items-center justify-content-xl-between">
          <div className="col-xl-6">
            <div className="copyright text-center text-xl-left text-muted">
              © {new Date().getFullYear()} <a href="https://sagipinas.now.sh" className="font-weight-bold ml-1" target="_blank" rel="noopener noreferrer">SagiPinas</a>
            </div>
          </div>
          <div className="col-xl-6">
            <ul className="nav nav-footer justify-content-center justify-content-xl-end">
              <li className="nav-item">
                <a href="https://github.com/SagiPinas" className="nav-link" target="_blank" rel="noopener noreferrer">Github</a>
              </li>
              <li className="nav-item">
                <a href="https://sagipinas.now.sh" className="nav-link" target="_blank" rel="noopener noreferrer">About Us</a>
              </li>
              <li className="nav-item">
                <a href="https://facebook.com/Sagipinas" className="nav-link" target="_blank" rel="noopener noreferrer">Facebook</a>
              </li>
              <li className="nav-item">
                <a href="https://github.com/creativetimofficial/argon-dashboard/blob/master/LICENSE.md" className="nav-link" target="_blank" rel="noopener noreferrer">MIT License</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;