import React, { Component } from 'react';
import JoblyApi from './search/JoblyApi';
import Routes from '../src/components/routing/Routes';
import Navbar from '../src/components/layout/Navbar';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <Navbar />
        <Routes />
      </div>
    );
  }
}

export default App;
