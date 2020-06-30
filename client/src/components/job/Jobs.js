import React, { Component } from 'react';
import JoblyApi from '../../search/JoblyApi';
import JobList from './JobList';
import Search from '../../search/Search';

class Jobs extends Component {
  constructor(props) {
    super(props);
    this.state = { jobs: [] };

    this.handleSearch = this.handleSearch.bind(this);
  }
  async componentDidMount() {
    let jobs = await JoblyApi.getJobs();
    this.setState({ jobs });
  }

  async handleSearch(search) {
    let jobs = await JoblyApi.getJobs(search);
    this.setState({ jobs });
  }

  render() {
    return (
      <div className='Jobs col-md-8 offset-md-2'>
        <Search className='Search' handleSearch={this.handleSearch} />
        <JobList jobs={this.state.jobs} />
      </div>
    );
  }
}

export default Jobs;
