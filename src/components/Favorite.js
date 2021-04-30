import React from 'react';
import styled from 'styled-components';
import firebase, { storage, firestore } from "./config";
import { useState, useEffect } from 'react';
import { Link, useHistory } from "react-router-dom";

function Favorite() {
    var history = useHistory();

    // get curr user.
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

    // this is probably super inefficient but I don't know how else to do it lol
    useEffect(() => {
        setLoading(true);
        const fetchUsers = async() => {
            console.log(currUserID);
            const response = firestore.collection('users').doc(currUserID);
            await response.get().then(doc => {
                if(doc.exists) {
                    console.log(doc.data());
                    if(doc.data().favorites.length < 2) {
                        setLoading(false);
                    } else {
                        doc.data().favorites.slice(1).forEach(element => {
                            firestore.collection('users').doc(element).get().then(item => {
                                let varo = item.data();
                                storage.ref('images/').child(varo.profilePicture).getDownloadURL().then((url) => {
                                    setUsers(users => [...users, varo]);
                                    setURLs(urls => [...urls, url]);
                                    setLoading(false);
                                });
                            });
                        });
                    }
                } else {
                    console.log("whoops");
                }

            });

        }
        fetchUsers();
        return () => (false)
      }, [])

    function handleClick(id, index) {
        if(window.confirm("Are you sure you want to unfollow this user?")){
            firestore.collection('users').doc(currUserID).update({
                "favorites":
                  firebase.firestore.FieldValue.arrayRemove(id)
            }).then(function(details) {
                history.push("/favorites")
            }).then(function() {
                users.splice(index, 1);
                urls.splice(index, 1);
                setLoading(true);
                setLoading(false);
            });
        }
    }

      // {homes.map(home => <div>{home.name}</div>)}
    const usersList = function() {
        if(urls.length > 0) {
            return(
                users.map((data, index)=>{
                    return(
                        <FavoriteUsers key = {index}>
                            <Picture>
                                <Link to={`/singleview/${data.uid}`}>
                                    <img src= {urls[index]} alt="profile" />
                                </Link>
                            </Picture>
                            <h2>{data.username}</h2>
                            <FollowButton onClick = {(e) => {
                                e.preventDefault();
                                handleClick(data.uid, index)}}>
                                    Stop Following
                            </FollowButton>
                        </FavoriteUsers>
                    )
                })
            );
        } else {
            return(
                <div>
                    <h2>Your subscriber list is empty!</h2>
                </div>
            );
        }
    };
      return (
        <FavoriteBody>
            <FavoriteContainer>
                { loading ? (<div>Loading...</div>) : 
                    (
                        <React.Fragment>
                            {usersList()}
                            <br />
                        </React.Fragment>
                    )
                }
            </FavoriteContainer>
        </FavoriteBody>
    );
}

export default Favorite

const FavoriteBody = styled.body
`
  margin: 0;
  padding: 0;
  height: 86vh;
  overflow: hidden;
`

const FavoriteContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
`
const FavoriteUsers = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 10px;
`
const FollowButton = styled.button`
    width: 8rem;
    height: 46px;
    border: 1px solid;
    background: #2691d9;
    border-radius: 30px;
    color: white;
    font-size: 14px;
    cursor: pointer;
    outline: none;
    margin-left: 1rem;
    &:hover {
        border-color: black;
        transition: 0.3s;
    }
`

const Picture = styled.div`
    img {
        border-radius: 25px;
        border: 2px solid #7F85F4;
        width: 140px
    }
`