import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Homepage from '../layout/Homepage';
import Login from '../auth/Login';
import Register from '../auth/Register';
import Jobs from '../job/Jobs';
import Company from '../company/Company';
import Companies from '../company/Companies';
import Profile from '../profile/Profile';

class Routes extends Component {
  render() {
    return (
      <div className='Routes'>
        <Switch>
          <Route exact path='/' render={() => <Homepage />} />
          <Route exact path='/login' render={() => <Login />} />
          <Route exact path='/register' render={() => <Register />} />
          <Route exact path='/companies' render={() => <Companies />} />
          <Route
            exact
            path='/companies:handle'
            render={(props) => <Company {...props} />}
          />
          <Route exact path='/jobs' render={() => <Jobs />} />
          <Route exact path='/profile' render={() => <Profile />} />
        </Switch>
      </div>
    );
  }
}

export default Routes;
