import React from 'react'
import './App.css'
import Header from './components/Header.js'
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

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/favorites" component={Favorite} />
          <Route path="/Uploadpage" component={Uploadpage} />
          <Route path="/profile" component={Profile} />
          <Route path="/cart" component={Cart} />
          <Route path="/contactus" component={Contactus} />
          <Route path="/aboutus" component={Aboutus} />
          <Route path="/singleview" component={SingleView} />
          <Route path="/orderhistory" component={OrderHistory} />
          <Route path="/signup" component={SignUp} />
          <Route path="/signin" component={SignIn}/>
          <Route path="/"  component={Home} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
