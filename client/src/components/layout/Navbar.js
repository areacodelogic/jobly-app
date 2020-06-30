import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import "./Navbar.css"

class Navigation extends Component {
  render() {
    return (
      <div className="Navbar">
        <nav className='navbar navbar-expand-lg'>
          <NavLink className='navbar-brand' to='/'>
            Jobly
          </NavLink>
          <button
            className='navbar-toggler'
            type='button'
            data-toggle='collapse'
            data-target='#navbarNav'
            aria-controls='navbarNav'
            aria-expanded='false'
            aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon'></span>
          </button>
          <div
            className='collapse navbar-collapse justify-content-end'
            id='navbarNav'>
            <ul className='navbar-nav'>
              <li className='nav-item'>
                <NavLink className='nav-link' to='/companies'>
                  Companies
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink className='nav-link' to='/jobs'>
                  Jobs
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink className='nav-link' to='/profile'>
                  Profile
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink className='nav-link' to='/'>
                  Logout
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink className='nav-link' to='/login'>
                  Login
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navigation;
