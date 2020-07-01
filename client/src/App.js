import React, { Component } from 'react';
import Routes from '../src/components/routing/Routes';
import Navbar from '../src/components/layout/Navbar';
import {decode} from 'jsonwebtoken';
import UserContext from '../src/components/contexts/UserContext';

import './App.css';
import JoblyApi from './search/JoblyApi';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null
    }
    this.getCurrentUser = this.getCurrentUser.bind(this);
  }

  async componentDidMount(){
    await this.getCurrentUser()
  }

  async getCurrentUser(){
    let token = localStorage.getItem('jobly-token')

    try {
      //get username from token
      let {username} = decode(token);

      //get record of user from server and set state
      let currentUser = await JoblyApi.getCurrentUser(username);

      this.setState({currentUser})
    } catch(err) {
      console.error(err)
    }
  }


  render() {
    return (
      <UserContext.Provider value={this.state.currentUser}>
        <div className='App'>
          <Navbar  />
          <Routes
            getCurrentUser={this.getCurrentUser}
          />
        </div>
      </UserContext.Provider>
    );
  }
}

export default App;
