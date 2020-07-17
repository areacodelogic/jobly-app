import React, { Component } from 'react';
import JobCard from './JobCard';

class JobList extends Component {
  render() {
    let { jobs } = this.props;
    jobs = jobs.map((job, idx) => (
      <JobCard key={idx} job={job} apply={this.props.apply} />
    ));
    return <div>{jobs}</div>;
  }
}

export default JobList;
