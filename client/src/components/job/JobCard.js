import React, { Component } from 'react';
import './JobCard.css';

class JobCard extends Component {
  render() {
    const { title, salary, equity } = this.props.job;

    return (
      <div className='Job-Card card'>
        <div className='card-body'>
          <h6 className='card-title d-flex justify-content-between'><span >{title}</span></h6>
          <div>Salary: {salary}</div>
          <div>Equity: {equity}</div>
        </div>
      </div>
    );
  }
}

export default JobCard;
