import PropTypes from 'prop-types';
import React, { Component } from 'react';
import './App.css';
import Navbar from './components/navbar/navbar';
import { withRouter } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import ValidateUserAuthentication from './services/ValidateUserAuthentication';

class App extends Component {

  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  handleClick = (e, {name}) => {
    this.props.history.push(name);
  };

  render () {
    const isLoggedIn = ValidateUserAuthentication.isUserLoggedIn();
    return (
        <div className="App">
          <Navbar/>
          <div className="jumbotron text-center">
            <h1 className="display-3">Answer Book</h1>
            <p className="lead">Welcome to AnswerBook - the answer to all your
              questions</p>
            <div>
              {
                !isLoggedIn &&
                <Button name='register' content='Register' primary
                        onClick={this.handleClick}/>
              }
              &nbsp;
              {
                !isLoggedIn &&
                <Button name='login' content='Login' secondary
                        onClick={this.handleClick}/>
              }
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

export default withRouter(App);
