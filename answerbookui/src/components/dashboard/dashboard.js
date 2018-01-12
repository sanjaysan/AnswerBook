import React, { Component } from 'react';
import Navbar from '../navbar/navbar';
import Notifications from 'react-notify-toast';
import ValidateUserAuthentication from '../../services/ValidateUserAuthentication';

class Dashboard extends Component {
  constructor () {
    super();
    this.state = {
      username: '',
      password: '',
      isAuthenticated: false
    };
  };

  render () {
    const isLoggedIn = ValidateUserAuthentication.isUserLoggedIn();
    return (
        <div>
          {
            isLoggedIn ? <div>
              <Navbar/>
              <br/><br/>
              <Notifications/>
              <div className="col-md-5">
                <h2 className="page-header">Dashboard</h2>
                <br/>
                <p>Welcome to your Dashboard. Provide and get answers to
                  interesting questions</p>
              </div>
            </div> : this.props.history.push('/login')
          }
        </div>
    );
  }
}

export default Dashboard;