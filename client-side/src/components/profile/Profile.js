import React, { Component } from 'react';
import JoblyApi from '../../search/JoblyApi';
import UserContext from '../contexts/UserContext';
import './Profile.css';

class Profile extends Component {
  static contextType = UserContext;
  constructor(props, context) {
    super(props);
    let user = context;
    this.state = {
      first_name: user.first_name || '',
      last_name: user.last_name || '',
      email: user.email || '',
      photo_url: user.photo_url || '',
      username: user.username || '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  async handleSubmit(evt) {
    evt.preventDefault();

    try {
      let profileData = {
        first_name: this.state.first_name || undefined,
        last_name: this.last_name || undefined,
        email: this.state.email || undefined,
        photo_url: this.state.photo_url || undefined,
        password: this.state.password,
      };

      await JoblyApi.saveProfile(this.state.username, profileData);

      this.setState({ password: '' }, () => alert('User details have updated'));
    } catch (err) {
      alert('Error occured');
      console.log(err);
    }
  }

  render() {
    return (
      <div className='col-md-6 col-lg-4 offset-md-3 offset-lg-4 pt-5'>
        <h3>Profile</h3>
        <div className='Profile card'>
          <div className=' card-body'>
            <form onSubmit={this.handleSubmit}>
              <div className='form-group'>
                <lable>Username</lable>
                <p className='form-control-plaintext'>{this.state.username}</p>
              </div>
              <div className='form-group'>
                <lable>First Name</lable>
                <input
                  name='first_name'
                  className='form-control'
                  value={this.state.first_name}
                  onChange={this.handleChange}
                />
              </div>
              <div className='form-group'>
                <lable>Last Name</lable>
                <input
                  name='last_name'
                  className='form-control'
                  value={this.state.last_name}
                  onChange={this.handleChange}
                />
              </div>
              <div className='form-group'>
                <lable>Email</lable>
                <input
                  name='email'
                  className='form-control'
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </div>
              <div className='form-group'>
                <lable>Photo URL</lable>
                <input
                  name='photo_url'
                  className='form-control'
                  value={this.state.photo_url}
                  onChange={this.handleChange}
                />
              </div>
              <div className='form-group'>
                <lable>Update Password(leave empty to keep current)</lable>
                <input
                  type='password'
                  name='password'
                  className='form-control'
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </div>
              <button className='btn btn-primary btn-block mt-4' type='submit'>
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
