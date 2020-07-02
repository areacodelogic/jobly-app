import React, { Component } from 'react';
import './JobCard.css';

class JobCard extends Component {
  constructor(props) {
    super(props);
    this.handleApply = this.handleApply.bind(this);
  }

  handleApply() {
    this.props.apply(this.props.job.id);
  }
  render() {
    const { title, salary, equity } = this.props.job;
    console.log(this.props.job)
    return (
      <div className='Job-Card card'>
        <div className='card-body'>
          <h6 className='card-title d-flex justify-content-between'>
            <span>{title}</span>
          </h6>
          <div>Salary: {salary}</div>
          <div>Equity: {equity}</div>
          <button
            className='btn btn-danger font-weight-bold text-uppercase float-right'
            onClick={this.handleApply}
            >
            {this.props.job.state ? "Applied" : 'Apply'}
          </button>
        </div>
      </div>
    );
  }
}

export default JobCard;
