import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Homepage from '../layout/Homepage';
import Login from '../auth/Login';
import Jobs from '../job/Jobs';
import Company from '../company/Company';
import Companies from '../company/Companies';
import Profile from '../profile/Profile';
import PrivateRoute from './PrivateRoute';

class Routes extends Component {
  render() {
    const { getCurrentUser } = this.props;
    return (
      <div className='Routes'>
        <Switch>
          <Route
            exact
            path='/'
            render={(props) => (
              <Homepage {...props} />
            )}
          />
          <Route
            exact
            path='/login'
            render={(props) => (
              <Login {...props} getCurrentUser={getCurrentUser} />
            )}
          />
          <PrivateRoute
            exact
            path='/companies'
            render={(props) => <Companies {...props} />}
          />
          <PrivateRoute
            path='/companies/:handle'
            render={(props) => (
              <Company {...props} getCurrentUser={getCurrentUser} />
            )}
          />
          <PrivateRoute
            exact
            path='/jobs'
            render={(props) => <Jobs {...props} />}
          />
          <PrivateRoute
            exact
            path='/profile'
            render={(props) => <Profile {...props} />}
          />
        </Switch>
      </div>
    );
  }
}

export default Routes;
