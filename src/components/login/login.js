import React, {Component} from 'react';
import authService from '../../services/authService';
import _ from 'lodash';
import {Link, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import './login.scss';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isError: false,
            email: '',
            password: ''
        }
    }

    setEmail = (email) => {
        this.setState({email});
    }

    setPassword = (password) => {
        this.setState({password});
    }

    async loginAction(email, password) {
        const {setAuthToken, setUserIsAuthorizedFlag} = this.props;
        try {
            const userLogInResponse = await authService.loginUser(email, password);
            const token = _.get(userLogInResponse, 'data.token', null);
            if (token) {
                setAuthToken(token);
                setUserIsAuthorizedFlag(true);
                localStorage.setItem('tokens', JSON.stringify(token));
                return <Redirect to='/dashboard'/>
            } else {
                this.setState({isError: true});
            }
        } catch (error) {
            console.error(error);
            this.setState({isError: true});
        }
    }

    render() {
        const {isError, email, password} = this.state;
        const {isAuthorized} = this.props;

        if (isAuthorized) {
            return <Redirect to='/dashboard'/>;
        }

        return (
            <div className="container">
                <div className="container-form">
                    <h1>Login</h1>
                    <form>
                        <label form="email">Email</label>
                        <input
                            type='email'
                            value={email}
                            onChange={e => {
                                this.setEmail(e.target.value);
                            }}
                            placeholder='email'
                        />
                        <label form="password">Password</label>
                        <input
                            type='password'
                            value={password}
                            onChange={e => {
                                this.setPassword(e.target.value);
                            }}
                            placeholder='password'
                        />
                        <div className="forgot-password">
                            Don't remember password?
                        </div>
                        <button
                            onClick={() => this.loginAction(email, password)}
                        >Continue</button>
                    </form>
                </div>

                <div className="have-acc">I have no account,
                    <Link className="register" to='/signup'> REGISTER NOW</Link>
                </div>
                {isError && <div>Something went wrong while sign up</div>}
            </div>

        );
    }
}

Login.propTypes = {
    setUserIsAuthorizedFlag: PropTypes.func,
    setAuthToken: PropTypes.func,
    isAuthorized: PropTypes.bool
};

export default Login;
