import axios from 'axios/index';
import React, { Component } from 'react';
import Navbar from '../navbar/navbar';
import Notifications from 'react-notify-toast';
import ValidateUserAuthentication from '../../services/ValidateUserAuthentication';
import { Button, Form } from 'semantic-ui-react';
import { ToastContainer, toast } from 'react-toastify';

class Questions extends Component {
    constructor() {
        super();

        };

    handleChange(e){

        this.setState({
            [e.target.name]: e.target.value

        })
    }

    validateFields(){

        const state = this.state;
        return !(!state.body || !state.title || !state.tags)
    }
    postQuestion(e){
        e.preventDefault();
         if(!this.validateFields())
        {
            toast.error('Fill all the required fields',{
                position: toast.POSITION.TOP_CENTER
            });
            return false;
        }

         const headers = {
             headers: {'Content-Type' : 'application/json'}
         };
        const userInfo = localStorage.getItem('user');
         const userObject= JSON.parse(userInfo);
         const userId = userObject.id;
         const url ='/users/' + userId +'/questions';
         axios.post(url,  this.state, headers ).then ((res) => {
             toast.success('Posted',{
                 position: toast.POSITION.TOP_CENTER
             });
         }).catch((err) => {

             toast.error('Error',{
                 position: toast.POSITION.TOP_CENTER
             });
         })

        this.props.history.goBack();


    }
    render() {
        const isLoggedIn = ValidateUserAuthentication.isUserLoggedIn();
        return(

        <div>
            <Navbar/>
            <br/><br/>
            <ToastContainer autoClose={3000}/>
            <Form className='col-md-4'>
                <legend className='col-md-4'>Post a question</legend>
                <br/>
                <Form.Input name='title'
                            className='col-md-4' label='Title'
                            required
                            placeholder='Enter the title'
                            onChange={this.handleChange.bind(this)}/>
                <Form.Input name='body'
                            className='col-md-4' label='Question'
                            required
                            placeholder='Enter your question'
                            onChange={this.handleChange.bind(this)}/>
                <Form.Input name='tags'
                            className='col-md-4' label='Tags'
                            required
                            placeholder='Enter atleast one tag'
                            onChange={this.handleChange.bind(this)}/>
                <div className='col-md-4'>
                    <Button type='submit'
                            primary
                            content='Submit'
                            onClick={this.postQuestion.bind(this)}>
                    </Button>
                </div>
            </Form>
        </div>
    );
        }

}
export default Questions;
