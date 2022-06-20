import styled from "styled-components"
import { categories } from "../data"
import Category from "./Category"
import { mobile } from "../responsive"


const Container = styled.div`
    display: flex;
    ${mobile({flexDirection: "column"})};
`


const Categories = () => {
  return (
    <Container>
        {categories.map(item =>  
            <Category item={item} key={item.id}/>
        )}
    </Container>
  )
}

export default Categories