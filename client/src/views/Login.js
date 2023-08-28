import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth.service";
import styled from "styled-components"
import { useDispatch } from "react-redux"
import { login } from "../redux/userRedux";
import { initiatingCart } from "../redux/cartRedux";
import cartService from "../services/cart.service";


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
  background-color: #6690aa;
  height: 100vh;
`

const ImageContainer = styled.div`
 
`

const Alert = styled.div`
  padding: 10px;
`

const ButtonAndMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`
const OtherLoginMethodes = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
`

const Icons = styled.div`
 display: flex;
 align-items: center;
`

const IconContainer = styled.div`
  width: 50px;
  height: 50px;
  margin-right: 10px;
  background-color: black;
  cursor: pointer;
`

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const form = useRef();
  const checkBtn = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  // Get line login errors(if exist) from cookies
  useEffect(() => {
    if (document.cookie.includes('lineLoginError=')) {
      const loginErrorCookie = document.cookie
        .split('; ')
        .find(row => row.startsWith('lineLoginError='))
        .split('=')[1];
      setMessage(decodeURIComponent(loginErrorCookie));
    }
  }, [])



  const required = (value) => {
    if (!value) {
      return (
        <Alert className="alert alert-danger" role="alert">
          This field is required!
        </Alert>
      );
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login({ username, password })
        .then((res) => {
          dispatch(login(res.data));
          cartService.getUserCart(res.data._id, res.data.token)
            .then(res => {
              dispatch(initiatingCart(res.data));
              navigate("/");
            })
            .catch(err => console.log(err.response.data.msg));
        })
        .catch((err) => {
          const resMessage = err.response.data.msg;
          setLoading(false);
          setMessage(resMessage);
        });
    } else {
      setLoading(false);
    }
  };

  const iconClicked = (methode) => {
    window.location.href = process.env.REACT_APP_API_URL + `auth/${methode}`;
  }

  return (
    <Container>
      <ImageContainer>
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          style={{ width: "100%", height: "100%", borderRadius: "50%" }}
        />
      </ImageContainer>
      <Form onSubmit={handleLogin} ref={form}>
        <div style={{ margin: "10px 5px 0px" }}>
          <Input
            style={{ padding: "10px" }}
            placeholder="username"
            type="text"
            className="form-control"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            validations={[required]}
          />
        </div>
        <div style={{ margin: "10px 5px 0px" }}>
          <Input
            style={{ padding: "10px" }}
            placeholder="password"
            type="password"
            className="form-control"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            validations={[required]}
          />
        </div>
        <ButtonAndMessageContainer className="form-group">
          {message && (
            <Alert className="alert alert-danger" role="alert">
              {message}
            </Alert>
          )}
          <button className="btn btn-primary btn-block" disabled={loading}>
            {loading && (
              <span className="spinner-border spinner-border-sm"></span>
            )}
            <span>Login</span>
          </button>
        </ButtonAndMessageContainer>
        <CheckButton style={{ display: "none" }} ref={checkBtn} />
      </Form>
      <OtherLoginMethodes>
        <p>OR LOGIN WITH</p>
        <Icons>
          <IconContainer>
            <img
              src="./images/google.png"
              alt="google"
              style={{ width: "100%", height: "100%" }}
              onClick={() => iconClicked("google")}
            />
          </IconContainer>

          <IconContainer>
            <img
              src="./images/line.png"
              alt="line"
              style={{ width: "100%", height: "100%" }}
              onClick={() => iconClicked("lineLogin")}
            />
          </IconContainer>
        </Icons>

      </OtherLoginMethodes>
      <div>
        <span><b>Don't have an account?</b></span><Link to="/register" style={{ color: "white", marginLeft: "10px" }}>Create a new One</Link>
      </div>
    </Container>
  );
};
export default Login;