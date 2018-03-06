import React from 'react'
import { render } from 'react-dom'
import './index.css'
import App from './App'
import Login from './components/login/login'
import Register from './components/register/register'
import Dashboard from './components/dashboard/dashboard'
import Profile from './components/profile/profile'
import PostQuestion from './components/questions/post_question'
import DisplayQuestion from './components/questions/display_question'
import { ToastContainer } from 'react-toastify'
import { BrowserRouter, Route } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker'

render(
  <BrowserRouter>
    <div>
      <ToastContainer/>
      <Route exact path='/' component={App}/>
      <Route exact path='/login' component={Login}/>
      <Route exact path='/register' component={Register}/>
      <Route exact path='/dashboard' component={Dashboard}/>
      <Route exact path='/profile' component={Profile}/>
      <Route exact path='/questions/post' component={PostQuestion}/>
      <Route exact path='/questions/display' component={DisplayQuestion}/>
    </div>
  </BrowserRouter>,
  document.getElementById('root')
)
registerServiceWorker()
