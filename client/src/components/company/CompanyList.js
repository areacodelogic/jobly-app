import React, { Component } from 'react';
import CompanyCard from './CompanyCard'

class CompanyList extends Component {
  render() {
    let { companies } = this.props;
    companies = companies.map((company, idx) => (
      <CompanyCard idx={idx} key={idx} company={company} />
    ));

    return (
      <div> {companies} </div>
   )
  }
}

export default CompanyList;
