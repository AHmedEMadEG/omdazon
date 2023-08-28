import styled from 'styled-components'
import Slider from '../components/Slider'
import Navbar from '../components/Navbar'
import Categories from '../components/Categories'
import Products from '../components/Products'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import cartService from '../services/cart.service'
import { login } from "../redux/userRedux";
import { initiatingCart } from "../redux/cartRedux";

const Container = styled.div`
    
`

const Home = () => {
    const dispatch = useDispatch();
    // removing lineLoginError cookie
    document.cookie = 'lineLoginError=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

    // Get user and token from cookies
    useEffect(() => {
        if (document.cookie.includes('user=') && document.cookie.includes('token=')) {
            const userCookie = document.cookie
                .split('; ')
                .find(row => row.startsWith('user='))
                .split('=')[1];

            const tokenCookie = document.cookie
                .split('; ')
                .find(row => row.startsWith('token='))
                .split('=')[1];

            const user = { ...(JSON.parse(decodeURIComponent(userCookie))), token: decodeURIComponent(tokenCookie) };

            if (user) {
                dispatch(login(user));
                cartService.getUserCart(user._id, user.token)
                    .then(res => {
                        dispatch(initiatingCart(res.data));
                    })
            }
        }
    }, [])

    return (
        <Container>
            <Navbar />
            <Slider />
            <Categories />
            <Products />
        </Container>
    )
}

export default Home