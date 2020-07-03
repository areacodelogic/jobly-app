import React, { Component } from 'react';
import JoblyApi from '../../search/JoblyApi';
import JobList from './JobList';
import Search from '../../search/Search';
import UserContext from '../contexts/UserContext';

class Jobs extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = { jobs: [] };

    this.handleSearch = this.handleSearch.bind(this);
    this.apply = this.apply.bind(this);
  }
  
  async handleSearch(search) {
    let jobs = await JoblyApi.getJobs(search);
    this.setState({ jobs });
  }
  
  async apply(jobId) {
    let {username} = this.context 
    
    let message = await JoblyApi.applyToJob(jobId, username);
    
    this.setState((st) => ({
      jobs: st.jobs.map((job) =>
      job.id === jobId ? { ...job, state: message } : job
      ),
    }));
  }
  
  async componentDidMount() {
    let jobs = await JoblyApi.getJobs();
    this.setState({ jobs });
  }

  
  render() {
    return (
      <div className='Jobs col-md-8 offset-md-2'>
        <Search className='Search' handleSearch={this.handleSearch} />
        <JobList jobs={this.state.jobs} apply={this.apply}/>
      </div>
    );
  }
}

export default Jobs;
