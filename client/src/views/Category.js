import styled from "styled-components";
import Products from "../components/Products";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })};
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })};
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })};
`;
const Option = styled.option``;


const Category = () => {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");

  const filterHandle = (e) => {
    const value = e.target.value;
    if(value === "Color"){
      delete filters.color;
      setFilters({...filters});
    }
    else if(value === "Size"){
      delete filters.size;
      setFilters({...filters});
    }else{
      setFilters({
      ...filters,
      [e.target.name]: value
    });
    }
  }

  const sortHandle = (e) => {
    const value = e.target.value;
    setSort(value);
  }

  return (
    <Container>
      <Navbar/>
      <Title>{cat}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select defaultValue="Color" name="color" onChange={filterHandle}>
            <Option>
              Color
            </Option>
            <Option>white</Option>
            <Option>black</Option>
            <Option>red</Option>
            <Option>blue</Option>
            <Option>yellow</Option>
            <Option>green</Option>
          </Select>
          <Select defaultValue="Size" name="size" onChange={filterHandle}>
            <Option>
              Size
            </Option>
            <Option>XS</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
          </Select>
        </Filter>
        <Filter >
          <FilterText>Sort Products:</FilterText>
          <Select defaultValue="newest" onChange={sortHandle}>
            <Option value="newest">Newest</Option>
            <Option value="asc">Price (asc)</Option>
            <Option value="desc">Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products cat={cat} filters={filters} sort={sort} />
    </Container>
  )
}

export default Category