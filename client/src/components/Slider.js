import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos'
import ArrowBackIos from '@mui/icons-material/ArrowBackIos'
import { useState } from 'react'
import styled from 'styled-components'
import { sliderItems } from '../data'
import { mobile } from '../responsive'


const Container = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #c79583;
    display: flex;
    position: relative;
    overflow: hidden;
    ${mobile({display: "none"})};
`

const Arrow = styled.div`
    width: 35px;
    height: 100px;
    background-color: lightgray;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.5;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    cursor: pointer;
    z-index: 1;
`

const Wrapper = styled.div`
    display: flex;
    transition: 1.5s;
    transform: translateX(${props => props.slideIndex * -100 }vw);
`


const Slide = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.bg};
`

const ImageContainer = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`

const InfoContainer = styled.div``

const Title = styled.h1``

const Desc = styled.p`
    margin: 50px 0px;
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 3px;
`

const Button = styled.button`
    font-weight: 600;
    border: none;
    padding: 10px;
    border-radius: 5px;
    background-color: #131111dc;
    color: white;
`


const Slider = () => {
    const [slideIndex, setSlideIndex] = useState(0)

    const handleClick = (direction) => {
        if(direction === 'right') 
          setSlideIndex(slideIndex < sliderItems.length-1 ? slideIndex + 1 : 0)
        else 
          setSlideIndex(slideIndex > 0 ? slideIndex - 1 : sliderItems.length-1)
      }
      
    return (
        <Container>
            <Arrow onClick={()=> handleClick("left")}>
                <ArrowBackIos />
            </Arrow>

            <Wrapper slideIndex={slideIndex}>
                {sliderItems.map((item) => (
                    <Slide bg={item.bg}  key={item.id}>
                        <ImageContainer>
                            <img src={item.img} alt="slide" style={{height: "80%"}}/>
                        </ImageContainer>
                        <InfoContainer>
                            <Title>{item.title}</Title>
                            <Desc>{item.desc}</Desc>
                            <Button>Check Now</Button>
                        </InfoContainer>
                    </Slide>
                ))}
            </Wrapper>

            <Arrow style={{right: "0px"}}  onClick={()=> handleClick("right")}>
                <ArrowForwardIos />
            </Arrow>
        </Container>
    )
}

export default Slider