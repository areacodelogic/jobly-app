import React, { Component } from 'react';
import default_logo from '../../default-logo.png'

class CompanyCard extends Component {
  render() {
    const { name, description, logo_url } = this.props.company;

    return (
      <div className='Card card'>
        <div className='card-body'>
          <h6 className='className card-title d-flex justify-content-between'>
            <span >{name}</span>
            <img src={logo_url || default_logo} alt={name}/>
          </h6>
          <p>{description}</p>
        </div>
      </div>
    );
  }
}

export default CompanyCard;
