import React, { useState, useEffect }  from "react";
import ReactDOM from "react-dom"
import styled from 'styled-components';
import firebase, { storage, firestore } from "./config";
const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

function PayPal() {
  let id = window.location.pathname.split("/").pop();
  var currUserID;
  firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
          currUserID = firebase.auth().currentUser.uid;
      } else {
          // No user is signed in.
      }
  });

  const [user, setUser] = useState();
  const [url, setURL] = useState("");
  const [fin, setFin] = useState(false);
  useEffect(() => {
    const fetchUser = async() => {
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

    fetchUser();
    return () => (false)
  }, []);

  const createOrder = (data, actions) =>{
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: "5.00",
          },
        },
      ],
    });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then(function(details) {
      // Show a success message to the buyer
      firestore.collection('users').doc(currUserID).update({
        "favorites":
          firebase.firestore.FieldValue.arrayUnion(id)
      });
    });
  };

  return (
    <div>
      { fin ? (
        <React.Fragment>
              <h1>{user.username}</h1>
              <Picture>
                  <img src = {url} alt = "Profile" />
              </Picture>
          <PayPalBlock>
            <PayPalButton
              createOrder={(data, actions) => createOrder(data, actions)}
              onApprove={(data, actions) => onApprove(data, actions)}
            />
          </PayPalBlock>
        </React.Fragment>
      ) : (null) }
    <hr />
    </div>
  );
}

export default PayPal;

const PayPalBlock = styled.div`
  display: grid;
  margin: 100px 10px;
  place-items: center;
`

const Picture = styled.div`
    img {
        width: 500px
    }
`