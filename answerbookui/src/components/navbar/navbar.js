import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import ValidateUserAuthentication from '../../services/ValidateUserAuthentication';

class Navbar extends Component {

  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  state = {
    activeItem: '',
    isLoggedOut: false
  };

  handleItemClick = (e, {name}) => {
    if (name === 'logout') {
      localStorage.clear();
      this.setState({
        isLoggedOut: true
      }, () => {
        this.props.history.push('/login');
      });
    } else {
      if (name === 'home' || name === 'answerbook') name = '/';
      this.setState({activeItem: name});
      this.props.history.push(name);
    }
  };

  render () {
    const isLoggedIn = ValidateUserAuthentication.isUserLoggedIn();
    const activeItem = this.state.activeItem;
    return (
        <div>
          <Menu inverted>
            <Menu.Item name='answerbook' className={'navbar-brand'}
                       onClick={this.handleItemClick}>
              AnswerBook
            </Menu.Item>
            <Menu.Item name='home' active={activeItem === 'home'}
                       onClick={this.handleItemClick}/>
            {
              isLoggedIn &&
              <Menu.Item position='right' name='dashboard'
                         active={activeItem === 'dashboard'}
                         onClick={this.handleItemClick}/>
            }
            {
              isLoggedIn &&
              <Menu.Item name='profile' active={activeItem === 'profile'}
                         onClick={this.handleItemClick}/>
            }
            {
              !isLoggedIn &&
              <Menu.Item name='login' position='right'
                         active={activeItem === 'login'}
                         onClick={this.handleItemClick}/>
            }
            {
              !isLoggedIn &&
              <Menu.Item name='register' active={activeItem ===
              'register'} onClick={this.handleItemClick}/>
            }
            {
              isLoggedIn &&
              <Menu.Item name='logout' active={activeItem === 'logout'}
                         onClick={this.handleItemClick}/>
            }
          </Menu>
          <ToastContainer autoClose={3000}/>
        </div>
    );
  }
}

export default withRouter(Navbar);