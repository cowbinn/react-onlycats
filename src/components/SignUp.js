import React, { useState } from "react";
import { Link } from "react-router-dom"
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const createUserByEmail= (event, email, password) => {
    event.preventDefault();
    setEmail("");
    setPassword("");
    setDisplayName("");
  };
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
          <button
            onClick={event => {
              createUserByEmail(event, email, password);
            }}
          >
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