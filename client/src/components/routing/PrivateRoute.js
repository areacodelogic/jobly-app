import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import UserContext from '../contexts/UserContext';

class PrivateRoute extends Component {
  static contextType = UserContext;

  render() {
    // this.context will be the entire currentUser object or null if we hard refresh

    if (!this.context || !this.context.username) {
      return <Redirect to='/login' />;
    }

    return (
      <Route
        exact={this.props.exact}
        path={this.props.path}
        render={this.props.render}
      />
    );
  }
}

export default PrivateRoute;
