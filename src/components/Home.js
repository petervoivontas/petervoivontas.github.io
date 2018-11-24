import React from 'react';
import { Header } from './Header';

import postIcon from '../icons/newstory.svg';

import '../styles/Home.css';

export class Home extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            username: '',
            auth: false
        }
    }

    componentWillMount () {
        if (window.localStorage.getItem('username')) {
            this.setState({
                username: window.localStorage.getItem('username'),
                auth: true
            })
        }
    }
    
    render() {
        return (
            <div className='homePage'>
                <Header page='home' auth={this.state.auth} />
                {/* <div className='newStory'>
                    <p>+</p>
                </div> */}
                <img className='newStory' alt='New story button' src={postIcon} />
            </div>
        )
    }
}