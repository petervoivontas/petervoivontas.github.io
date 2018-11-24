import React from 'react';

import {
    Link
} from 'react-router-dom';

import logo from '../icons/logo.png';
import profileimg from '../icons/profileimg.jpg';

import '../styles/Header.css';
import * as routes from '../constants/routes';

export class Header extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            buttonText: '',
            className: '',
            link: null
        }
    }

    componentWillMount () {
        if (this.props.auth === true) {
            this.setState({
                link: routes.PROFILE
            });
        } else {
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
    }

    render () {
        const nonAuthHeader = (
            <header className='nonAuthHeader'>
                <Link to={routes.HOME}><img className='logo' src={logo} alt='Logo'/></Link>
                {/* <div className={this.state.className}>
                    <Link to={this.state.link} style={{textDecoration: 'none'}}>{this.state.buttonText}</Link>
                </div> */}
                <Link to={this.state.link} style={{textDecoration: 'none'}} className={this.state.className}>{this.state.buttonText}</Link>
            </header>
        )

        const authHeader = (
            <header className='authHeader'>
                <Link to={routes.HOME}><img className='logo' src={logo} alt='Logo'/></Link>
                <div>
                    <input className='searchFieldAuth' type='text' autoComplete='off' placeholder='Search...'/>
                    <Link to={this.state.link} className='profileimg'><img className='profileimg' src={profileimg} alt='User profile' /></Link>
                </div>
            </header>
        )
        return (
            this.props.auth === true ? authHeader : nonAuthHeader
        )
    }
}