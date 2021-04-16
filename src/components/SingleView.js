import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import styled from "styled-components"
import { storage, firestore } from "./config";
function SingleView() {
    let id = window.location.pathname.split("/").pop();

    const [user, setUser] = useState();
    const [url, setURL] = useState("");
    const [fin, setFin] = useState(false);
    useEffect(() => {
        const fetchUsers = async() => {
            const response = firestore.collection('users').doc(id);
            await response.get().then(doc => {
                let vari = doc.data();
                setUser(vari);
                storage.ref('images/')
                    .child(vari.profilePicture)
                    .getDownloadURL().then((url) => {
                        setURL(url);
                        setFin(true);
                        return url;
                    });
            });
        }
        fetchUsers();
    }, []);

    return(
        <div>
        {fin? (
            <React.Fragment>
                <h1>{user.username}</h1>
                <h2>{user.description}</h2>
                <Picture>
                    <img src = {url} alt = "Profile" />
                </Picture>
{/*        follow button that links to paypal && passes in id param          */}
                <Link to={`/cart/${id}`}>
                    AAAAAAAAAAA
                </Link>
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