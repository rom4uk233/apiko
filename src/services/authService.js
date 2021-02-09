import axios from 'axios';

class authService {
    signupUser(username, password, email) {
        const data = {
            fullName: username,
            password,
            email
        };
        return axios.post('/auth/register', data).then(resp => resp);
    }

    loginUser(email, password) {
        const data = {
            email,
            password
        };
        return axios.post('/auth/login', data).then(resp => resp);
    }

    addTokenToServiceCalls() {
        axios.interceptors.request.use(
            config => {
                const token = JSON.parse(localStorage.getItem('tokens'));
                if (token) {
                    config.headers['Authorization'] = 'Bearer ' + token;
                }
                return config;
            },
            error => {
                Promise.reject(error)
            });
    }
}

export default new authService();
