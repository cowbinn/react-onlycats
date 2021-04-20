import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {auth, firestore} from "./config";
import './signup.css'

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
        favorites: [],
        img: [],
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
    <SignUpContainer>
      <div id="signup-label"><h1>Sign Up</h1></div>
      <div>
        <div id="signup-field">
          <form className="">
            <div id="signup-field">
              <label>
                UserName:
              </label>
              <br/>
              <input
                type="text"
                name="displayName"
                value={displayName}
                placeholder="Enter Username"
                id="UserName"
                onChange={event => onChangeHandler(event)}
              
              />
            </div>
            <br/>
            <div id="signup-field">
              <label >
                Email:
              </label>
              <br/>
              <input type="email" name="userEmail"
                value={email}
                placeholder="Enter Email"
                id="userEmail"
                onChange={event => onChangeHandler(event)}
              />
            </div>
            
            <br/>
            <div id="signup-field">
              <label>
                Password:
              </label>
              <br/>
              <input
                className="test"
                type="password"
                name="userPassword"
                value={password}
                placeholder="Enter Password"
                id="userPassword"
                onChange={event => onChangeHandler(event)}
              />
            </div>
            
          
          <br/>
            <div id="signup-button">
              <button onClick={createUserByEmail}>
                Sign up
              </button>
            </div>
          </form>
          
        </div>
        <h3 >
          Already have an account?{" "}
          <Link to="Signin">
            Sign in here
          </Link>
          
        </h3>
      </div>
    </SignUpContainer>
  );
};
export default SignUp;

const SignUpContainer = styled.div`
  
`