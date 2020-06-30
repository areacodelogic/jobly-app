import React, { Component } from 'react';
import './Auth.css'
class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      first_name: '',
      last_name: '',
      email: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleSubmit.bind(this);
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.handleRegister(this.state);
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  render() {
    return (
      <div className='card'>
        <div className='Auth-Form card-body'>
          <form onSubmit={this.handleSubmit}>
            <div className='form-group mb-4'>
              <label htmlFor='username'>Username</label>
              <input
                type='text'
                name='username'
                className='form-control'
                id='username'
                placeholder='Enter username...'
                onChange={this.handleChange}
                value={this.state.username}
              />
            </div>
            <div className='form-group mb-4'>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                name='password'
                className='form-control'
                id='password'
                placeholder='Enter password...'
                onChange={this.handleChange}
                value={this.state.password}
              />
            </div>
            <div className='form-group mb-4'>
              <label htmlFor='first_name'>First Name</label>
              <input
                type='text'
                name='first_name'
                className='form-control'
                id='first_name'
                placeholder='Enter first name...'
                onChange={this.handleChange}
                value={this.state.first_name}
              />
            </div>
            <div className='form-group mb-4'>
              <label htmlFor='last_name'>Last Name</label>
              <input
                type='text'
                name='username'
                className='form-control'
                id='last_name'
                placeholder='Enter last name...'
                onChange={this.handleChange}
                value={this.state.last_name}
              />
            </div>
            <div className='form-group mb-4'>
              <label htmlFor='email'>Email</label>
              <input
                type='email'
                name='email'
                className='form-control'
                id='email'
                placeholder='Enter email...'
                onChange={this.handleChange}
                value={this.state.email}
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default RegisterForm;
