import React, { Component } from 'react';
import JoblyApi from '../../search/JoblyApi';

class Company extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: {},
    };
  }

  async componentDidMount() {
    const { handle } = this.props.match.params;
    const company = await JoblyApi.getCompany(handle);
    this.setState({ company });
  }

  render() {
    const { name, description } = this.state.company;

    if(!this.state.company){
      return <div>Loading...</div>
    }
    return (
      <div className='Company '>
      
        <h5>{this.state.company.name}</h5>
        
        <p>{description}</p>
      </div>
    );
  }
}

export default Company;
