import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Navbar from '../navbar/navbar';
import { Button, Form, TextArea } from 'semantic-ui-react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';


class Question extends Component {
    constructor () {
        super();
        this.state = {
            title: '',
            body: ''
        };
    };

    render() {

        return(

            <div>
                <Navbar/>
                <br/><br/>
                <ToastContainer autoClose={3000}/>
                <legend className='col-md-4'>Ask a Question!</legend>
                <Form>
                    <TextArea className='col-md-4' label = 'Title' autoHeight required placeholder='Enter Question Title'/>
                    <TextArea className='col-md-4' label = 'Body' autoHeight required placeholder='Enter Question Body'/>
                    <div className='col-md-4'>
                        <Button type='submit'
                                primary
                                content='Submit'
                                onClick={this.performQuestionValidations.bind(this)}>
                        </Button>
                    </div>
                </Form>
            </div>

        );
    }

    performQuestionValidations (e) {
        e.preventDefault();
        if (!this.validateQuestion()) {
            toast.error('Please fill in all fields', {});
            return false;
        }
        const userDetails = localStorage.getItem('user')
        const headers = {
            headers: {'Content-Type': 'application/json'}
        };

        axios.post('/users/' + userDetails.id + '/questions', headers).then((res) => {
            toast.success('Question Posted', {
                position: toast.POSITION.TOP_CENTER
            });
            this.props.history.push('/dashboard');
        }).catch((err) => {
            console.error(err);
            toast.error('Oh Oh, something has gone wrong', {
                position: toast.POSITION.TOP_CENTER
            });
        })
    }

    validateQuestion () {

        const question = this.state;
        return !(!question.Title || !question.Body);
    }
}

Question.propTypes = {
    Title: PropTypes.string,
    Body: PropTypes.string
};

export default Question;
