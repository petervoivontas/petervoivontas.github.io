import React from 'react';
import { Header } from './Header';
import { withCookies } from 'react-cookie';
import $ from 'jquery';

import profileimg from '../icons/profileimg.jpg';

import '../styles/ProfilePage.css';

class ProfilePage extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            auth: false,
            usernameState: 'p',
            bioState: 'p',
            bioValue: 'There are only two tragedies in life: one is not getting what one wants, and the other is getting it.'
        }
        this.handleEditProfileButtonClick = this.handleEditProfileButtonClick.bind(this);
    }

    splitUsername (username) {
        return username.split(' ');
    }

    componentWillMount () {
        const username = this.splitUsername('Peter Voivontas');
        if (window.localStorage.getItem('username')) {
            this.setState({
                firstName: username[0],
                lastName: username[1],
                usernameValue: `${username[0]} ${username[1]}`,
                auth: true
            });
        }
    }

    componentDidUpdate () {
        const username = $('.username_profile_page');
        const usernameField = $('.usernameField');
        const bio = $('.bio_profile_page');
        const bioField = $('.bioField');

        if (this.state.usernameState === 'p') {
            username.hide(() => {
                username.fadeIn(500);
            });
        } else {
            usernameField.hide(() => {
                usernameField.fadeIn(500);
            });
        }

        if (this.state.bioState === 'p') {
            bio.hide(() => {
                bio.fadeIn(500);
            });
        } else {
            bioField.hide(() => {
                bioField.fadeIn(500);
            });
        }
    }

    handleEditProfileButtonClick () {
        const username = $('.username_profile_page');
        const usernameField = $('.usernameField');
        const bio = $('.bio_profile_page');
        const bioField = $('.bioField');

        if (this.state.usernameState === 'p') {
            username.fadeOut(500);
            setTimeout(() => {
                this.setState({usernameState: 'input'});
            }, 500);
        } else {
            usernameField.fadeOut(500);
            setTimeout(() => {
                this.setState({usernameState: 'p'});
            }, 500);
        }

        if (this.state.bioState === 'p') {
            bio.fadeOut(500);
            setTimeout(() => {
                this.setState({bioState: 'input'});
            }, 500);
        } else {
            bioField.fadeOut(500);
            setTimeout(() => {
                this.setState({bioState: 'p'});
            }, 500);
        }
    }

    render () {
        return (
            <div>
                <Header auth={this.state.auth} />
                <div className='profile'>
                    <div className='flex1'>
                        <img className='profileimg_profile_page' src={profileimg} alt='Profile' />
                        { this.state.bioState === 'p'
                            ?
                            <p className='bio_profile_page'>There are only two tragedies in life: one is not getting what one wants, and the other is getting it.</p>
                            :
                            <textarea className='bioField' type='text' value={this.state.bioValue} onChange={event => this.setState({bioValue: event.target.value})}/>
                        }
                    </div>
                    <div className='flex2'>
                        {/* <div className={this.state.usernameFieldClassName}>
                            <p>{this.state.firstName}</p>
                            <p>{this.state.lastName}</p>
                        </div> */}
                        { this.state.usernameState === 'p'
                            ?
                            <div className='username_profile_page'>
                                <p>{this.state.firstName}</p>
                                <p>{this.state.lastName}</p>
                            </div>
                            :
                            <input className='usernameField' type='text' value={this.state.usernameValue} onChange={event => this.setState({usernameValue: event.target.value})}/>
                        }
                        <button className='edit_profile_button' onClick={this.handleEditProfileButtonClick}>Edit profile</button>
                    </div>
                    {/* <img className='edit_profile_button' src={edit_profile_button} alt='Edit profile button' /> */}
                </div>
            </div>
        )
    }
}

export default withCookies(ProfilePage);