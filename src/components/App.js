import React from 'react';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import * as routes from '../constants/routes';

import { Home } from './Home';
import { SignupPage } from './SignupPage';
import { LoginPage } from './LoginPage';

export class App extends React.Component {
    render () {
        return (
            <div>
                <Router>
                    <div>
                        <Route exact path={routes.HOME} component={Home}/>
                        <Route exact path={routes.SIGNUP} component={SignupPage}/>
                        <Route exact path={routes.LOGIN} component={LoginPage}/>
                    </div>
                </Router>
            </div>
        )
    }
}
