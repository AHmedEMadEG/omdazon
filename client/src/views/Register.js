import { useState, useRef } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import AuthService from "../services/auth.service";
import styled from "styled-components"
import cartService from "../services/cart.service";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 0.8) 100%)
        ,url("./images/register.jpeg");
  background-size: cover;
  height: 100vh;
  @media screen and (max-height: 605px) {
    @media screen and (max-height: 400px) {
      @media screen and (max-height: 300px) {
      height: 310vh;
    }
      height: 200vh;
    }
    height: 155vh;
  }
`

const FormContainer = styled.div`
  border: 2px solid grey;
  border-radius: 10px;
`

const Alert = styled.div`
  padding: 10px;
`

const ButtonAndMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
`

const OtherSignupMethodes = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px 0;

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

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Register = () => {
  const navigate = useNavigate();

  const form = useRef();
  const checkBtn = useRef();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  
  // VALIDATIONS
  const required = (value) => {
    if (!value) {
      return (
        <Alert className="alert alert-danger" role="alert">
          This field is required!
        </Alert>
      );
    }
  };
  const validEmail = (value) => {
    if (!isEmail(value)) {
      return (
        <Alert className="alert alert-danger" role="alert">
          This is not a valid email.
        </Alert>
      );
    }
  };
  const vname = (value) => {
      if (value.length < 3 || value.length > 20) {
        return (
          <Alert className="alert alert-danger" role="alert">
            3 to 20 characters
          </Alert>
        );
      }
    };
  const vusername = (value) => {
    if (value.length < 3 || value.length > 20) {
      return (
        <Alert className="alert alert-danger" role="alert">
          3 to 20 characters
        </Alert>
      );
    }
  };
  const vpassword = (value) => {
    if (value.length < 6 || value.length > 40) {
      return (
        <Alert className="alert alert-danger" role="alert">
          6 to 40 characters
        </Alert>
      );
    }
  };

  // FORM SUBMISSION
  const handleRegister = (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      AuthService.register({name, username, email, password})
      .then((res) => {
          cartService.createCart(res.data._doc._id);
          navigate("/login");
        })
        .catch((err) => {
          const resMessage = err.response.data.msg;
          setMessage(resMessage);
          setLoading(false);
        });
    }else {
      setLoading(false);
    }
  };

  const iconClicked = (methode) => {
    window.location.href = process.env.REACT_APP_API_URL + `auth/${methode}`;
  }

  return (
    <Container className="col-md-12">
      <FormContainer>
        <Form style={{padding: "25px"}} onSubmit={handleRegister} ref={form}>
              <div style={{margin: "10px 5px 0px"}}>
                <Input
                  style={{padding: "10px"}}
                  placeholder="name"
                  type="text"
                  className="form-control"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  validations={[required, vname]}
                />
              </div>
              <div style={{margin: "10px 5px 0px "}}>
                <Input
                  style={{padding: "10px"}}
                  placeholder="username"
                  type="text"
                  className="form-control"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  validations={[required, vusername]}
                  />
              </div>
              <div style={{margin: "10px 5px 0px"}}>
                <Input
                  style={{padding: "10px"}}
                  placeholder="email"
                  type="text"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  validations={[required, validEmail]}
                />
              </div>
              <div style={{margin: "10px 5px 0px"}}>
                <Input
                  style={{padding: "10px"}}
                  placeholder="password"
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  validations={[required, vpassword]}
                />
              </div>
          <ButtonAndMessageContainer>
                {message && (
                  <Alert
                  className="alert alert-danger"
                  role="alert"
                  >
                    {message}
                  </Alert>
                )}
                <button className="btn btn-primary btn-block" disabled={loading}>
                  { loading && ( 
                    <span className="spinner-border spinner-border-sm"></span>
                    )}
                  <span>Sign Up</span>
                </button>
          </ButtonAndMessageContainer>
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </FormContainer>
      <OtherSignupMethodes>
        <p><b>OR SIGNUP WITH</b></p>
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
      </OtherSignupMethodes>            
        <LoginContainer>
          <p><b>Have an account?</b></p>
          <Link to="/login" style={{ color: "white", textDecoration: "none", border: "1px solid #0d6efd", borderRadius: "5px", padding: "5px", backgroundColor: "#0d6efd" }}>
            Login
          </Link>
        </LoginContainer>
    </Container>
  );
};
export default Register;