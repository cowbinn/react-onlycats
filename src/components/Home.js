import React from 'react';
import styled from 'styled-components';
import {storage, firestore} from "./config";
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

function Home() {
    const [users, setUsers] = useState([])
    const fetchUsers = async() => {
        const response = firestore.collection('users');
        const data = await response.get();
        data.docs.forEach(item=> {
            setUsers([...users, item.data()])
        })
    }

    useEffect(() => {
        fetchUsers();
      }, [])
      
      // Method for finding users.
      //console.log(users.find(username => "Michael"));
      
      async function getImg(user) {
        var str = "images/" + user.profilePicture;
        const img = await storage.ref().child(str).getDownloadURL();
        console.log(img);
        return img;
      }

      return (
        <div>
            {
                users && users.map(user=> {
                    //<li> here gets rid of the returns, but would fix a harmless error on console.
                    console.log(getImg(user));
                    return(
                        <div className = "users-container">
                            <h1>{user.username}</h1>
                            <Link to={`/singleview/${user.username}`}>
                                <Picture>
                                    <img src= {getImg(user)} alt="profile" />
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