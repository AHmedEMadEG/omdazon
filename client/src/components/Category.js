import { Link } from "react-router-dom"
import styled from "styled-components"
import { mobile } from "../responsive"


const Container = styled.div`
    height: 70vh;
    flex: 1;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    ${mobile({height: "90vh"})};
`

const InfoContainer = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const Title = styled.h1`
    color: white;
    margin: 20px;
`

const Button = styled.button`
    font-weight: 600;
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-color: #131111dc;
    color: white;
    box-shadow: 0 0 0 2px #c79583,
              6px 6px 0 0 #c9809b,
              6px 6px 0 2px #ffffffb7,
              8px 8px 0 0 #c79583,
              10px 10px 0 2px #ffffffb7;
`


const Category = ({ item }) => {
  return (
    <Container>
        <Image src={item.img}/>
        <InfoContainer>
            <Title>{item.title}</Title>
            <Link to={`/category/${item.cat}`}>
                <Button>Find More</Button>
            </Link>
        </InfoContainer>
    </Container>
  )
}

export default Category