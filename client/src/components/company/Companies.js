import React, { Component } from 'react';
import JoblyApi from '../../search/JoblyApi';
import CompanyList from './CompanyList';
import Search from '../../search/Search';

class Companies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companies: [],
    };

    this.handleSearch = this.handleSearch.bind(this);
  }

  
  async componentDidMount() {
    let companies = await JoblyApi.getCompanies();
    this.setState({ companies });
  }
  
  async handleSearch(search) {
    let companies = await JoblyApi.getCompanies(search);
    this.setState({ companies });
  }
  render() {
    return (
      <div className='Companies col-md-8 offset-md-2'>
        <Search
          className='Search'
          handleSearch={this.handleSearch}
        />
        <CompanyList companies={this.state.companies} />
      </div>
    );
  }
}

export default Companies;
