import React from 'react';
import styled from 'styled-components';
import {storage, firestore} from "./config";
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

function Favorite() {
    // get curr user.
    let currUserID = 'QmrbX9ugY2PneQRfcyWq';
    const [users, setUsers] = useState([]);
    const [urls, setURLs] = useState([]);

    // counter based on num of total items.
    let [loading, setLoading] = useState(false);

    // this is probably super inefficient but I don't know how else to do it lol
    useEffect(() => {
        setLoading(true);
        const fetchUsers = async() => {
            const response = firestore.collection('users').doc(currUserID);
            await response.get().then(doc => {
                let vari = doc.data().favorites;

                vari.forEach(element => {
                    firestore.collection('users').doc(element).get().then(item => {
                        let varo = item.data();
                        storage.ref('images/').child(varo.profilePicture).getDownloadURL().then((url) => {
                            setUsers(users => [...users, varo]);
                            setURLs(urls => [...urls, url]);
                            setLoading(false);
                        });
                    });
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

export default Favorite

const Picture = styled.div`
    img {
        width: 140px
    }
`