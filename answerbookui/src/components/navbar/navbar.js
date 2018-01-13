import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Notifications, { notify } from 'react-notify-toast';
import { Redirect } from 'react-router-dom';
import ValidateUserAuthentication from '../../services/ValidateUserAuthentication';

class Navbar extends Component {

  constructor (props) {
    super(props);
    this.state = {
      isLoggedOut: false
    }
  }

  render () {
    const isLoggedIn = ValidateUserAuthentication.isUserLoggedIn();
    return <div>
      <Notifications/>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <Link className="navbar-brand" to="/">AnswerBook</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse"
                data-target="#navbarColor01" aria-controls="navbarColor01"
                aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"/>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/"
                    activeclassname="active">HOME</Link>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            {
              isLoggedIn &&
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard"
                      activeclassname="active">DASHBOARD</Link>
              </li>
            }

            {
              isLoggedIn &&
              <li className="nav-item">
                <Link className="nav-link" to='/profile'
                      activeclassname="active">PROFILE</Link>
              </li>}

            {
              !isLoggedIn &&
              <li className="nav-item">
                <Link className="nav-link" to="/login"
                      activeclassname="active">LOGIN</Link>
              </li>}

            {
              !isLoggedIn &&
              <li className="nav-item">
                <Link className="nav-link" to="/register"
                      activeclassname="active">REGISTER</Link>
              </li>
            }

            {
              isLoggedIn &&
              <li className="nav-item">
                <Link className="nav-link" to="#"
                      onClick={this.handleLogout.bind(this)}>LOGOUT</Link>
              </li>
            }

          </ul>
        </div>
      </nav>
      {this.state.isLoggedOut && (<Redirect to='/login'/>)}
    </div>;
  }

  handleLogout () {
    localStorage.clear();
    this.setState({
      isLoggedOut: true
    }, () => {
      notify.show('You are logged out', 'success', 3000, 'green');
    });
  }
}

export default Navbar;