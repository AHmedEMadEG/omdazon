import styled from "styled-components"
import Navbar from "../components/Navbar"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductsService from "../services/products.service";
import { addProduct } from "../redux/cartRedux";
import { useDispatch, useSelector } from "react-redux";
import cartService from "../services/cart.service";


const Container = styled.div``

const Wrapper = styled.div`
  display: flex;
  padding: 40px;
  ${mobile({ padding: "10px", flexDirection:"column" })};
`

const ImageContainer = styled.div`
  
`

const Image = styled.img`
  width: 100%;
  height: 80vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })};
`

const InfoContainer = styled.div`
  flex: 2;
  padding: 0px 40px;
  ${mobile({ padding: "10px" })};
`

const Title = styled.h1`

`

const Desc = styled.p`
  margin: 10px 0px;
  font-weight: 100;
`

const Price = styled.span`
  font-size: 40px;
  font-weight: 300;
`

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 70%;
  padding: 20px 0px;
  ${mobile({ width: "100%" })};
`

const Filter = styled.div`
  display: flex;
  align-items: center;
`

const FilterTitle = styled.span`
  font-size: 24px;
  font-weight: 200;
  margin: 0px 10px;
`

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props => props.color)};
  margin: 0px 5px;
  cursor: pointer;
  border: ${(props => props.selectedColor === props.color && "2px solid black")};
`

const  FilterSize = styled.select`
  padding: 1px 10px;
`

const  FilterSizeOption = styled.option``

const AddContainer = styled.div`
  width: 70%;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })};
`

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
`

const ProductAmount = styled.span`
  margin: 20px;
`
const Button = styled.button`
  font-weight: 600;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #131111dc;
  color: white;
`

const Alert = styled.div`
  padding: 10px;
  margin: 10px;
`

const Product = () => {
  const location = useLocation();
  const productId = location.pathname.split('/')[2]; 
  const user = useSelector(state => state.user.currentUser);
  const cart = useSelector(state => state.cart);

  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [message, setMessage] = useState("");
  const [clicked, setClicked] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    ProductsService.getProduct(productId)
    .then(res => setProduct(res.data));
  },[productId]);

  const handlequantity = (type) => {
    type === "inc" && setQuantity(quantity+1);
    type === "dec" && quantity > 1 && setQuantity(quantity-1);
  }

  const handleClick = () => {
    if(!user){
      setMessage("Log in first to be able to add to your cart!");
    }else if(!color || !size || size === "Select"){
      setMessage("Please select product COLOR and SIZE first!");
    }else{ 
      setMessage("");
      const newProduct = { ...product, quantity, color, size };
      const { categories, createdAt, updatedAt, desc, inStock, __v, ...others} = newProduct;
      dispatch(addProduct(others));
      setClicked(true);
    }
  }

  useEffect(() => {
    clicked && 
      cartService.updateCart(user._id, cart, user.token)
      && setClicked(false);
  }, [clicked, user, cart]);


  return (
    <Container>
      <Navbar/>
      <Wrapper>
          <ImageContainer>
            <Image src={product.img}/>
          </ImageContainer>
          <InfoContainer>
            <Title>{product.title}</Title>
            <Desc>{product.desc}</Desc>
            <Price>$ {product.price}</Price>
            <FilterContainer>
              <Filter>
                <FilterTitle>Color</FilterTitle>
                {product.color?.map((c) => (
                  <FilterColor selectedColor={color} key={c} color={c} onClick={() => setColor(c)}/>
                ))}
              </Filter>
              <Filter>
                <FilterTitle>Size</FilterTitle>
                <FilterSize defaultValue="Select" onChange={(e) => setSize(e.target.value)}>
                  <FilterSizeOption>Select</FilterSizeOption>
                  {product.size?.map((size) => (
                    <FilterSizeOption key={size}>{size}</FilterSizeOption>
                  ))}
                </FilterSize>
              </Filter>
            </FilterContainer>
            <AddContainer>
              <AmountContainer>
                <RemoveCircleIcon onClick={() => handlequantity("dec")} style={{cursor: "pointer"}}/>
                <ProductAmount>{quantity}</ProductAmount>
                <AddCircleIcon onClick={() => handlequantity("inc")} style={{cursor: "pointer"}}/>
              </AmountContainer>
              <Button onClick={handleClick}>Add to Cart</Button>
            </AddContainer>
            { message && 
                <Alert className="alert alert-danger">{message}</Alert>
            }
          </InfoContainer>
      </Wrapper>
    </Container>
  )
}

export default Product