import React from 'react'
import { Route, Redirect } from 'react-router'
import firebase from '../components/config.js'
import Header from '../components/Header.js'

export default function PrivateRoute({ component: Component, ...rest}) {
    //const currentUser = null;
    let user = firebase.auth().currentUser;

    return (
        
        <Route 
            {...rest}
            render = {props => {
                return user ? (
                        <div>
                            <Header/>
                            <Component { ...props} />
                        </div>
                        
                    ) : (
                        <Redirect to="/signin" />
                    )
            }}
        >

        </Route>
    )
}
