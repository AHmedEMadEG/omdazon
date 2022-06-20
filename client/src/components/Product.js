import styled from 'styled-components'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { mobile } from "../responsive"
import { Link } from 'react-router-dom';
import { useState } from 'react';


const Container = styled.div`
  flex: 1;
  min-width: 300px;
  height: 350px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px;
  ${mobile({height: "80vh"})};
`


const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const Icons = styled.div`
  cursor: pointer;
  width: 100%;
  height: 100%;
  position: absolute;
  top:0;
  left:0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0,0,0,0.2);
  opacity: 0;
  transition: 0.2s;
  &:hover{
    opacity: 1;
  }
  border-radius: 10px;
`

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.5s;
  color: black;
  &:hover{
    background-color: lightgray;
    transform: scale(1.1);
  }
`


const Product = ({ item }) => {
  const [liked, setLiked] = useState(false);
  return (
    <Container>
        <Image src={item.img}/>
        <Icons>
            <Icon> <ShoppingCartOutlinedIcon /> </Icon>
            <Link to={`/product/${item._id}`}>
              <Icon> <SearchIcon /> </Icon>
            </Link>
            <Icon>  
              {liked ? <FavoriteIcon onClick={() => setLiked(!liked)}/> 
                     : <FavoriteBorderIcon onClick={() => setLiked(!liked)}/>
              } 
            </Icon>
        </Icons>
    </Container>
  )
}

export default Product