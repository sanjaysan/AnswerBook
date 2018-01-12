import React, { Component } from 'react';
import './App.css';
import Notifications from 'react-notify-toast';
import Navbar from './components/navbar/navbar';
import { Link } from 'react-router-dom';

class App extends Component {
  render () {
    return (
        <div className="App">
          <Notifications/>
          <Navbar/>
          <div className="jumbotron text-center">
            <h1 className="display-3">Answer Book</h1>
            <p className="lead">Welcome to AnswerBook - the answer to all your
              questions</p>
            <div>
              <Link className="btn btn-primary" to="/register">Register</Link>
              &nbsp;
              <Link className="btn btn-secondary" to="/login">Login</Link>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <h3>Forum</h3>
              <p>Question & Answer forum for Organizations to increase
                productivity</p>
            </div>
            <div className="col-md-4">
              <h3>Personalized editor</h3>
              <p>Provide your code fragments in CoderPad and forget about
                formatting issues</p>
            </div>
            <div className="col-md-4">
              <h3>Private chat</h3>
              <p>Schedule a private chat with the answerer to get more insight
                into the solution</p>
            </div>
          </div>
        </div>
    );
  }
}

export default App;
