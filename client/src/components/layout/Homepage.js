import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css';
import UserContext from '../contexts/UserContext';

class Homepage extends Component {
  static contextType = UserContext;

  render() {
    const currentUser = this.context;
    return (
      <div className="Homepage">
          <div className='container text-center'>
            <h1 className='font-weight-bold'>Jobly</h1>
            <p className='lead'>All the jobs in one, convenient place</p>
            {currentUser ? (
              <h2>Welcome Back {currentUser.first_name} </h2>
            ) : (
              <Link className='btn btn-dark mx-2' to='/login'>
                Login
              </Link>
            )}
          </div>
      </div>
    );
  }
}

export default Homepage;
