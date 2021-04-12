import { credentials } from "grpc";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {auth, firestore} from "./config";


const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
 
  const createUserByEmail = (event) => {
 
    event.preventDefault();
      const data={
      email:email,
      password:password,
      displayName: displayName
    }
    
    
    auth.createUserWithEmailAndPassword(email, password).then(cred =>{
      const userRef= firestore.collection('users2').doc(cred.user.uid).set(data);
    })
    
    // const userRef= firestore.collection('users2').doc();
    // const data={
    //   email:email,
    //   password:password,
    //   displayName: displayName
    // }
    // userRef.set(data);
 
    setEmail("");
    setPassword("");
    setDisplayName("");
    console.log("i send it there")
  }
  const onChangeHandler = event => {
    const { name, value } = event.currentTarget;
    if (name === "userEmail") {
      setEmail(value);
      //console.log(email)
    } else if (name === "userPassword") {
      setPassword(value);
      //console.log(password +"here")
    } else if (name === "displayName") {
      setDisplayName(value);
      //console.log(displayName+ "here3")
    }
  };
  return (
    <div >
      <h1 >Sign Up</h1>
      <div>
        <form className="">
          <label>
            UserName:
          </label>
          <input
            type="text"
            name="displayName"
            value={displayName}
            placeholder="JohnDoe123"
            id="UserName"
            onChange={event => onChangeHandler(event)}
            
          />
          <br/>
          <label >
            Email:
          </label>
          <input
            type="email"
            name="userEmail"
            value={email}
            placeholder="JohnDoe123@gmail.com"
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
            value={password}
            placeholder="Your Password"
            id="userPassword"
            onChange={event => onChangeHandler(event)}
          />
          <br/>
          <button onClick={createUserByEmail}>
            Sign up
          </button>
        </form>
        <h3 >
          Already have an account?{" "}
          <Link to="Signin">
            Sign in here
          </Link>
          
        </h3>
      </div>
    </div>
  
  );
};
export default SignUp;