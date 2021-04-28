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
                            console.log(imgList.length, imgList);
                            if(imgList.length < 2) {
                                console.log("there are no images.");
                            } else {
                                imgList.slice(1).forEach(element => {
                                    console.log(element);
                                    storage.ref('images/').child(element).getDownloadURL().then((url) => {
                                        setImg(img => [...img, url]);
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
            if(img.length > 0) {
                return(
                    img.map((urll, index) => {
                        return(
                            <div key = {index}>
                                <ImgListPicture>
                                    <img src= {urll} alt="profile" />
                                </ImgListPicture>
                            </div>
                        )
                    })
                );
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
        <SingleViewContainer>
        {fin && imgFin ? (
            <React.Fragment>
                <Content>
                    <UsernameAndFollow>
                        <h1>{user.username}</h1>
                        <Link to={`/cart/${id}`}>
                            <FollowButton disabled={isSubbed}>Follow</FollowButton>
                        </Link>
                    </UsernameAndFollow>
                    
                    <DescriptionH2>Description: {user.description}</DescriptionH2>
                    <Picture>
                        <img src = {url} alt = "Profile" />
                    </Picture>
                    {console.log("using img list as intended")}
                    <hr style = {{margin: 12}}/>
                    <ImgListContainer>
                        {imageList()}
                    </ImgListContainer>
                </Content>
            </React.Fragment>
        ) : (null) }
        </SingleViewContainer>

    );
}

export default SingleView

const SingleViewContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`
const ImgListContainer = styled.div`
    display: flex;
    justify-content: center;
`

const ImgListPicture = styled.div `
    img {
        border-radius: 25px;
        border: 2px solid #7F85F4;
        width: 200px
    }
`
const Content = styled.div`
`

const UsernameAndFollow = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
    text-decoration: underline;
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
    &:disabled { 
        color: white;
        background: white;
        font-weight: bold;
        font-size: 18px;
        cursor: default;
        border-color: white;
    }
`

const DescriptionH2 = styled.h2`
    margin-top: 1rem;
    margin-bottom: 1rem;
`

const Picture = styled.div`
    img {
        border-radius: 25px;
        border: 2px solid #7F85F4;
        width: 500px
    }
`