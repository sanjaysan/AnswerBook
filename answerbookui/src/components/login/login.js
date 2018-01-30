import React, { Component } from 'react';
import Navbar from '../navbar/navbar';
import axios from 'axios';
// import Notifications, { notify } from 'react-notify-toast';
import { Button, Form } from 'semantic-ui-react';
import { ToastContainer, toast } from 'react-toastify';

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
          {/*<Notifications/>*/}
          <ToastContainer autoClose={3000}/>
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

  handleChange (e, {name, value}) {
    this.setState({
      [name]: value
    })
  }

  authenticateUser (e) {
    e.preventDefault();
    const headers = {
      headers: {'Content-Type': 'application/json'}
    };
    axios.post('/users/authenticate', this.state, headers).then((res) => {
      if (res.data.success) {
        localStorage.setItem('id_token', String(res.data.token));
        localStorage.setItem('user', JSON.stringify(res.data.user));
        this.props.history.push('/dashboard');
        toast.success('You are now logged in', {
          position: toast.POSITION.TOP_CENTER
        });
        // notify.show('You are now logged in', 'success', 3000, 'green');
      } else {
        // notify.show(res.data.msg, 'error', 3000, 'red');
        toast.error(res.data.msg, {
          position: toast.POSITION.TOP_CENTER
        });
      }
    }).catch((err) => {
      console.error(err);
      // notify.show('Oh Oh, something has gone wrong', 'error', 3000, 'red');
      toast.error('Oh Oh, something has gone wrong', {
        position: toast.POSITION.TOP_CENTER
      });
      return false;
    })
  }
}

export default Login;
