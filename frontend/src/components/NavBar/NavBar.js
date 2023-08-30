import React from 'react'
import './NavBar.css'
import { Link, useLocation } from 'react-router-dom'

function NavBar() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/' || location.pathname === '/signup';
  const storedUserID = localStorage.getItem('userID');
  const feedPath = `/feed/${storedUserID}`

  return (
    <div className="nav-container">
      <ul className="nav justify-content-center bg-dark">
        <li className="nav-item">
          {!isLoginPage ? (
            <span className="nav-link text-white" href="#"><Link style={{ textDecoration: 'none', color: '#ffff', cursor: 'hand'}} to={feedPath}>Feed</Link></span>
          ) : null}
        </li>
        <li className="nav-item">
          <span className="nav-link text-white"><Link style={{ textDecoration: 'none', color: '#ffff', cursor: 'hand'}} to="/contact">Contact</Link></span>
        </li>
        <li className="nav-item">
          <span className="nav-link text-white"><Link style={{ textDecoration: 'none', color: '#ffff', cursor: 'hand'}} to="/about">About</Link></span>
        </li>
        <li className="nav-item">
          <span className="nav-link text-white" ><Link style={{ textDecoration: 'none', color: '#ffff', cursor: 'hand'}} to="/">Login</Link></span>
        </li>
      </ul>
    </div>

  )
}

export default NavBar