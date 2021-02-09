import React, { Component } from 'react';
import authService from '../../services/authService';
import _ from 'lodash';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from "prop-types";
import '../login/login.scss';

class Signup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isError: false,
            userName: '',
            password: '',
            email: ''
        }
    }

    setUserName = (userName) => {
        this.setState({ userName });
    }

    setPassword = (password) => {
        this.setState({ password });
    }

    setEmail = (email) => {
        this.setState({ email });
    }

    async signupAction(userName, password, email) {
        const { setAuthToken, setUserIsAuthorizedFlag } = this.props;
        try {
            const userSignUpResponse = await authService.signupUser(userName, password, email);
            const token = _.get(userSignUpResponse, 'data.token', null);
            if (token) {
                setAuthToken(token);
                setUserIsAuthorizedFlag(true);
                localStorage.setItem('tokens', JSON.stringify(token));
                return <Redirect to='/dashboard' />
            } else {
                this.setState({ isError: true });
            }
        } catch (error) {
            console.error(error);
            this.setState({ isError: true });
        }
    }

    render() {
        const { isError, userName, password, email } = this.state;
        const { isAuthorized } = this.props;

        if (isAuthorized) {
            return <Redirect to='/dashboard' />;
        }

        return (
            <div className="container">
                <div className="container-form">
                    <h1>Register</h1>
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
                        <label form="username">Full name</label>
                        <input
                            type='username'
                            value={userName}
                            onChange={e => {
                                this.setUserName(e.target.value);
                            }}
                            placeholder='username'
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
                        <label form="password">Password again</label>
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
                            onClick={() => this.signupAction(userName, password, email)}
                        >Register</button>
                    </form>
                </div>

                <div className="have-acc">I already have an account,
                    <Link className="register" to='/login'> LOG IN</Link>
                </div>
                {isError && <div>Something went wrong while sign up</div>}
            </div>
        );
    }
}

Signup.propTypes = {
    setUserIsAuthorizedFlag: PropTypes.func,
    setAuthToken: PropTypes.func
};

export default Signup;
