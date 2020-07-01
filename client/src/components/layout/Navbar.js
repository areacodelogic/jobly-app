import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import { UserContext } from '../contexts/UserContext';

class Navigation extends Component {
  static contextType = UserContext;

  render() {
    const currentUser = this.context;

    let navLinks = (
      <ul className='navbar-nav '>
        <li className='nav-item mr-4'>
          <NavLink className='nav-link' to='/companies'>
            Companies
          </NavLink>
        </li>
        <li className='nav-item mr-4'>
          <NavLink className='nav-link' to='/jobs'>
            Jobs
          </NavLink>
        </li>
        <li className='nav-item mr-4'>
          <NavLink className='nav-link' to='/profile'>
            Profile
          </NavLink>
        </li>
        <li className='nav-item mr-4'>
          <NavLink className='nav-link' to='/'>
            Logout
          </NavLink>
        </li>
    
      </ul>
    );

    if(!currentUser) {
      navLinks = (
         <li className='nav-item mr-4'>
          <NavLink className='nav-link' to='/login'>
            Login
          </NavLink>
        </li>
      )
    }
    return (
      <div>
        <nav className='navbar navbar-expand-md navbar-dark bg-dark'>
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
            {navLinks}
          </div>
        </nav>
      </div>
    );
  }
}

export default Navigation;
