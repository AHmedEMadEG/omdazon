import axios from 'axios';


const createOrder = (order, token) => {
    return axios.post(process.env.REACT_APP_API_URL + 'orders', order, {headers: { authorization: `bearer ${token}` }});
}


const ordersService = {
    createOrder
}

export default ordersService