import React, {Component} from 'react';
import {setAuthToken, setUserIsAuthorizedFlag} from '../../redux/auth/actions';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ProductsList from '../../components/productsList/productsList';

class DashboardPage extends Component {
    logout = () => {
        const {setUserIsAuthorizedFlag, setAuthToken} = this.props;
        setAuthToken('');
        setUserIsAuthorizedFlag(false);
        localStorage.removeItem('tokens');
    }

    render() {
        return (
            <>
                <ProductsList logout={this.logout}/>
                <div>Dashboard page. TBD</div>
                <button onClick={() => this.logout()}>Log out</button>
            </>
        );
    }
}

const mapStateToProps = ({auth}) => ({
    isAuthorized: auth.isAuthorized
});

const mapDispatchToProps = ({
    setUserIsAuthorizedFlag,
    setAuthToken
});

DashboardPage.propTypes = {
    isAuthorized: PropTypes.bool,
    setAuthToken: PropTypes.func,
    setUserIsAuthorizedFlag: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
