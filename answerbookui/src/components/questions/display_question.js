import React, { Component } from 'react'
import Navbar from '../navbar/navbar'
import { Divider, Grid, GridRow, GridColumn, Icon, Item, Label, Segment } from 'semantic-ui-react'

class DisplayQuestion extends Component {

  constructor (props) {
    super(props)
    this.state = {
      hasUpvoted: false,
      hasDownvoted: false,
      score: this.props.location.state.question.score
    }
  }

  upVoteQuestion () {
    if (!this.state.hasUpvoted) {
      this.setState({
        score: this.state.score + 1,
        hasUpvoted: true,
        hasDownvoted: false
      })
    }
  }

  downVoteQuestion () {
    if (!this.state.hasDownvoted) {
      this.setState({
        score: this.state.score - 1,
        hasDownvoted: true,
        hasUpvoted: false
      })
    }
  }

  render () {
    const question = this.props.location.state.question
    return (
      <div>
        <Navbar/>
        <br/><br/>
        <Grid>
          <GridRow>
            <GridColumn vertical='true' stretched padded
                        verticalAlign='middle'
                        className="col-md-1 offset-md-1">
              <Item>
                <Icon link name='thumbs up'
                      size='large'
                      onClick={this.upVoteQuestion.bind(this)}/>
                <Item.Content>
                  <Item.Header as='h1'>
                    {this.state.score}
                  </Item.Header>
                </Item.Content>
                <Icon link name='thumbs down'
                      size='large'
                      onClick={this.downVoteQuestion.bind(this)}/>
              </Item>
            </GridColumn>
            <GridColumn className="col-md-5">
              <Item.Group>
                <Item>
                  <Item.Content>
                    <Item.Header>{question.title}</Item.Header>
                    <Divider section/>
                    <Item.Description>
                      {question.body}
                    </Item.Description>
                  </Item.Content>
                </Item>
                <Item/>
              </Item.Group>
            </GridColumn>
          </GridRow>
        </Grid>
      </div>
    )
  }
}

export default DisplayQuestion


