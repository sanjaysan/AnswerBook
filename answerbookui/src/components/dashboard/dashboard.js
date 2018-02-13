import React, { Component } from 'react'
import Navbar from '../navbar/navbar'
import axios from 'axios'
import { List, Button } from 'semantic-ui-react'
import ValidateUserAuthentication from '../../services/ValidateUserAuthentication'

class Dashboard extends Component {
  constructor () {
    super()
    this.state = {
      username: '',
      password: '',
      dashboardData: []
    }
  };

  componentWillMount () {
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('id_token')
      }
    }
    axios.get('/users/dashboard', headers).then((res) => {
      this.setState({
        dashboardData: res.data
      })
    }).catch((err) => {
      console.log(err)
    })
  }

  render () {
    const isLoggedIn = ValidateUserAuthentication.isUserLoggedIn()
    return (
      <div>
        {
          isLoggedIn ? (<div>
            <Navbar/>
            <br/>

            <div className="col-md-6 offset-md-10">
              <Button primary onClick={this.askQuestion.bind(this)}>Ask a
                Question</Button>
            </div>

            <div className="col-md-4">
              <h2 className="page-header">Dashboard</h2>
              <br/>

              {this.state.dashboardData.map((question, i) => (
                <List key={i}>
                  <List.Item>
                    <List.Content>
                      <List.Header as='a'>Varun
                        asked {question.question_body}</List.Header>
                      <List.Description>
                        {question.answers.map((answers, i) => (
                          <List.List key={i}>
                            <List.Item>
                              <List.Content>
                                <List.Header>Shivanee</List.Header>
                                <List.Description>
                                  {answers.answer_body}
                                </List.Description>
                              </List.Content>
                            </List.Item>
                          </List.List>
                        ))}
                      </List.Description>
                    </List.Content>
                  </List.Item>
                </List>
              ))}

            </div>
          </div>) : this.props.history.push('/login')
        }
      </div>
    )
  }

  askQuestion () {
    this.props.history.push('/questions/post')
  }
}

export default Dashboard