import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import { UserContext } from '../contexts/UserContext';

class Navigation extends Component {
  static contextType = UserContext;

  render() {
    const currentUser = this.context;

    let navLinks = (
      <div className='navbar-nav'>
          <NavLink className='nav-link nav-item' to='/companies'>
            Companies
          </NavLink>
      
          <NavLink className='nav-link nav-item' to='/jobs'>
            Jobs
          </NavLink>
       
          <NavLink className='nav-link nav-item' to='/profile'>
            Profile
          </NavLink>
      
          <NavLink className='nav-link nav-item' to='/login' onClick={this.props.logout}>
            Logout
          </NavLink>
       
    
      </div>
    );

    if(!currentUser) {
      navLinks = (
         <div className='nav-nav '>
          <NavLink className='nav-link nav-item' to='/login'>
            Login
          </NavLink>
        </div>
      )
    }
    return (
      <div>
        <nav className='Navbar navbar navbar-expand-md navbar-dark bg-dark'>
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
