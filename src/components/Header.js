import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import {
    Link
} from 'react-router-dom';

import { Home } from './Home';
import { SignupPage } from './SignupPage';
import { LoginPage } from './LoginPage';

import logo from '../icons/logo.png';
import searchicon from '../icons/searchicon.png';

import '../styles/Header.css';
import * as routes from '../constants/routes';

export class Header extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            buttonText: '',
            className: '',
            link: null,
            searchIconClassName: ''
        }
        this.handleLogoClick = this.handleLogoClick.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
    }

    componentWillMount () {
        if (this.props.auth === true) {
            this.setState({
                searchIconClassName: 'searchIconAuth'
            })
        } else {
            this.setState({
                searchIconClassName: 'searchIconNonAuth'
            })
        }
        if (this.props.page === 'signup') {
            this.setState({
                buttonText: 'Log In',
                className: 'loginButton',
                link: routes.LOGIN
            });
        } else if (this.props.page === 'login') {
            this.setState({
                buttonText: 'Sign Up',
                className: 'signupButton',
                link: routes.SIGNUP
            });
        } else {
            this.setState({
                buttonText: 'Get started',
                className: 'getstartedButton',
                link: routes.SIGNUP
            })
        }
    }

    handleLogoClick () {
        if (this.props.page === 'signup') {
            const signUpPage = $('.signupPage');
            signUpPage.fadeOut(500);
            setTimeout(() => {
                ReactDOM.render(<Home />, document.getElementById('root'));
            }, 500);
        } else if (this.props.page === 'login') {
            const loginPage = $('.loginPage');
            loginPage.fadeOut(500);
            setTimeout(() => {
                ReactDOM.render(<Home />, document.getElementById('root'));
            }, 500);
        }
    }

    handleButtonClick () {
        if (this.props.page === 'signup') {
            const signupPage = $('.signupPage');
            signupPage.fadeOut(500);
            setTimeout(() => {
                ReactDOM.render(<LoginPage />, document.getElementById('root'));
            }, 500);
        } else if (this.props.page === 'login') {
            const loginPage = $('.loginPage');
            loginPage.fadeOut(500);
            setTimeout(() => {
                ReactDOM.render(<SignupPage />, document.getElementById('root'));
            }, 500);

        } else {
            const homePage = $('.homePage');
            homePage.fadeOut(500);
            setTimeout(() => {
                ReactDOM.render(<SignupPage />, document.getElementById('root'));
            })
        }
    }

    render () {
        return (
            <header className='header'>
                <Link to={routes.HOME}><img className='logo' src={logo} alt='Logo'/></Link>
                <img className={this.state.searchIconClassName} src={searchicon} alt='Search icon'/>
                <div className={this.state.className}>
                    <Link to={this.state.link} style={{textDecoration: 'none'}}><p className='buttonText'>{this.state.buttonText}</p></Link>
                </div>
            </header>
        )
    }
}