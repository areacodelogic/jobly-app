import React, { Component } from 'react';
import JoblyApi from '../../search/JoblyApi';
import JobList from '../job/JobList';

import default_logo from '../../default-logo.png';
import './Company.css';
import UserContext from '../contexts/UserContext';

class Company extends Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);
    this.state = {
      company: { jobs: [] },
    };

  }

  async componentDidMount() {
    const { handle } = this.props.match.params;

    const company = await JoblyApi.getCompany(handle);
    const jobs = await JoblyApi.getJobs();

    const companyJobs = jobs.filter((job) => job.company_handle === handle);
    company.jobs = companyJobs;
    
    this.setState({ company });
  }




  render() {
    const { name, description, logo_url, jobs } = this.state.company;
    console.log(jobs);

    if (!this.state.company) {
      return <div>Loading...</div>;
    }
    return (
      <div className='Company card col-md-8 offset-md-2'>
        <div className='card-body '>
          <h5 className='card-title d-flex justify-content-between'>
            <span> {name} </span>
            <img src={logo_url || default_logo} alt={name} />{' '}
          </h5>
          <p>{description}</p>
          <JobList jobs={jobs} 
           />
        </div>
      </div>
    );
  }
}

export default Company;
