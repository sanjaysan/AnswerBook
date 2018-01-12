import React, { Component } from 'react';
import Navbar from '../navbar/navbar';
import axios from 'axios';
import Notifications, { notify } from 'react-notify-toast';

class Login extends Component {
  constructor () {
    super();
    this.state = {
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
              <legend className="col-md-4">Login</legend>
              <div className="form-group col-md-4">
                <label>Username</label>
                <input type="text" ref="username" className="form-control"/>
              </div>
              <div className="form-group col-md-4">
                <label>Password</label>
                <input type="password" ref="password" className="form-control"/>
              </div>
              <div className="form-group col-md-4">
                <input type="submit" className="btn btn-primary" value="Login"
                       onClick={this.authenticateUser.bind(this)}/>
              </div>
            </fieldset>
          </form>
        </div>
    );
  }

  authenticateUser (e) {
    e.preventDefault();
    this.setState({
      username: this.refs.username.value,
      password: this.refs.password.value
    },() => {
      const headers = {
        headers: {'Content-Type': 'application/json'}
      };
      axios.post('/users/authenticate', this.state, headers).then((res) => {
        if (res.data.success) {
          localStorage.setItem('id_token', res.data.token);
          localStorage.setItem('user', JSON.stringify(res.data.user));
          this.props.history.push('/dashboard');
          notify.show('You are now logged in', 'success', 3000, 'green');
        } else {
          notify.show(res.data.msg, 'error', 3000, 'red');
        }}).catch((err) => {
          console.error(err);
          notify.show('Oh Oh, something has gone wrong', 'error', 3000, 'red');
          return false;
      })
    });
  }
}

export default Login;
