import React, { Component } from 'react';
import './Search.css';

export class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchItem: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.handleSearch(this.state.searchItem);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  render() {
    return (
      <div className='Search my-5'>
        <form className='form-inline' onSubmit={this.handleSubmit}>
          <input
            className='input form-control form-control-lg flex-grow-1 search-input'
            name='searchItem'
            type='search'
            placeholder='Enter search term...'
            value={this.state.searchItem}
            onChange={this.handleChange}
          />
          <button type='submit' className='btn btn-lg btn-primary search-btn'>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
