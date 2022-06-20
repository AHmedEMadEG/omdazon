import axios from 'axios';

const checkout = (tokenId, amount) => {
    return axios.post(process.env.REACT_APP_API_URL + 'checkout/payment', {tokenId, amount});
}


const checkoutService = {
    checkout
}

export default checkoutService