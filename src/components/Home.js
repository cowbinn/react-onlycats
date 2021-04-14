import React from 'react';
import styled from 'styled-components';
import {storage, firestore} from "./config";
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";


function Home() {
    const [users, setUsers] = useState([]);
    const [urls, setURLs] = useState([]);
    // counter based on num of total items.
    let [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const fetchUsers = async() => {
            const response = firestore.collection('users').limit(10);
            const data = await response.get();
            data.docs.forEach(item=> {
                storage.ref('images/').child(item.data().profilePicture).getDownloadURL().then((url) => {
                    setUsers(users => [...users, item.data()]);
                    setURLs(urls => [...urls, url]);
                    setLoading(false);
                });
            });
        }
        fetchUsers();
      }, [])
      // {homes.map(home => <div>{home.name}</div>)}
    const usersList = users.map((data, index)=>{
        return(
            <div key = {index}>
                <Link to={`/singleview/${data.uid}`}>
                    <Picture>
                        <img src= {urls[index]} alt="profile" />
                    </Picture>
                </Link>
                <h2>{data.username}</h2>
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