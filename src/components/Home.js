//import React from 'react';
import styled from 'styled-components';
import firebase, { storage, firestore } from "./config";
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import React from "react";

import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./carousel.css"

function Home() {
    var currUserID;
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            currUserID = firebase.auth().currentUser.uid;
        } else {
          // No user is signed in.
          // uh idk what to do here tbh
        }
    });

    const [users, setUsers] = useState([]);
    const [urls, setURLs] = useState([]);
    // counter based on num of total items.
    let [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        
        const fetchUsers = async() => {
            const response = firestore.collection('users');
            const data = await response.get();
            data.docs.forEach(item=> {
                if(currUserID === item.data().uid) {}
                else {
                    storage.ref('images/').child(item.data().profilePicture).getDownloadURL().then((url) => {
                        setUsers(users => [...users, item.data()]);
                        setURLs(urls => [...urls, url]);
                        setLoading(false);
                    });
                }
            });
        }
        fetchUsers();
        return () => (false)
      }, [])
      // {homes.map(home => <div>{home.name}</div>)}
    const usersList = users.map((data, index)=>{
        return(

                <div className="image" key = {index}>
                    <Link to={`/singleview/${data.uid}` } style={{ textDecoration: 'none', color: '#000'}}>
                        <UsernameDisplayed>{data.username}</UsernameDisplayed>
                    </Link>
                    <img src= {urls[index]} alt="profile" />
                </div>
        )
    });
      return (
        <div>
            { loading ? (<div>Loading...</div>) : 
                (
                    <React.Fragment>
                        <Carousel infiniteloop autoPlay renderIndicator = {false}>
                            {usersList}
                        </Carousel>
                    </React.Fragment>
                )
            }
        </div>
    );
}

export default Home


// const CardWrapper = styled.div`
//     a { 
//         text-decoration: none;
//         color: black;
//     }
    
// `

const UsernameDisplayed = styled.h2
`
    border: 1px solid #EEDBD7;
    margin-top: 1rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
    margin-bottom: 1rem;
    border-radius: 25px;
    background: white;
    &:hover {
        border-color: black;
        transition: 0.3s;
    }
`
