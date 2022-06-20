import axios from 'axios';


const createCart = (userId) => {
    return axios.post(process.env.REACT_APP_API_URL + 'carts', {userId});
}


const getUserCart = (userId, token) => {
    return axios.get(process.env.REACT_APP_API_URL + `carts/find/${userId}`, {headers: { authorization: `bearer ${token}` }});
}


const updateCart = (userId, cart, token) => {
    return axios.put(process.env.REACT_APP_API_URL + `carts/${userId}`, cart, {headers: { authorization: `bearer ${token}` }});
}

const cartService = {
    createCart,
    getUserCart,
    updateCart
}

export default cartService