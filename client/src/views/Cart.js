import styled from "styled-components";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import StripeCheckout from 'react-stripe-checkout';
import { useEffect, useState } from "react";
import checkoutService from "../services/payment.service";
import { useNavigate } from "react-router-dom";


const KEY = process.env.REACT_APP_STRIPE_TOKEN;


const Container = styled.div`

`

const Wrapper = styled.div`
    padding: 10px;
`

const Title = styled.h1`
    text-align: center;
    margin: 20px;
    font-weight: 300;
`

const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
`

const TopButton = styled.button`
    padding: 10px;
    font-weight: 600;
    border: none;
    background-color: gray;
    ${mobile({padding: "5px", fontWeight: "500"})};

`

const Bottom = styled.div`
    display: flex;
    justify-content: space-between;
    ${mobile({flexDirection: "column"})};
`

const Info = styled.div`
    flex: 3;
`

const Product = styled.div`
    display: flex;
    justify-content: space-between;
    ${mobile({flexDirection: "column"})};
`

const ProductDetails = styled.div`
    display: flex;
`

const Image = styled.img`
    width: 200px;
`

const Details = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 20px;
`

const ProductName = styled.span`
    
`

const ProductId = styled.span`
    
`

const ProductColor = styled.div`
    background-color: ${props => props.color};
    width: 20px;
    height: 20px;
    border-radius: 50%;
`

const ProductSize = styled.span`
    
`

const PriceDetails = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const ProductAmountContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
`

const ProductAmount = styled.span`
    margin: 20px;
`

const ProductPrice = styled.div`
    font-size: 30px;
    font-weight: 200;
`

const Summary = styled.div`
    flex: 1;
    border: 1px solid lightgray;
    border-radius: 10px;
    padding: 20px;
    height: 50vh;
    margin: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

`

const SummaryTitle = styled.div`
    font-size: 20px;
    font-weight: 800;
`

const SummaryItem = styled.div`
    display: flex;
    justify-content: space-between;
`

const SummaryItemText = styled.span``

const SummaryItemPrice = styled.span``

const SummaryButton = styled.button`
    width: 100%;
    padding: 10px;
    font-weight: 600;
    border: none;
    background-color: #131111dc;
    color: white;
    &:disabled{
        background-color: #13111168;
        cursor: not-allowed;
    }
`

const Alert = styled.div`
    display: flex;
    justify-content: center;
`

const Cart = () => {
    const cart = useSelector(state => state.cart);
    const [stripeToken, setStripeToken] = useState(null);
    const navigate = useNavigate();

    const onToken = (token) => {
        setStripeToken(token);
    }

    useEffect(() => {
        stripeToken && 
            checkoutService.checkout(stripeToken.id, cart.total * 100)
                .then(res => {
                    console.log(cart)
                    navigate("/success", { state: {stripeData: res.data, cart} })
                }).catch(err => console.log(err))
    },[stripeToken, cart, navigate]);

    let uniqueKey = 1;
    return (
    <Container>
        <Navbar />
        <Wrapper>
            <Title>YOUR BAG</Title>
            <Top>
                <TopButton onClick={() => navigate("/")}> CONTINUE SHOPPING </TopButton>
            </Top>
            <Bottom>
                <Info>
                    {cart.quantity ? (cart.products.map(product => (
                    <>
                      <Product key={uniqueKey++}>
                        <ProductDetails>
                            <Image src={product.img}/>
                            <Details>
                                <ProductName>
                                    <b>Product:</b> {product.title}
                                </ProductName>
                                <ProductId>
                                    <b>ID:</b> {product._id}
                                </ProductId>
                                <ProductColor color={product.color} />
                                <ProductSize>
                                    <b>Size:</b> {product.size}
                                </ProductSize>
                            </Details>
                        </ProductDetails>
                        <PriceDetails>
                            <ProductAmountContainer>
                                <ProductAmount><b>Quantity:</b> {product.quantity}</ProductAmount>
                            </ProductAmountContainer>
                            <ProductPrice>$ {product.price}</ProductPrice>
                        </PriceDetails>
                      </Product>
                        <hr/>
                    </>
                        )))
                        : (<Alert className="alert alert-danger">Your cart is EMPTY!</Alert>)
                    }
                </Info>
                <Summary>
                    <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                    <SummaryItem>
                        <SummaryItemText>Subtotal</SummaryItemText>
                        <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
                    </SummaryItem>
                    <SummaryItem>
                        <SummaryItemText>Estimated Shipping</SummaryItemText>
                        <SummaryItemPrice>$ 5.90</SummaryItemPrice>
                    </SummaryItem>
                    <SummaryItem>
                        <SummaryItemText>Shipping Discount</SummaryItemText>
                        <SummaryItemPrice>$ -5.90</SummaryItemPrice>
                    </SummaryItem>
                    <SummaryItem>
                        <SummaryItemText>Total</SummaryItemText>
                        <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
                    </SummaryItem>
                    <StripeCheckout 
                        name="Omdazon" description={`Your total is $ ${cart.total}`}
                        stripeKey= {KEY}
                        billingAddress
                        shippingAddress
                        amount={cart.total * 100}
                        token={onToken}
                        >
                        <SummaryButton disabled={!(cart.total)}>CHECKOUT NOW</SummaryButton>
                    </StripeCheckout>
                </Summary>
            </Bottom>
        </Wrapper>
    </Container>
  )
}

export default Cart