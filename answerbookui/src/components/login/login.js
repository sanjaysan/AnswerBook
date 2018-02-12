import React, { Component } from 'react';
import Navbar from '../navbar/navbar';
import axios from 'axios';
import { Button, Form } from 'semantic-ui-react';
import Notification from '../../services/Notification';

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
          <Form className='col-md-4'>
            <legend className='col-md-4'>Login</legend>
            <br/>
            <Form.Input name='username'
                        className='col-md-4' label='Username'
                        required
                        placeholder='Enter your username'
                        onChange={this.handleChange.bind(this)}/>
            <Form.Input name='password'
                        className='col-md-4' label='Password'
                        type='password' required
                        placeholder='Enter your password'
                        onChange={this.handleChange.bind(this)}/>
            <div className='col-md-4'>
              <Button type='submit'
                      primary
                      content='Submit'
                      onClick={this.authenticateUser.bind(this)}>
              </Button>
            </div>
          </Form>
        </div>
    );
  }

  handleChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  authenticateUser (e) {
    e.preventDefault();
    const headers = {
      headers: {'Content-Type': 'application/json'}
    };
    axios.post('/users/login', this.state, headers).then((res) => {
      if (res.data.success) {
        localStorage.setItem('id_token', String(res.data.token));
        localStorage.setItem('user', JSON.stringify(res.data.user));
        this.props.history.push('/dashboard');
        Notification.showToast('You are now logged in', 'success');
      } else {
        Notification.showToast(res.data.msg, 'error');
      }
    }).catch((err) => {
      console.error(err);
      Notification.showToast('Oh Oh, something has gone wrong', 'error');
      return false;
    })
  }
}

export default Login;
