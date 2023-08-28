import { Link } from "react-router-dom"

const Consent = () => {
    return (
        <div>
            <p>We'd like to access: </p>
            <p>- Profile info</p>
            <p>- User Identifier</p>
            <p>- Email Address(Optional)</p>
            <Link to="/login"  style={{ color: "red", marginRight: "10px", textDecoration:"none", fontSize:"25px"}}>Cancel</Link> 
            <a href={process.env.REACT_APP_API_URL + 'auth/line'}
            style={{ color: "green", textDecoration:"none", fontSize:"25px"}}
            >Confirm</a>
        </div>
    )
}

export default Consent