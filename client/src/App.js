import React, { Component } from 'react';
import Routes from '../src/components/routing/Routes';
import Navbar from '../src/components/layout/Navbar';

import './App.css';
import JoblyApi from './search/JoblyApi';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser = null
    }
  }

  // async getCurrentUser(){
  //   let token = localStorage.getItem('jobly-token')

  //   try {
  //     //get username from token
  //     let {username} = decode(token);

  //     //get record of user from server and set state
  //     let currentUser = await JoblyApi.getCurrentUser(username);
  //     thjis.setState({currentUser})
  //   } catch(err) {
  //     console.error(err)
  //   }
  // }


  render() {
    return (
        <div className='App'>
          <Navbar />
          <Routes />
        </div>
    );
  }
}

export default App;
