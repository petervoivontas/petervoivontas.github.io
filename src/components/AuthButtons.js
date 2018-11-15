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
import { withCookies } from 'react-cookie';

class AuthButtons extends React.Component {
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
        this.handleGoogleSignup = this.handleGoogleSignup.bind(this);
    }

    componentWillMount () {
        if (this.props.page === 'signup') {
            this.setState({
                buttonText: 'Sign Up',
                buttonClassName: 'signupSubmit'
            });
        } else {
            this.setState({
                buttonText: 'Log In',
                buttonClassName: 'loginSubmit'
            });
        }
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
        // const username = $('.username').val().trim();
        const email = $('.email').val().trim();
        const passwordOne = $('.passwordOne').val().trim();
        const passwordTwo = $('.passwordTwo').val().trim();

        if (passwordOne === passwordTwo) {
            authHelpers.signup(email, passwordOne).then(authUser => {
                    console.log(authUser);
                    this.setState({
                        user: authUser
                    });
                }).catch(error => {
                    console.log(error);
                });

            event.preventDefault();
        } else {
            console.log('Passwords do not match');
        }
    }

    handleGoogleSignup (event) {
        const {
            cookies,
            history
        } = this.props;
        auth.signInWithPopup(provider)
            .then(result => {
                const user = result.user;
                console.log(user);
                const date = new Date();
                const expirationDate = new Date(date.getFullYear() + 10, date.getMonth(), date.getDay());
                console.log(`The cookies expiration date is ${expirationDate}`);
                cookies.set('name', user.displayName, {
                    path: routes.HOME,
                    expires: expirationDate
                });
                history.push(routes.HOME);
            });

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
                <button className={this.state.buttonClassName} type='submit'>{this.state.buttonText}</button>
            </div>
        )
    }
}

export default withCookies(AuthButtons);