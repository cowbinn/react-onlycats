import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {auth, firestore} from "./config";

import styled from 'styled-components';

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const history = useHistory();
 
  const createUserByEmail = (event) => {
 
    event.preventDefault();
      const data = {
        email:email,
        password:password,
        username: displayName,
        description: 'default',
        favorites: ["NULL"],
        img: ["NULL"],
        profilePicture: 'default.png'
    }
    
    auth.createUserWithEmailAndPassword(email, password).then(cred =>{
      const userRef= firestore.collection('users').doc(cred.user.uid).set(data);
      var setWithMerge = firestore.collection('users').doc(cred.user.uid).set({
        uid: cred.user.uid
      }, { merge: true });
    })

    setEmail("");
    setPassword("");
    setDisplayName("");
    //console.log("i send it there")
    history.push("/signin")
  }
  const onChangeHandler = event => {
    const { name, value } = event.currentTarget;
    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    } else if (name === "displayName") {
      setDisplayName(value);
    }
  };
  
  return (
    <SignUpBody>
      <SignUpCenter>
      <SignUpHeading>Sign Up</SignUpHeading>
          <SignUpForm>
            <SignUpTextFields>
              <SignUpInputs
                type="text"
                name="displayName"
                value={displayName}
                placeholder="Enter Username"
                id="UserName"
                onChange={event => onChangeHandler(event)}
              
              />
            </SignUpTextFields>
            <SignUpTextFields>
              <SignUpInputs
                type="email" name="userEmail"
                value={email}
                placeholder="Enter Email"
                id="userEmail"
                onChange={event => onChangeHandler(event)}
              />
            </SignUpTextFields>
            <SignUpTextFields>
              <SignUpInputs
                className="test"
                type="password"
                name="userPassword"
                value={password}
                placeholder="Enter Password"
                id="userPassword"
                onChange={event => onChangeHandler(event)}
              />
            </SignUpTextFields>
            <div>
              <SignUpButton onClick={createUserByEmail}>
                Sign up
              </SignUpButton>
            </div>
          </SignUpForm>

        <SignUpBottomH3 >
          Already have an account?{" "}
          <A href="/signin">Sign In</A>
        </SignUpBottomH3>
      </SignUpCenter>
    </SignUpBody>
  );
};
export default SignUp;

const SignUpBody = styled.body`
  margin: 0;
  padding: 0;
  background: linear-gradient(120deg, #EEDBD7, #FF7F50);
  height: 100vh;
  overflow: hidden;
`

const SignUpHeading = styled.h1
`
  font-size: 50px;
  text-align: center;
  padding: 20px 0 20px 0;
  border-bottom: 1px solid silver;
`

const SignUpCenter = styled.div
`
  position: absolute;
  top: 50%; 
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  background: white;
  border-radius: 20px;
`

const SignUpForm = styled.form
`
  padding: 0 40px;
  box-sizing: border-box;
`

const SignUpTextFields = styled.div
`
  position: relative;
  border-bottom: 2px solid #adadad;
  margin: 30px 0;
`

const SignUpInputs = styled.input
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

const SignUpButton = styled.button
`
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
`

const SignUpBottomH3 = styled.h3
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