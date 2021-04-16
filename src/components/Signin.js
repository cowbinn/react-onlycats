import React, { useState } from "react";
import { Link } from "react-router-dom";
import {auth, firestore} from "./config";


const Signin = () => {
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
            /*onChange={event => onChangeHandler(event)}*/
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
            /*onChange={event => onChangeHandler(event)}*/
          />
          <br/>
          <button >
            Log in
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
