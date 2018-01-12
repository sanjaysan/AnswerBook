import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './App';
import Login from './components/login/login';
import Register from './components/register/register';
import Dashboard from './components/dashboard/dashboard';
import Profile from './components/profile/profile';
import { BrowserRouter, Route } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

render(
    <BrowserRouter>
      <div>
          <Route exact path='/' component={App}/>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/register' component={Register}/>
          <Route exact path='/dashboard' component={Dashboard}/>
          <Route exact path='/profile' component={Profile}/>
      </div>
    </BrowserRouter>,
    document.getElementById('root')
);
registerServiceWorker();
