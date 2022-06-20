import styled from 'styled-components'
import Slider from '../components/Slider'
import Navbar from '../components/Navbar'
import Categories from '../components/Categories'
import Products from '../components/Products'

const Container = styled.div`
    
`

const Home = () => {
    return(
        <Container>
            <Navbar />
            <Slider/>
            <Categories />
            <Products />
        </Container>
    )
}

export default Home