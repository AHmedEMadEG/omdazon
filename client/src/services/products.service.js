import axios from 'axios';

const getAllProducts = (cat) => {
    const URL = cat ? process.env.REACT_APP_API_URL + `products?category=${cat}` : process.env.REACT_APP_API_URL + 'products';
    return axios.get(URL);
}

const getProduct = (productId) => {
    return axios.get(process.env.REACT_APP_API_URL + `products/find/${productId}`);
}


const ProductsService = {
    getAllProducts,
    getProduct
}

export default ProductsService