import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import ordersService from "../services/orders.service";
import { Link } from "react-router-dom";
import { clearCart } from "../redux/cartRedux";

const Success = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const data = location.state.stripeData;
  const cart = location.state.cart;
  const currentUser = useSelector((state) => state.user.currentUser);
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    data && ordersService.createOrder({
      userId: currentUser._id,
    products: cart.products.map((item) => ({
      productId: item._id,
      quantity: item.quantity,
    })),
    amount: cart.total,
    address: data.billing_details.address
    }, currentUser.token)
    .then(res => {
      setOrderId(res.data._id);
      dispatch(clearCart());
    })
    .catch(err => console.log(err));

  }, [cart, data, currentUser, dispatch]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(to top, rgba(0, 0, 0, 0.8) 0, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 0.8) 100%),url('./images/success.jpeg')",
        backgroundSize: "cover",
        color: "white"
      }}
    >
      {orderId
        ? (<p style={{backgroundColor: "crimson", borderRadius: "10px", padding: "10px"}}><b>Order has been created successfully. Your order number is ({orderId})</b></p>)
        : (<p><b>Successfull. Your order is being prepared...</b></p>)}
      <Link to='/' style={{ padding: 10, marginTop: 20, backgroundColor: "green", textDecoration: "none", color: "white", borderRadius: "10px"}}>Continue Shopping</Link>
    </div>
  );
};

export default Success;
