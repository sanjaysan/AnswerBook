import axios from 'axios'
import React, { Component } from 'react'
import Navbar from '../navbar/navbar'
import { Button, Form } from 'semantic-ui-react'
import Notification from '../../services/Notification'
import ValidateUserAuthentication from '../../services/ValidateUserAuthentication'

class PostQuestion extends Component {

  state = {
    availableTags: [],
    currentValue: [],
    question: {},
    showQuestion: false
  }

  headers = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('id_token')
    }
  }

  componentWillMount () {
    axios.get('/tags', this.headers).then(tags => {
      this.state.availableTags.push(...tags.data)
    }).catch(err => {
      console.log(err.message)
    })
  }

  validateFields () {
    const state = this.state
    return !(!state.body || !state.title || state.currentValue.length === 0)
  }

  postQuestion (e) {
    e.preventDefault()
    if (!this.validateFields()) {
      Notification.showToast('Please fill in all fields', 'error')
      return false
    }

    const question = {
      title: this.state.title,
      body: this.state.body,
      tags: this.state.currentValue
    }

    const userId = JSON.parse(localStorage.getItem('user')).id
    axios.post('/users/' + userId + '/questions', question, this.headers).then((res) => {
      this.props.history.push({
        pathname: '/questions/display',
        state: {
          question: Object.assign({}, res.data.questionDetails),
          msg: res.data.msg
        }
      })
      Notification.showToast(res.data.msg, 'success')
    }).catch((err) => {
      Notification.showToast(err.message, 'error')
    })
  }

  handleChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleDropDownChange (e, {value}) {
    this.setState({
      currentValue: value
    })
  }

  handleTagAddition (e, {value}) {
    let isTagPresent = this.state.availableTags.find(tag => {
      return tag.key === value
    })

    if (!isTagPresent) {
      this.setState({
        availableTags: [...this.state.availableTags, {key: value, value: value, text: value}]
      })
    }
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
                               required multiple search selection
                               allowAdditions
                               placeholder='Enter at least one tag'
                               value={this.state.currentValue}
                               options={this.state.availableTags}
                               onAddItem={this.handleTagAddition.bind(this)}
                               onChange={this.handleDropDownChange.bind(this)}/>
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

export default PostQuestion
