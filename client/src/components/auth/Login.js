import React, { Component } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm'
import './Auth.css'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeView: 'login',
    };
    this.toggleView = this.toggleView.bind(this);
    this.toggleLoginView = this.toggleLoginView.bind(this);
    this.toggleRegisterView = this.toggleRegisterView.bind(this)
    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }

  toggleView(view){
    this.setState({activeView: view})
  }

  toggleLoginView(){
    this.toggleView('login')
  }

  toggleRegisterView(){
    this.toggleView('register')
  }

  async handleLogin(data){
    //store data
  }

  async handleRegister(data){
    //store data
  }

  render() {
    let form =
      this.state.activeView === 'login' 
      ? <LoginForm handleLogin={this.handleLogin}/> 
      : <RegisterForm handleRegister={this.handleRegister}/>;

    return (
      <div className='form-container container col-md-6 offset-md-3 col-lg-4 offset-lg-4'>
        <div className='d-flex justify-content-end'>
          <div className='btn-group'>
            <button className='btn btn-primary' onClick={this.toggleLoginView}>
              Login
            </button>
            <button
              className='btn btn-primary'
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
