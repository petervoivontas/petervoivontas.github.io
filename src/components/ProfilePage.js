import React from 'react';
import { Header } from './Header';
import { withCookies } from 'react-cookie';

class ProfilePage extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
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

    render () {
        return (
            <div>
                <Header auth={this.state.auth} />
            </div>
        )
    }
}

export default withCookies(ProfilePage);