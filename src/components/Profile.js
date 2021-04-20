import { Button } from '@material-ui/core';
import React, {useState} from 'react';
import firebase, { storage, firestore } from "./config";
import styled from 'styled-components';

function Profile() {
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
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [userDescription, setuserDescription] = useState("");
    const [userOldPassword, setuserOldPassword]= useState("");

  
    function handleChange(e) {
      setFile(e.target.files[0]);
    }
    const onChangeHandler = event => {
      const { name, value } = event.currentTarget;
      if (name === "userEmail") {
        setEmail(value);
      } else if (name === "userPassword") {
        setPassword(value);
      } else if (name === "displayName") {
        setDisplayName(value);}
        else if (name=== "userDescription" ){
          setuserDescription(value);
        }
        else if (name=== "userPassword2" ){
          setuserOldPassword(value);
        }
      };
    console.log(email, userDescription, password)
 
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
    // function reauthenticate(userOldPassword){
    //   var user= firebase.auth().currentUser;
      
    //   var credential = firebase.auth.EmailAuthProvider.credential(user.email, userOldPassword)
    //   console.log(user.email, credential)
    //   return user.reauthenticateWithCredential(credential);

    // }
    function emailUpdateHandler (e){
       e.preventDefault();
        var user= firebase.auth().currentUser;
        user.updateEmail(email).then(()=>{
          alert("Email Changed Successful")
          firestore.collection('users').doc(currUserID).update({
            "email":email});
        }).catch((error)=>{
          alert(error);
          
        });

  }
    function passwordUpdateHandler(e){
    e.preventDefault();
    var user= firebase.auth().currentUser;
        user.updatePassword(password).then(()=>{
          alert("Password Changed Successful")
    firestore.collection('users').doc(currUserID).update({
          "password":
            password
        });
      }).catch((error)=>{
        alert(error);
      });
    }
    function descriptionUpdateHandler(e){
    e.preventDefault();
    firestore.collection('users').doc(currUserID).update({
          "userDescription":
            userDescription
        });
    }
    return (
        <div>
            <h1>Account Settings</h1>
            <form className="">
            <br/>
            <label >
              Email:
            </label>
            <input
              type="email"
              name="userEmail"
              id="userEmail"
              onChange = {onChangeHandler}
            />
            <button onClick = {emailUpdateHandler}>update email</button>
            <br/>
            <label>
              Password:
            </label>
            <input
              type="password"
              name="userPassword"
              id="userPassword"
              onChange= {onChangeHandler}
            />
            <button onClick = {passwordUpdateHandler}>update password</button>
            <br/>

            <label>
              Description:
            </label>
            <input
              type="description"
              name="userDescription"
              id="userDescription"
              onChange ={onChangeHandler}
            />
            <button onClick = {descriptionUpdateHandler}>update description</button>
          </form>
          <div>
            <form onSubmit={handleUpload}>
              <input type="file" onChange={handleChange} />
              <button disabled={!file}>Upload</button>
 
            </form>
            <img src={url} alt="" />
            <h1>
            {firebase.auth().currentUser.email}
            </h1>
          </div>
          <br/>
          <div >
                <Picture>
                    
                        {/* <img src= {currUserID.url} alt="profile" /> */}
                    
                </Picture>
                
                <hr />
            </div>
        </div>
        
    )
    
}

export default Profile

const Picture = styled.div`
    img {
        width: 140px
    }
`