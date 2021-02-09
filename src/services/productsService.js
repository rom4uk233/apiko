import axios from 'axios';

class productsService {
    getLatestProducts(offset = null, limit = null) {
        const offsetQueryParam = offset ? `offset=${offset}` : '';
        const limitQueryParam = limit ? `&limit=${limit}` : '';
        const url = 'products/latest?' + offsetQueryParam + limitQueryParam;
        return axios.get(url).then(resp => resp);
    }
}

export default new productsService();
