import React, { Component } from 'react';
import JobCard from './JobCard';

class JobList extends Component {
  render() {
    let { jobs } = this.props;
    jobs = jobs.map((job, idx) => <JobCard idx={idx} key={idx} job={job} />);
    return <div>{jobs}</div>;
  }
}

export default JobList;
