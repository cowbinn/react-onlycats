import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth } from "./config";

import styled, { css } from 'styled-components';

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [displayName, setDisplayName] = useState("");
  const history = useHistory()
  
  const loginHandle = (e)=> {
    e.preventDefault();
    auth.signInWithEmailAndPassword(email, password).then ((e)=>{console.log("login successful");history.push("/")}).catch((error)=>{
      console.log(error);
    });

  }
  const onChangeHandler = event => {
    const { name, value } = event.currentTarget;
    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    } 
  };
  console.log (email, password)
  

  return (
    <SignInSection >
      <SignInContainer>
        <h1 >Log In</h1>
        <div>
          <form className="">
            <label >
              Email:
            </label>
            <input
              type="email"
              name="userEmail"
              
              placeholder="Enter Email"
              id="userEmail"
              onChange={event => onChangeHandler(event)}
            />
            <br/>
            <label>
              Password:
            </label>
            <input
              type="password"
              name="userPassword"
              
              placeholder="Enter Password"
              id="userPassword"
              onChange={event => onChangeHandler(event)}
            />
            <br/>
            <SignInButton onClick={loginHandle}>
              Log in
            </SignInButton>
          </form>
          <h3 >
            Don't Have an Account?{" "}
            <Link to="/signup">
              Register
            </Link>
            
          </h3>
      </div>
      </SignInContainer>
    </SignInSection>
    )
}

export default Signin

const SignInSection = styled.section
`
  border: 10px solid red;
  height: 90vh
`

const SignInContainer = styled.div`
  border: 10px solid blue;
  max-width: 700px;
  width: 100%;

  height: 50vh;
  align-items: center;
  justify-content: center;

  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;

  h1 {
    font-size: 40px;
    text-align: center;
  }
`

const SignInButton = styled.button`
  background: red;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0.5em 1em;
  padding: 0.25em 1em;

  ${props => props.primary && css`
    background: red;
    color: white;
  `}
`;
