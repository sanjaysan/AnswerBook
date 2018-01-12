import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Navbar from '../navbar/navbar';
import Notifications, { notify } from 'react-notify-toast';
import axios from 'axios';

class Register extends Component {
  constructor () {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: ''
    };
  };

  render () {
    return (
        <div>
          <Navbar/>
          <br/><br/>
          <Notifications/>
          <form>
            <fieldset>
              <legend className="col-md-4">Register</legend>
              <br/>
              <div className="form-group col-md-4">
                <label>First Name</label>
                <input type="text" ref="firstName" className="form-control"
                       required placeholder="Enter your first name"/>
              </div>
              <div className="form-group col-md-4">
                <label>Last Name</label>
                <input type="text" ref="lastName" className="form-control"
                       placeholder="Enter your last name"/>
              </div>
              <div className="form-group col-md-4">
                <label>Email</label>
                <input type="email" ref="email" className="form-control"
                       required placeholder="Enter your Email ID"/>
              </div>
              <div className="form-group col-md-4">
                <label>Username</label>
                <input type="text" ref="username" className="form-control"
                       required placeholder="Enter your username"/>
              </div>
              <div className="form-group col-md-4">
                <label>Password</label>
                <input type="password" ref="password" className="form-control"
                       required placeholder="Enter your password"/>
                <small className="form-text text-muted"> Password should be
                  between 6-12 characters and should include at least one upper
                  case letter, one lower case letter and one special character
                </small>
              </div>
              <div className="form-group col-md-4">
                <input type="submit" className="btn btn-primary"
                       value="Submit"
                       onClick={this.performValidations.bind(this)}/>
              </div>
            </fieldset>
          </form>
        </div>
    );
  }

  performValidations (e) {
    e.preventDefault();
    this.setState({
      firstName: this.refs.firstName.value,
      lastName: this.refs.lastName.value,
      email: this.refs.email.value,
      username: this.refs.username.value,
      password: this.refs.password.value
    }, () => {
      if (!this.validateRegister()) {
        notify.show('Please fill in all fields', 'error', 3000, 'red');
        return false;
      }

      if (!this.validateEmail(this.state.email)) {
        notify.show('Please enter a valid email!', 'error', 3000, 'red');
        return false;
      }

      const headers = {
        headers: {'Content-Type': 'application/json'}
      };
      axios.post('/users/register', this.state, headers).then((res) => {
        this.props.history.push('/login');
        notify.show('You are now registered and can log in', 'success', 3000, 'green');
      }).catch((err) => {
        console.error(err);
        notify.show('Oh Oh, something has gone wrong', 'error', 3000, 'red');
      })
    });
  }

  validateRegister () {
    const user = this.state;
    return !(!user.firstName || !user.email || !user.username ||
        !user.password);
  }

  validateEmail (email) {
    const re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
  }
}

Register.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
  username: PropTypes.string,
  password: PropTypes.string
};

export default Register;
