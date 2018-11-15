import React from 'react';
import { Header } from './Header';

import { withCookies } from 'react-cookie';

import postIcon from '../icons/newstory.svg';

import '../styles/Home.css';

class Home extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            username: '',
            auth: false
        }
    }

    componentWillMount () {
        const { allCookies } = this.props;
        if (allCookies.name) {
            this.setState({
                username: allCookies.name,
                auth: true
            });
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

export default withCookies(Home);