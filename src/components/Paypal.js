import React from "react";
import ReactDOM from "react-dom";
import paypal from 'paypal-checkout';
import { auth } from './config.js';
const PayPalButton = paypal.Buttons.driver("react", { React, ReactDOM });

class YourComponent extends React.Component {
  currUser = auth.currentUser();

  createOrder(data, actions) {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: "5.00",
          },
        },
      ],
    });
  }

  onApprove(data, actions) {
    /* add looked at user to current user's favorites list */
    return actions.order.capture();
  }

  render() {
    return (
      <PayPalButton
        createOrder={(data, actions) => this.createOrder(data, actions)}
        onApprove={(data, actions) => this.onApprove(data, actions)}
      />
    );
  }
}