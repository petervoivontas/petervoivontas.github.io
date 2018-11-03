import React from 'react';
import { Header } from './Header';

export class Home extends React.Component {
    render() {
        return (
            <div className='homePage'>
                <Header page='home' />
                <div className='newStory'>
                    <p>+</p>
                </div>
            </div>
        )
    }
}