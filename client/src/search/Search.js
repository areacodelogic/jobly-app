import React, { Component } from 'react';

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
      <div className='Search'>
        <form className='form-inline' onSubmit={this.handleSubmit}>
          <input
            className='form-control form-control-lg flex-grow-1'
            name='searchItem'
            type='search'
            placeholder='Enter search term...'
            value={this.state.searchItem}
            onChange={this.handleChange}
          />
          <button type='submit' className='btn btn-lg btn-primary'>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
