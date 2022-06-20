import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';

const ENDPOINT_URL = "http://localhost:5000/api/checkout/payment";
const STRIPE_KEY = "pk_test_51L2caUGyMhMvI2xUjpeuNe0lW7ZFEBq7ecS28CosOWTkIUbtDjjcI9QIyN51UWUAphNm7FQws5uS8MumCQfnKpPH00YeNFrEUX";

const Pay = () => {
    const [stripeToken, setStripeToken] = useState(null);
    const navigate = useNavigate();
    const onToken = (token) => {
        setStripeToken(token);
    }

    useEffect(() => {
        const makeRequest = () => {
            axios.post(ENDPOINT_URL, {tokenId: stripeToken.id, amount: 2000})
            .then((res) => {
                console.log(res);
                navigate("/success");
            })
            .catch((err) => {
                console.log(err);
            });
        }
        stripeToken && makeRequest()
    }, [stripeToken, navigate]);

  return (
    <div style={{height: "100vh", display: "flex", alignItems: "center", justifyContent: "center"}}>
        { stripeToken ? (
            <span>proccessing, Please wait...</span>)
            : (
            <StripeCheckout 
                name="Omdazon" description="Your total is $20"
                stripeKey= {STRIPE_KEY}
                billingAddress
                shippingAddress
                amount={2000}
                token={onToken}
                >
                <button className="btn btn-primary" style={{cursor: "pointer", fontSize: "30px"}}>Pay</button>
            </StripeCheckout> )
        }
    </div>
  )
}

export default Pay;