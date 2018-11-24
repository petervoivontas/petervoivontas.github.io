import React from 'react';

import { Header } from './Header';
import { AuthButtons } from './AuthButtons';

import '../styles/Signup.css';

export class SignupPage extends React.Component {
    render () {
        return (
            <div>
                <Header page='signup' />
                <div className='signupPage'>
                    <p>Your opinion matters</p>
                    <hr />
                    <p>Sign up to Nuntium</p>
                    <SignupForm history={this.props.history}/>
                </div>
            </div>
        )
    }
}

class SignupForm extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            passwordOne: '',
            passwordTwo: '',
            user: null
        }
    }

    render () {
        const {
            username,
            email,
            passwordOne,
            passwordTwo
        } = this.state;

        return (
            <form onSubmit={this.handleEmailSignup} className='signupForm'>
                <input
                    className='username'
                    value={username}
                    placeholder='Your name'
                    type='text'
                    onChange={event => this.setState({username: event.target.value})}
                />
                <input
                    className='email'
                    value={email}
                    placeholder='Email address'
                    type='email'
                    onChange={event => this.setState({email: event.target.value})}
                />
                <input
                    className='passwordOne'
                    value={passwordOne}
                    placeholder='Password'
                    type='password'
                    onChange={event => this.setState({passwordOne: event.target.value})}
                />
                <input
                    className='passwordTwo'
                    value={passwordTwo}
                    placeholder='Confirm password'
                    type='password'
                    onChange={event => this.setState({passwordTwo: event.target.value})}
                />
                <AuthButtons page='signup' history={this.props.history}/>
            </form>
        )
    }
}
