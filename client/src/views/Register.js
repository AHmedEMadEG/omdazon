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
  padding: 10px;
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

  return (
    <Container className="col-md-12">
      <ImageContainer>
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          style={{width: "100%", height: "100%", borderRadius: "50%"}}
          />
      </ImageContainer>
        <Form style={{display: "flex", flexWrap: "wrap", justifyContent: "center", width: "490px", margin: "20px"}} onSubmit={handleRegister} ref={form}>
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
        <div>
          <span><b>Have an account?</b></span><Link to="/login" style={{ color: "white", marginLeft: "10px"}}>Login</Link>
        </div>
    </Container>
  );
};
export default Register;