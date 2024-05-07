import Badge from '@mui/material/Badge'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SearchIcon from '@mui/icons-material/Search';
import styled from 'styled-components'
import { mobile } from '../responsive'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { persistor } from '../redux/store';
import { logout } from '../redux/userRedux';
import { clearCart } from '../redux/cartRedux';


const Container = styled.div`
    height: 60px;
    background-color: #131111dc;
    color: white;
    ${mobile({height: "50px"})}
`

const Wrapper = styled.div`
    height: 100%;
    display: flex;
    padding: 10px 20px;
    align-items: center;    
    ${mobile({padding: "0px 2px"})}
`

const Left = styled.div`
    display: flex;
    flex: 1;
    align-items: center;
    ${mobile({ width: "50px", marginRight: "15px", justifyContet: "center" })};
`  
const Logo = styled.h3`
    font-weight: bold;
    padding-right: 10px;
    ${mobile({fontSize: "15px", marginTop: "7px"})};
`

const Center = styled.div`
    display: flex;
    flex: 2;
    align-items: center;
    border: 1px solid lightgray;
    border-radius: 5px;
    ${mobile({flex: "none" })};
`

const Input = styled.input`
    border: none;
    flex: 95;
    ${mobile({ width: "50px" })};
`
const Search = styled.div`
    flex: 5;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #c79583;
    border: 1px solid #c79583;
    cursor: pointer;
`

const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  ${mobile({ padding: "15px", flex: "none" })};
`
const MenuItem = styled.div`
    cursor: pointer;
    padding: 10px;
    ${mobile({padding: "5px",display: "flex", alignItems: "center"})};
`


const Navbar = () => {
    const quantity = useSelector(state => state.cart.quantity);
    const user = useSelector(state => state.user.currentUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        navigate('/');
        persistor.purge();
        dispatch(logout());
        dispatch(clearCart());
        document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }
  return (
    <Container>
        <Wrapper>
            <Left>
                <Link to="/" style={{ color: "white", textDecoration: "none"}}><Logo>OMDAZON</Logo></Link>
            </Left>

            <Center>
                <Input placeholder='Search'/>
                <Search>
                    <SearchIcon />
                </Search>    
            </Center>

            <Right>
            {user 
                ? (<MenuItem> <div onClick={handleLogout}> Log Out </div></MenuItem>)
                : (<div style={{display: "flex"}}><Link to="/register" style={{ color: "white", textDecoration: "none"}}><MenuItem> Sign Up </MenuItem></Link>
                   <Link to="/login" style={{ color: "white", textDecoration: "none"}}><MenuItem> Log In </MenuItem></Link></div>)
            } 
                <Link to="/cart">
                    <Badge badgeContent={quantity} color="primary" style={{ justifyContent: "flex-end"}}>
                        <ShoppingCartOutlinedIcon style={{ cursor: "pointer", color: "white" }}/>
                    </Badge>
                </Link>
            </Right>
        </Wrapper>
    </Container>
  )
}

export default Navbar 