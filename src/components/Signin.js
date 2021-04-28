import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth } from "./config";

import styled from 'styled-components';

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [displayName, setDisplayName] = useState("");
  const history = useHistory()
  
  const loginHandle = (e)=> {
    e.preventDefault();
    auth.signInWithEmailAndPassword(email, password).then ((e)=>{console.log("login successful");history.push("/")}).catch((error)=>{
      alert(error);
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
  // console.log (email, password)
  

  return (
    <SignInBody>
        <SignInCenter>
          <SignInHeading>Log In</SignInHeading>
          <SignInForm method="post">
            <SignInTextFields>
              <SignInInputs
                type="email"
                name="userEmail"
                placeholder="Email Address"
                id="userEmail"
                onChange={event => onChangeHandler(event)}
              />
            </SignInTextFields>
            <SignInTextFields>
              <SignInInputs
                type="password"
                name="userPassword"
                placeholder="Password"
                id="userPassword"
                onChange={event => onChangeHandler(event)}
              />

            </SignInTextFields>
            <div>
              <br/>
              <SignInButton onClick={loginHandle}>
                Log in
              </SignInButton>
            </div>
          </SignInForm>
          <SignInBottomH3>
            Don't Have an Account?{" "}
            <A href="/signup">Register</A>
          </SignInBottomH3>
      </SignInCenter>
    </SignInBody>
    )
}

export default Signin

const SignInBody = styled.body
`
  margin: 0;
  padding: 0;
  background: linear-gradient(120deg, #EEDBD7, #FF7F50);
  height: 100vh;
  overflow: hidden;
`

const SignInCenter = styled.div
`
  position: absolute;
  top: 50%; 
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  background: white;
  border-radius: 20px;
`

const SignInHeading = styled.h1
`
  font-size: 50px;
  text-align: center;
  padding: 20px 0 20px 0;
  border-bottom: 1px solid silver;
  
`

const SignInForm = styled.form
`
  padding: 0 40px;
  box-sizing: border-box;
`

const SignInTextFields = styled.div 
`
  position: relative;
  border-bottom: 2px solid #adadad;
  margin: 30px 0;


`

const SignInInputs = styled.input 
`
  width: 100%;
  padding: 0 5px;
  height: 40px;
  font-size: 16px;
  border: none;
  background: none;
  outline: none;
  &:before {
    content: '';
    position: absolute;
    top: 40px;
    left: 0;
    width: 100%;
    height: 2px;
    background: #2691d9;
  }
`

const SignInButton = styled.button`
  width: 100%;
  height: 50px;
  border: 1px solid;
  background: #2691d9;
  border-radius: 30px;
  color: white;
  font-size: 18px;
  cursor: pointer;
  outline: none;
  &:hover {
    border-color: black;
    transition: 0.5s;
  }
`;

const SignInBottomH3 = styled.h3
`
  margin: 30px 0;
  text-align: center;
  font-size: 16px;
  color: black;
  text-decoration: none;
`
const A = styled.a`
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`