import React from 'react';
import styled from 'styled-components';
import firebase, { storage, firestore } from "./config";
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

function Favorite() {
    // get curr user.

    const [users, setUsers] = useState([]);
    const [urls, setURLs] = useState([]);

    // counter based on num of total items.
    let [loading, setLoading] = useState(false);

    // this is probably super inefficient but I don't know how else to do it lol
    useEffect(() => {
        let isMounted = true;
        setLoading(true);
        const currUserID = firebase.auth().currentUser.uid;
        const fetchUsers = async() => {
            const response = firestore.collection('users').doc(currUserID);
            await response.get().then(doc => {
                console.log(doc.data());
                var vari = doc.data().favorites;
                if(vari.length < 2) {
                    setLoading(false);
                } else {
                    vari.slice(1).forEach(element => {
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
            });

        }
        fetchUsers();
        return () => (isMounted = false)
      }, [])

      // {homes.map(home => <div>{home.name}</div>)}
    const usersList = users.map((data, index)=>{
        if(urls.length > 1) {
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
        }
        return(
            <div>
                <h2>Your subscriber list is empty!</h2>
            </div>
        );
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

export default Favorite

const Picture = styled.div`
    img {
        width: 140px
    }
`