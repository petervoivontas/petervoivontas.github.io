import React from 'react';
import $ from 'jquery';

import {
    auth,
    provider
} from '../firebase/firebase';

import * as authHelpers from '../firebase/auth';

import googleIcon from '../icons/google-icon.png';
import twitterIcon from '../icons/twitter-icon.png';

import * as routes from '../constants/routes';

import '../styles/AuthButtons.css';

export class AuthButtons extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            buttonText: '',
            buttonClassName: '',
            username: '',
            email: '',
            passwordOne: '',
            passwordTwo: '',
            password: '',
            user: null
        }
        this.handleEmailSignup = this.handleEmailSignup.bind(this);
        this.handleEmailLogin = this.handleEmailLogin.bind(this);
        this.handleGoogleSignup = this.handleGoogleSignup.bind(this);
    }

    componentDidMount () {
        if (this.props.page === 'signup') {
            const username = $('.username').val().trim();
            const email = $('.email').val().trim();
            const passwordOne = $('.passwordOne').val().trim();
            const passwordTwo = $('.passwordTwo').val().trim();

            this.setState({
                username: username,
                email: email,
                passwordOne: passwordOne,
                passwordTwo: passwordTwo
            });
        } else {
            const email = $('.email').val().trim();
            const password = $('.password').val().trim();

            this.setState({
                email: email,
                password: password
            });
        }

        // auth.onAuthStateChanged(user => {
        //     if (user) {
        //         this.setState({
        //             user: user
        //         });
        //     }
        // })
    }

    handleEmailSignup (event) {
        const {
            history
        } = this.props;
        const username = $('.username').val().trim();
        const email = $('.email').val().trim();
        const passwordOne = $('.passwordOne').val().trim();
        const passwordTwo = $('.passwordTwo').val().trim();

        if (passwordOne === passwordTwo) {
            authHelpers.signup(username, email, passwordOne);
            history.push(routes.HOME);
            event.preventDefault();
        } else {
            console.log('Passwords do not match');
        }
    }

    handleGoogleSignup (event) {
        const {
            history
        } = this.props;
        auth.signInWithPopup(provider)
            .then(result => {
                const user = result.user;
                console.log(user);
                window.localStorage.setItem('username', user.displayName);
                history.push(routes.HOME);
            });

        event.preventDefault();
    }

    handleEmailLogin (event) {
        const email = $('.email').val().trim();
        const password = $('.password').val().trim();
        authHelpers.signIn(email, password);

        event.preventDefault();
    }

    render () {
        // const username = $('.username').val().trim();
        // const email = $('.email').val().trim();
        // const passwordOne = $('.passwordOne').val().trim();
        // const passwordTwo = $('.passwordTwo').val().trim();

        // const isInvalid = username === '' || email === '' || passwordOne === '' || passwordTwo === '';

        return (
            <div className='authButtons'>
                <img className='googleAuth' src={googleIcon} alt='Google Auth' onClick={this.handleGoogleSignup}/>
                <img className='twitterAuth' src={twitterIcon} alt='Twitter Auth'/>
                {this.props.page === 'signup' ?
                    <button className='signupSubmit' type='submit' onClick={this.handleEmailSignup}>Sign Up</button>
                    :
                    <button className='loginSubmit' type='submit' onClick={this.handleEmailLogin}>Log In</button>
                }
            </div>
        )
    }
}