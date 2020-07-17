import React, { Component } from 'react';
import Routes from './components/routing/Routes';
import Navbar from './components/layout/Navbar';
import { decode } from 'jsonwebtoken';
import UserContext from './components/contexts/UserContext';

import './App.css';
import JoblyApi from './search/JoblyApi';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      infoLoaded: false,
    };
    this.getCurrentUser = this.getCurrentUser.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  async componentDidMount() {
    await this.getCurrentUser();
  }

  async getCurrentUser() {
    let token = localStorage.getItem('jobly-token');

    try {
      //get username from token
      let { username } = decode(token);

      //get record of user from server and set state
      let currentUser = await JoblyApi.getCurrentUser(username);
      console.log(currentUser);

      this.setState({ currentUser, infoLoaded: true });
    } catch (err) {
      this.setState({ currentUser: null, infoLoaded: true });
    }
  }

  handleLogout() {
    localStorage.removeItem('jobly-token');
    this.setState({ currentUser: null });
  }

  render() {
    if (!this.state.infoLoaded) {
      return <div>Loading...</div>;
    }
    return (
      <UserContext.Provider value={this.state.currentUser}>
        <div className='App'>
          <Navbar logout={this.handleLogout} />
          <Routes getCurrentUser={this.getCurrentUser} />
        </div>
      </UserContext.Provider>
    );
  }
}

export default App;
