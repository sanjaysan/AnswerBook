import axios from 'axios'
import React, { Component } from 'react'
import Navbar from '../navbar/navbar'
import { Button, Form } from 'semantic-ui-react'
import Notification from '../../services/Notification'
import { AvailableTags } from '../../data/AvailableTags'
import ValidateUserAuthentication from '../../services/ValidateUserAuthentication'

class Questions extends Component {

  validateFields () {
    const state = this.state
    return !(!state.body || !state.title)
  }

  postQuestion (e) {
    e.preventDefault()
    if (!this.validateFields()) {
      Notification.showToast('Please fill in all fields', 'error')
      return false
    }

    const headers = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('id_token')
      }
    }

    const userId = JSON.parse(localStorage.getItem('user')).id
    axios.post('/users/' + userId + '/questions', this.state, headers).then((res) => {
      Notification.showToast(res.data.msg, 'success')
    }).catch((err) => {
      Notification.showToast(err.message, 'error')
    })
    this.props.history.goBack()
  }

  handleChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleTagAddition(e) {
    AvailableTags.push({key: e.target.value, value: e.target.value, text: e.target.value})
  }

  render () {
    const isLoggedIn = ValidateUserAuthentication.isUserLoggedIn()
    return (
      <div>
        {
          isLoggedIn ? (
            <div>
              <Navbar/>
              <br/><br/>
              <Form className='col-md-4'>
                <legend className='col-md-4'>Post a question</legend>
                <br/>
                <Form.Input name='title'
                            className='col-md-4' label='Title'
                            required
                            placeholder='Enter the title'
                            onChange={this.handleChange.bind(this)}/>
                <Form.TextArea name='body'
                               className='col-md-4'
                               required
                               label='Question'
                               placeholder='Enter your question'
                               onChange={this.handleChange.bind(this)}/>
                <Form.Dropdown name="tags"
                               className="col-md-4" label="Tags"
                               multiple search selection
                               allowAdditions
                               placeholder='Enter at least one tag'
                               options={AvailableTags}
                               onAddItem={this.handleTagAddition}
                               onChange={this.handleChange.bind(this)}/>
                <div className='col-md-4'>
                  <Button type='submit'
                          primary
                          content='Submit'
                          onClick={this.postQuestion.bind(this)}>
                  </Button>
                </div>
              </Form>
            </div>) : this.props.history.push('/login')
        }
      </div>
    )
  }
}

export default Questions
