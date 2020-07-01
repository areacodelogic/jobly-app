import React, { Component } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import './Auth.css';
import JoblyApi from '../../search/JoblyApi';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeView: 'login',
    };
    this.toggleView = this.toggleView.bind(this);
    this.toggleLoginView = this.toggleLoginView.bind(this);
    this.toggleRegisterView = this.toggleRegisterView.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }

  toggleView(view) {
    this.setState({ activeView: view });
  }

  toggleLoginView() {
    this.toggleView('login');
  }

  toggleRegisterView() {
    this.toggleView('register');
  }

  async handleLogin(data) {
    let token

    try {
      token = await JoblyApi.login(data);

      localStorage.setItem('jobly-token', token);

      await this.props.getCurrentUser()
      this.props.history.push('/');
    } catch (err) {}
  }

  async handleRegister(data) {
    let token 
    try {
      token = await JoblyApi.register(data);

      localStorage.setItem('jobly-token', token);

      await this.props.getCurrentUser();
      this.props.history.push('/');
    } catch (err) {}
  }

  render() {
    let loginActive = this.state.activeView === 'login';
    let form =
      this.state.activeView === 'login' ? (
        <LoginForm handleLogin={this.handleLogin} />
      ) : (
        <RegisterForm handleRegister={this.handleRegister} />
      );

    return (
      <div className='form-container container col-md-6 offset-md-3 col-lg-4 offset-lg-4'>
        <div className='d-flex justify-content-end'>
          <div className='btn-group'>
            <button
              className={`btn btn-primary ${loginActive ? 'active' : ''} `}
              onClick={this.toggleLoginView}>
              Login
            </button>
            <button
              className={`btn btn-primary ${loginActive ? '' : 'active'} `}
              onClick={this.toggleRegisterView}>
              Register
            </button>
          </div>
        </div>
        {form}
      </div>
    );
  }
}

export default Login;
