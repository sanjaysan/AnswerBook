import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Navbar from '../navbar/navbar';
import { Button, Form } from 'semantic-ui-react';
import { ToastContainer, toast } from 'react-toastify';
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
         <ToastContainer autoClose={3000}/>
          <Form className='col-md-4'>
            <legend className='col-md-4'>Register</legend>
            <br/>
            <Form.Input name='firstName'
                        className='col-md-4' label='First Name'
                        required
                        placeholder='Enter your first name'
                        onChange={this.handleChange.bind(this)}/>
            <Form.Input name='lastName'
                        className='col-md-4' label='Last Name'
                        placeholder='Enter your last name'
                        onChange={this.handleChange.bind(this)}/>
            <Form.Input name='email'
                        className='col-md-4' label='Email'
                        type='email' required
                        placeholder='Enter your Email ID'
                        onChange={this.handleChange.bind(this)}/>
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
                      onClick={this.performValidations.bind(this)}>
              </Button>
            </div>
          </Form>
        </div>
    );
  }

  handleChange (e, {name}) {
    this.setState({
      [name]: e.target.value
    })
  }

  performValidations (e) {
    e.preventDefault();
    if (!this.validateRegister()) {
      toast.error('Please fill in all fields', {

      });
      return false;
    }

    if (!this.validateEmail(this.state.email)) {
      toast.error('Please enter a valid email!', {
        position: toast.POSITION.TOP_CENTER
      });
      return false;
    }

    const headers = {
      headers: {'Content-Type': 'application/json'}
    };
    axios.post('/users/register', this.state, headers).then((res) => {
      this.props.history.push('/login');
      toast.success('You are now registered and can log in', {
        position: toast.POSITION.TOP_CENTER
      });
    }).catch((err) => {
      console.error(err);
      toast.error('Oh Oh, something has gone wrong', {
        position: toast.POSITION.TOP_CENTER
      });
    })
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

