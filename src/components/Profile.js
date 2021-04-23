import React, { useState, useEffect } from 'react';
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
    const [load, setLoad] = useState(false);

  useEffect(() => {
    setLoad(true);

    const fetchPFP = async() => {
      const response = firestore.collection('users').doc(currUserID);

      await response.get().then(doc => {
          storage.ref('images/')
              .child(doc.data().profilePicture)
              .getDownloadURL().then((url) => {
                  setURL(url);
                  setLoad(false);
                  return url;
              });
      });
    }
    fetchPFP();
  }, []);
  
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
            "profilePicture":file.name});
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
        <div> {load ? (<div>Loading...</div>) : (
          <AccountSettingContainer>
            <h1>Account Settings</h1>
            <h3>
              Current Email: {firebase.auth().currentUser.email}
              </h3>
              <form className="">
              <br/>
              <label >
                Email:
              </label>
              <br/>
              <AccountSettingTextFields>
                <FormInput
                  type="email"
                  name="userEmail"
                  id="userEmail"
                  onChange = {onChangeHandler}
                /> 
                <AccountUpdateButton onClick = {emailUpdateHandler}>Update Email</AccountUpdateButton>
              </AccountSettingTextFields>
              <br/>
              <label>
                Password:
              </label>
              <AccountSettingTextFields>
              <FormInput
                type="password"
                name="userPassword"
                id="userPassword"
                onChange= {onChangeHandler}
              />
              <AccountUpdateButton onClick = {passwordUpdateHandler}>Update Password</AccountUpdateButton>
              </AccountSettingTextFields>
              <label>
                Description:
              </label>
              <AccountSettingTextFields>
                <FormInput
                  type="description"
                  name="userDescription"
                  id="userDescription"
                  onChange ={onChangeHandler}
                />
                <AccountUpdateButton onClick = {descriptionUpdateHandler}>Update Description</AccountUpdateButton>
              </AccountSettingTextFields>
            </form>
            <br/>
            <AccountUploadAndProfilePic>
              <form onSubmit={handleUpload}>
                <UploadFile type="file" onChange={handleChange} />
                <UploadButton disabled={!file}>Upload</UploadButton>

              </form>
              
              <Picture>
                <img src={url} alt="" />
              </Picture>
            </AccountUploadAndProfilePic>
            <br/>
                  <hr />
          </AccountSettingContainer>
        )}
    </div>
    )
    
}

export default Profile

const AccountSettingContainer = styled.div
`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  width: 100vw;
  h1 {
    padding-bottom: 10px;
  }
`

const AccountSettingTextFields = styled.div
`
  display: flex;
  margin: 10px 0;
`

const FormInput = styled.input
`
  width: 300px;
  padding: 0 5px;
  height: 40px;
  font-size: 16px;
  border: 2px solid #adadad;
  background: none;
  outline: none;
  &:before {
    content: '';
    position: absolute;
    top: 40px;
    left: 0;
    width: 100%;
    height: 2px;
    background: #2691d9;
  }
`
const AccountUpdateButton = styled.button
`
  width: 10rem;
  height: 46px;
  border: 1px solid;
  background: #2691d9;
  border-radius: 30px;
  color: white;
  font-size: 14px;
  cursor: pointer;
  outline: none;
  margin-left: 10px;
  &:hover {
    border-color: black;
    transition: 0.3s;
  }
`

const AccountUploadAndProfilePic = styled.div
`
  display: flex;
  flex-direction: column;
  align-items: center;

`

const UploadFile = styled.input
`
  font-size: 16px;
`
const UploadButton = styled.button`
  width: 10rem;
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

const Picture = styled.div`
  padding-top: 20px;
    img {
        border-radius: 25px;
        border: 2px solid #7F85F4;
        width: 280px;
    }
`