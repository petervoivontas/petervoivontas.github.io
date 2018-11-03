import React from 'react';
import {
    auth,
    provider
} from '../firebase/firebase';
import * as authHelpers from '../firebase/auth';

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
                    <SignupForm />
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
        this.handleEmailSignup = this.handleEmailSignup.bind(this);
        this.handleGoogleSignup = this.handleGoogleSignup.bind(this);
    }

    componentDidMount () {
        auth.onAuthStateChanged(user => {
            if (user) {
                this.setState({
                    user: user
                });
            }
        })
    }

    handleEmailSignup (event) {
        const {
            email,
            passwordOne
        } = this.state;

        authHelpers.signup(email, passwordOne)
            .then(authUser => {
                console.log(authUser);
            })
            .catch(error => {
                console.log(error);
            });

        event.preventDefault();
    }

    handleGoogleSignup (event) {
        auth.signInWithPopup(provider)
            .then(result => {
                const user = result.user;
                this.setState({
                    user: user
                });
            });

        event.preventDefault();
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
                <AuthButtons page='signup'/>
            </form>
        )
    }
}
