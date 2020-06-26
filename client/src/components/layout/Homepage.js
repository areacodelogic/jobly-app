import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css'


class Homepage extends Component {
  render() {
    return (
      <div className='Homepage'>
        <div className='container text-center'>
          {' '}
          <h1>Need a job? We got you.</h1>
          <p className="lead">All the jobs in one, convenient place</p>
          <div>
            <Link className='btn btn-dark mx-2' to='/login'>
              Login
            </Link>
            <Link className='btn btn-dark mx-2' to='/register'>
              Register
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Homepage;
