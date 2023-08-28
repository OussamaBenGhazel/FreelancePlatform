import React from 'react'
import './NavBar.css'

function NavBar() {
  return (
    <div classname="nav-container">
<ul className="nav justify-content-center bg-dark">
  <li className="nav-item">
    <span className="nav-link text-white" href="#">Feed</span>
  </li>
  <li className="nav-item">
    <span className="nav-link text-white" href="#">About</span>
  </li>
  <li className="nav-item">
    <span className="nav-link text-white" href="#">Login</span>
  </li>
</ul>

</div>

  )
}

export default NavBar