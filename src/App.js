import React, { Component } from 'react';
import { connect } from 'react-redux';
import {BrowserRouter, Redirect} from 'react-router-dom';
import {
    setUserIsAuthorizedFlag,
    setAuthToken,
    setSavedAuthToken
} from './redux/auth/actions';
import PropTypes from 'prop-types';
import Dashboard from './pages/dashboardPage/dashboardPage';
import AuthPage from './pages/authPage/authPage';
import PrivateRoute from './components/privateRoute/privateRoute';
import PublicRoute from './components/publicRoute/publicRoute';
import authService from './services/authService';

class App extends Component {
    componentDidMount() {
        this.props.setSavedAuthToken();
        authService.addTokenToServiceCalls();
        this.setBeforeUnloadEventListeners();
    }

    setBeforeUnloadEventListeners() {
        window.addEventListener('beforeunload', () => localStorage.removeItem('tokens'));
        window.addEventListener('beforeunload', () => this.props.setUserIsAuthorizedFlag(false));
    }

    render() {
        const {isAuthorized} = this.props;
        return (
            <BrowserRouter>
                <Redirect exact from='/' to='/dashboard' />
                <PublicRoute exact path='/login' component={AuthPage} authed={isAuthorized} />
                <PublicRoute exact path='/signup' component={AuthPage} authed={isAuthorized} />
                <PrivateRoute exact path='/dashboard' component={Dashboard} authed={isAuthorized} />
            </BrowserRouter>
        );
    }
}

const mapStateToProps = ({auth}) => ({
    isAuthorized: auth.isAuthorized,
    authToken: auth.authToken
});

const mapDispatchToProps = ({
    setUserIsAuthorizedFlag,
    setAuthToken,
    setSavedAuthToken
});

App.propTypes = {
    isAuthorized: PropTypes.bool,
    setAuthToken: PropTypes.func,
    setSavedAuthToken: PropTypes.func,
    setUserIsAuthorizedFlag: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
