import React from 'react';
import styled from 'styled-components';
import {storage, firestore} from "./config";
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";


function Home() {
    const [users, setUsers] = useState([])
    const [url, setURL] = useState("");
    const fetchUsers = async() => {
        const response = firestore.collection('users');
        const data = await response.get();
        data.docs.forEach(item=> {
            setUsers([...users, item.data()]);
        })
    }

    useEffect(() => {
        fetchUsers();
      }, [])
      
      // Method for finding users.
      //console.log(users.find(username => "Michael"));
      
      async function getImg(user) {
        var str = "images/" + user.profilePicture;
        storage.ref().child(str).getDownloadURL().then((url) => {
            setURL(url);
          });
      }

      return (
        <div>
            {
                users && users.map(user=> {
                    getImg(user);
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
            }
        </div>
    );
}

export default Home

const Picture = styled.div`
    img {
        width: 500px
    }
`