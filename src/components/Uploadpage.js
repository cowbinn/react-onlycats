import React, {useState} from 'react';
import firebase, { storage, firestore } from "./config";

import styled from 'styled-components';

const Uploadpage = () =>{
  var currUserID;
  firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
          currUserID = firebase.auth().currentUser.uid;
      } else {
          // No user is signed in.
      }
  });

    const [file, setFile] = useState(null);
    const [url, setURL] = useState("");
  
    function handleChange(e) {
      setFile(e.target.files[0]);
    }
  
    function handleUpload(e) {
      e.preventDefault();
      const uploadTask = storage.ref(`/images/${file.name}`).put(file);
      uploadTask.on("state_changed", console.log, console.error, () => {
        storage
          .ref("images")
          .child(file.name)
          .getDownloadURL()
          .then((url) => {
            setFile(null);
            setURL(url);
          });

          firestore.collection('users').doc(currUserID).update({
            "img":
              firebase.firestore.FieldValue.arrayUnion(file.name)
          });
      });
    }
  
    return (
      <UploadContainer>
        <form onSubmit={handleUpload}>
          <UploadFile type="file" onChange={handleChange} />
          <UploadButton disabled={!file}>Upload</UploadButton>
        </form>
        <img src={url} alt="" />
      </UploadContainer>
    );
  }

export default Uploadpage;

const UploadContainer = styled.div`
  padding-top: 20px;
  display: flex;
  justify-content: center;
`

const UploadFile = styled.input
`
  font-size: 16px;
`
const UploadButton = styled.button`
  width: 6rem;
  height: 40px;
  border: 1px solid;
  background: #2691d9;
  border-radius: 30px;
  color: white;
  font-size: 14px;
  cursor: pointer;
  margin-left: 10px;
  outline: none;
  &:hover {
    border-color: black;
    transition: 0.3s;
  }
`