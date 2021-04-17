import React, {useState} from 'react';
import firebase, { storage, firestore } from "./config";


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
      <div>
        <form onSubmit={handleUpload}>
          <input type="file" onChange={handleChange} />
          <button disabled={!file}>Upload</button>
        </form>
        <img src={url} alt="" />
      </div>
    );
  }

export default Uploadpage;