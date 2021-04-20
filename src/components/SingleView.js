import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import styled from "styled-components"
import firebase, { storage, firestore } from "./config";
function SingleView() {
    let id = window.location.pathname.split("/").pop();
    var currUserID;
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            currUserID = firebase.auth().currentUser.uid;
        } else {
            // No user is signed in.
        }
    });

    const [img, setImg] = useState([]);
    const [user, setUser] = useState();
    const [url, setURL] = useState("");
    const [fin, setFin] = useState(false);
    const [imgFin, setImgFin] = useState(false);
    const [isSubbed, setIsSubbed] = useState(false);
    useEffect(() => {
        const response = firestore.collection('users').doc(id);

        const fetchUsers = async() => {
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

        // iterates through current user's favorites list
        // if the viewed user's uid is there, display the viewed's img array
        const fetchImg = async() => {
            const curr = firestore.collection('users').doc(currUserID);
            await curr.get().then(doc => {
                let currUserFav = doc.data().favorites;
                currUserFav.forEach(element => {
                    if(element === id) {
                        response.get().then(doc => {
                            let imgList = doc.data().img;
                            if(imgList.length < 2) {
                                console.log("there are no images.");
                            } else {
                                imgList.slice(1).forEach(element => {
                                    firestore.collection('users').doc(element).get().then(item => {
                                        let varo = item.data();
                                        storage.ref('images/').child(varo.profilePicture).getDownloadURL().then((url) => {
                                            setImg(img => [...img, url]);
                                        });
                                    });
                                });
                            }
                            setIsSubbed(true);
                        });
                    }
                });
            });
            setImgFin(true);
        }
        fetchUsers();
        fetchImg();
    }, []);

    const imageList = function() {
        if(isSubbed) {
            console.log("subbed")
            if(img.length > 1) {
                img.map((url, index) => {
                    return(
                        <div key = {index}>
                            <Picture>
                                <img src = {url} alt = "images" />
                            </Picture>
                        </div>
                    )
                })
            } else {
                return(
                    <div>
                        <h1>
                            This user has no images yet!
                        </h1>
                    </div>
                )
            }
        } else {
            return(
                <div>
                    <h1>
                        Subscribe to this user to access their images!
                    </h1>
                </div>
            )
        }
    };

    return(
        <div>
        {fin && imgFin ? (
            <React.Fragment>
                <h1>{user.username}</h1>
                <h2>{user.description}</h2>
                <Picture>
                    <img src = {url} alt = "Profile" />
                </Picture>
{/*        follow button that links to paypal && passes in id param          */}
                <Link to={`/cart/${id}`}>
                    <button disabled={isSubbed}>Follow</button>
                </Link>
                {imageList()}
            </React.Fragment>
        ) : (null) }
        </div>

    );
}

export default SingleView

const Picture = styled.div`
    img {
        border-radius: 25px;
        border: 2px solid #7F85F4;
        width: 500px
    }
`