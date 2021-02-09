import React, {Component} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import productsService from '../../services/productsService';

class ProductsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            productsList: []
        }
    }

    async componentDidMount() {
        await this.getProductsList();
    }

    async getProductsList() {
        try {
            const productsDataResponse = await productsService.getLatestProducts();
            const productsData = _.get(productsDataResponse, 'data', []);
            this.setState({
                productsList: productsData,
                isLoading: false
            });
        } catch (error) {
            console.error(error);
            if (error.response.status === 401) {
                return this.props.logout;
            }
        }
    }

    render() {
        const {productsList} = this.state;
        console.log({productsList});
        // markup here
        return (
            <div>
                {productsList.map((product) => {
                    return (
                        <div>Here you can add your markup for one item</div>
                    )
                })}
            </div>
        )
    }
}

ProductsList.propTypes = {
    logout: PropTypes.func
};

export default ProductsList;
