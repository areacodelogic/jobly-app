import React, { Component } from 'react';
import './Auth.css'

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      username: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt){
    this.setState({[evt.target.name]: evt.target.value})
  }

  handleSubmit(evt){
    evt.preventDefault()
    this.props.handleLogin(this.state);
  }

  render() {
    return (
      <div className="card">
        <div className='Auth-Form card-body'>
          <form onSubmit={this.handleSubmit}>
            <div className='form-group mb-4'>
              <label htmlFor='username'>Username</label>
              <input
                type='text'
                className='form-control'
                name='username'
                id='username'
                placeholder='Enter username...'
                onChange={this.handleChange}
                value={this.state.username}
              />
            </div>
            <div className='form-group mb-4'>
              <label htmlFor='passwprd'>Password</label>
              <input
                type='text'
                className='form-control'
                name='password'
                id='password'
                placeholder='Enter password...'
                onChange={this.handleChange}
                value={this.state.username}
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default LoginForm;