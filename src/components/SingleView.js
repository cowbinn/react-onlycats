import React, { useState, useEffect } from 'react'
import styled from "styled-components"
import {auth, storage, getUser, firestore} from "./config";

const DEFAULT_IMAGE_PATH = 'images/default.png';
function SingleView() {
    let id = window.location.pathname.split("/").pop();

    const [user, setUser] = useState();
    const [url, setURL] = useState("");
    const [fin, setFin] = useState(false);
    useEffect(() => {
        const fetchUsers = async() => {
            const response = firestore.collection('users').doc(id);
            response.get().then(doc => {
                setUser(doc.data());
                storage.ref('images/')
                    .child(doc.data().profilePicture)
                    .getDownloadURL().then((url) => {
                        setURL(url);
                        setFin(true);
                        return url;
                    });
            });
        }
        fetchUsers();
    }, []);

    console.log(user);
    console.log(url);

    return(
        <div>
        {fin? (
            <React.Fragment>
                <h1>{user.username}</h1>
                <h2>{user.description}</h2>
                <Picture>
                    <img src = {url} alt = "Profile" />
                </Picture>
            </React.Fragment>
        ) : (null) }
        </div>

    );
}

export default SingleView

const Picture = styled.div`
    img {
        width: 500px
    }
`