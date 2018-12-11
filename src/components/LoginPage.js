import React from 'react';
import { Header } from './Header';
import { AuthButtons } from './AuthButtons';

import '../styles/Login.css';

export class LoginPage extends React.Component {
    render () {
        return (
            <div>
                <Header page='login'/>
                <div className='loginPage'>
                    <p>Welcome back</p>
                    <hr />
                    <p>Log in to Nuntium</p>
                    <LoginForm history={this.props.history} />
                </div>
            </div>
        )
    }
}

class LoginForm extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

    render () {
        const {
            email,
            password
        } = this.state;

        return (
            <div>
                <form className='loginForm'>
                    <input 
                        className='email'
                        value={email}
                        onChange={event => this.setState({email: event.value})}
                        type='text'
                        placeholder='Email'
                    />
                    <input
                        className='password'
                        value={password}
                        onChange={event => this.setState({password: event.value})}
                        type='password'
                        placeholder='Password'
                    />
                    <AuthButtons page='login' history={this.props.history} />
                </form>
            </div>
        )
    }
}