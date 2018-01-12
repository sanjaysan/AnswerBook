import axios from 'axios/index';
import React, { Component } from 'react';
import Navbar from '../navbar/navbar';
import Notifications from 'react-notify-toast';
import ValidateUserAuthentication from '../../services/ValidateUserAuthentication';

class Profile extends Component {

  constructor () {
    super();
    this.state = {
      user: null
    }
  }

  componentDidMount () {
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('id_token')
      }
    };
    axios.get('/users/profile', headers).then((res) => {
      this.setState({
        user: res.data.user
      })
    }).catch((err) => {
      console.error(err);
    });
  }

  render () {
    const isLoggedIn = ValidateUserAuthentication.isUserLoggedIn();
    return (
        <div>
          {
            isLoggedIn ? (
                this.state.user ? <div>
                  <Navbar/>
                  <br/><br/>
                  <Notifications/>
                  <div className='col-md-4'>
                    First Name:{this.state.user.firstName}
                    <br/>
                    Last Name: {this.state.user.lastName}
                    <br/>
                    Email: {this.state.user.email}
                  </div>
                </div> : <div>
                  <Navbar/>
                  <br/><br/>
                  <Notifications/>
                </div>
            ) : this.props.history.push('/login')
          }
        </div>
    );
  }
}

export default Profile;