import axios from 'axios';


const register = (user) => {
    return axios.post(process.env.REACT_APP_API_URL + 'auth/register', user);
}

const login = (user) => {
    return axios.post(process.env.REACT_APP_API_URL + 'auth/login', user);
}


const AuthService = {
    register,
    login
}

export default AuthService