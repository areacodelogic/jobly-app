import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import default_logo from '../../default-logo.png'

class CompanyCard extends Component {
  render() {
    const { name, description, logo_url, handle } = this.props.company;

    return (
      <Link className='Card card' to={`/companies/${handle}`}>
        <div className='card-body'>
          <h6 className='className card-title d-flex justify-content-between'>
            <span >{name}</span>
            <img src={logo_url || default_logo} alt={name}/>
          </h6>
          <p>{description}</p>
        </div>
      </Link>
    );
  }
}

export default CompanyCard;
