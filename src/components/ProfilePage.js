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
            usernameState: 'p'
        }
        this.handleEditProfileButtonClick = this.handleEditProfileButtonClick.bind(this);
    }

    splitUsername (username) {
        return username.split(' ');
    }

    componentWillMount () {
        const { allCookies } = this.props;
        const username = this.splitUsername('Peter Voivontas');
        if (allCookies.name) {
            this.setState({
                firstName: username[0],
                lastName: username[1],
                value: `${username[0]} ${username[1]}`,
                auth: true
            });
        }
        
    }

    handleEditProfileButtonClick () {
        this.state.usernameState === 'p'
            ? this.setState({usernameState: 'input'})
            : this.setState({usernameState: 'p'});
    }

    render () {
        return (
            <div>
                <Header auth={this.state.auth} />
                <div className='profile'>
                    <div className='flex1'>
                        <img className='profileimg_profile_page' src={profileimg} alt='Profile' />
                        <p className='bio_profile_page'>There are only two tragedies in life: one is not getting what one wants, and the other is getting it.</p>
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
                            <input className='usernameField' value={this.state.value} onChange={event => this.setState({value: event.target.value})}/>
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