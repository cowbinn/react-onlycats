import React from 'react'
import './App.css'
import firebase from './components/config.js'

import Favorite from './components/Favorite.js'
import Profile from './components/Profile.js'
import Cart from './components/Paypal.js'
import Home from './components/Home.js'
import Contactus from './components/ContactUs.js'
import Aboutus from './components/AboutUs.js'
import SingleView from './components/SingleView.js'
import OrderHistory from './components/OrderHistory.js'
import SignUp from "./components/SignUp"
import SignIn from "./components/Signin.js"
import { BrowserRouter as Router,Switch, Route } from "react-router-dom"

import Uploadpage from './components/Uploadpage'
import PrivateRoute from './routers/PrivateRoute'

function App() {
  // var cUser= firebase.auth().currentUser ;
  firebase.auth().onAuthStateChanged(function (user){
    if(user){
      console.log("current user login is: "+user.email);
      // console.log ("now user = "+ cUser.email);
    }
    else {
      console.log("not log in")
      // cUser.email= null;
    }
  });
  
  return (
    <Router>
      <div className="App">
        
        <Switch>
          <PrivateRoute path="/favorites" component={Favorite} />
          <PrivateRoute path="/upload" component={Uploadpage} />
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute path="/cart" component={Cart} />
          <PrivateRoute path="/contactus" component={Contactus} />
          <PrivateRoute path="/aboutus" component={Aboutus} />
          <PrivateRoute path="/singleview" component={SingleView} />
          <PrivateRoute path="/orderhistory" component={OrderHistory} />
          <Route path="/signup" component={SignUp} />
          <Route path="/signin" component={SignIn}/>
          <PrivateRoute path="/"  component={Home} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
