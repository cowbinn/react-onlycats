import React from 'react';
import styled from 'styled-components';
import firebase, { storage, firestore } from "./config";
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

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
            <div key = {index}>
                <Picture>
                    <Link to={`/singleview/${data.uid}`}>
                        <img src= {urls[index]} alt="profile" />
                    </Link>
                </Picture>
                <h2>{data.username}</h2>
                <hr />
            </div>
        )
    });
      return (
        <div>
            { loading ? (<div>Loading...</div>) : 
                (
                    <React.Fragment>
                        {usersList}
                    </React.Fragment>
                )
            }
        </div>
    );
}

export default Home

const Picture = styled.div`
    img {
        width: 140px
    }
`