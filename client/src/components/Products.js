import styled from "styled-components";
import Product from "./Product";
import { mobile } from "../responsive";
import { useEffect, useState } from "react";
import ProductsService from "../services/products.service";


const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  background-color: lightgray;
  justify-content: center;
  ${mobile({marginTop: "10px"})};
`


const Products = ({cat, filters, sort}) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    ProductsService.getAllProducts(cat).then(res => {
      setProducts(res.data);
    })
  },[cat]);

  useEffect(() => {
    cat && setFilteredProducts(
      products.filter(item => 
      Object.entries(filters).every(([key, value]) => 
        item[key].includes(value)
        )
      )
    );
  },[products,cat,filters]);

  useEffect(() => {
    if(sort === "newest"){
      setFilteredProducts((prev) =>
          [...prev].sort((a,b) => b.createdAt - a.createdAt)
        );
    }
    else if(sort === "asc"){
      setFilteredProducts((prev) => 
        [...prev].sort((a,b) => a.price - b.price)
      );
    }else{
        setFilteredProducts((prev) => 
          [...prev].sort((a,b) => b.price - a.price)
        );
      }
  },[sort]);
  
  
  return (
    <Container>
        {cat 
          ? filteredProducts.map((item) => (
          <Product item={item} key={item._id} />
        ))
          : products.map((item) => (
          <Product item={item} key={item._id} />
        ))}
    </Container>    
  )
}

export default Products