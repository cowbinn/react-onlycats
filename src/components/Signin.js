import React, { useState } from "react";
import { Link } from "react-router-dom";
import {auth, firestore} from "./config";


const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [displayName, setDisplayName] = useState("");
  
  const loginHandle = (e)=> {
    e.preventDefault();
    auth.signInWithEmailAndPassword(email, password).then ((e)=>{console.log("login successful");}).catch((error)=>{
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
  const logouthandle = event =>{
    auth.signOut()
  }
  
  
  
  
  
  
  return (
        <div >
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
          <button onClick={loginHandle}>
            Log in
          </button>
          <button onClick={logouthandle}>
            logout
          </button>
        </form>
        <h3 >
          Don't Have an Account?{" "}
          <Link to="/signup">
            Register
          </Link>
          
        </h3>
      </div>
    </div>
    )
}

export default Signin
