import React from 'react';
import styled from 'styled-components';
import {storage, firestore} from "./config";
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";


function Home() {
    const [users, setUsers] = useState([]);
    const [urls, setURLs] = useState([]);
    const [fin, setFin] = useState(false);

    let usersList = [];
    useEffect(() => {
        const fetchUsers = async() => {
            const response = firestore.collection('users');
            const data = await response.get();
            data.docs.forEach(item=> {
                setUsers([...users, item.data()]);
                storage.ref('images/').child(item.data().profilePicture).getDownloadURL().then((url) => {
                    setURLs([...urls, url]);
                    setFin(true);
                });
            })
        }
        fetchUsers();
      }, [])
      
      // Method for finding users.
      //console.log(users.find(username => "Michael"));
      if(fin) {
        var wis = (fin ? users[0].id : null);
        console.log(wis);
      }
      return (
        <div>
            {/* {fin ? (
                users && users.map(user=> {
                    //<li> here gets rid of the returns, but would fix a harmless error on console.
                    return(
                        <div className = "users-container">
                            <h1>{user.username}</h1>
                            <Link to={`/singleview/QmrbX9ugY2PneQRfcyWq`}>
                                <Picture>
                                    <img src= {url} alt="profile" />
                                </Picture>
                            </Link>
                        </div>
                    )
                })
            ) : (null) }  */}
        </div>
    );
}

export default Home

const Picture = styled.div`
    img {
        width: 500px
    }
`