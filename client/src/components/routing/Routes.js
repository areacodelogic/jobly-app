import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Homepage from '../layout/Homepage';
import Login from '../auth/Login';
import Jobs from '../job/Jobs';
import Company from '../company/Company';
import Companies from '../company/Companies';
import Profile from '../profile/Profile';

class Routes extends Component {
  render() {
    return (
      <div className='Routes pt-5'>
        <Switch>
          <Route
            exact
            path='/'
            render={(props) => (
              <Homepage currentUser={this.props.currentUser} {...props} />
            )}
          />
          <Route
            exact
            path='/login'
            render={(props) => (
              <Login {...props} getCurrentUser={this.props.getCurrentUser} />
            )}
          />
          <Route
            exact
            path='/companies'
            render={(props) => <Companies {...props} />}
          />
          <Route
            exact
            path='/companies/:handle'
            render={(props) => <Company {...props} />}
          />
          <Route exact path='/jobs' render={(props) => <Jobs {...props} />} />
          <Route
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
