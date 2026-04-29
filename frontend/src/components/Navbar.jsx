import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {

  return (
          <nav className = "navbar">
            <NavLink to = "/" id = "petstagram-logo">Petstagram</NavLink>
            <ul>
                  <li><NavLink to = "/" end>Home</NavLink></li>
                  <li><NavLink to = "/about">About</NavLink></li>
                  <li><NavLink to = "/community-guidelines">Community Guidelines</NavLink></li>
                  <li><NavLink to = "/sign-up">Sign up</NavLink></li>
                  <li><NavLink to = "/login">Login</NavLink></li>
                  <li><NavLink to = "/profile">Profile</NavLink></li>
            </ul>
          </nav>
  )
}

export default Navbar