import React, { Component } from 'react';
import JoblyApi from '../../search/JoblyApi';
import default_logo from '../../default-logo.png';
import './Company.css'

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
    const { name, description, logo_url } = this.state.company;

    if(!this.state.company){
      return <div>Loading...</div>
    }
    return (
      <div className='Company card col-md-8 offset-md-2'>
        <div className='card-body '>
          <h5 className='card-title d-flex justify-content-between'>
            <span> {name} </span>
            <img src={logo_url || default_logo} alt={name} />{' '}
          </h5>
          <p>{description}</p>
        </div>
      </div>
    );
  }
}

export default Company;
