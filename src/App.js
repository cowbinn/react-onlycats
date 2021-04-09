import React from 'react'
import './App.css'
import Header from './components/Header.js'
import Favorite from './components/Favorite.js'
import Profile from './components/Profile.js'
import Cart from './components/Cart.js'
import Home from './components/Home.js'
import Contactus from './components/ContactUs.js'
import Aboutus from './components/AboutUs.js'
import SingleView from './components/SingleView.js'
import OrderHistory from './components/OrderHistory.js'
import SignUp from "./components/SignUp"
import { BrowserRouter as Router,Switch, Route } from "react-router-dom"

import Uploadpage from './components/Uploadpage'

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/favorites">
            <Favorite/>
          </Route>
          <Route path="/Uploadpage">
            <Uploadpage/>
          </Route>
          <Route path="/profile">
            <Profile/>
          </Route>
          <Route path="/cart">
            <Cart/>
          </Route>
          <Route path="/contactus">
            <Contactus/>
          </Route>
          <Route path="/aboutus">
            <Aboutus/>
          </Route>
          <Route path="/singleview">
            <SingleView/>
          </Route>
          <Route path="/orderhistory">
            <OrderHistory/>
          </Route>
          <Route path="/signup">
            <SignUp/>
          </Route>
          <Route path="/">
            <Home/>
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
