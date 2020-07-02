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
    this.apply = this.apply.bind(this);
  }

  async componentDidMount() {
    const { handle } = this.props.match.params;

    const company = await JoblyApi.getCompany(handle);
    const jobs = await JoblyApi.getJobs();

    const companyJobs = jobs.filter((job) => job.company_handle === handle);
    company.jobs = companyJobs;

    this.setState({ company });
  }

  async apply(jobId) {
    let { username } = this.context;

    let message = await JoblyApi.applyToJob(jobId, username);

    let jobs = [...this.state.company.jobs];
    
    let newJobs = jobs.map((job) =>
      job.id === jobId ? { ...job, state: message } : job
    );

    this.setState((st) => ({
      company: { ...st.company, jobs: newJobs },
    }));
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
          <JobList jobs={jobs} apply={this.apply} />
        </div>
      </div>
    );
  }
}

export default Company;
