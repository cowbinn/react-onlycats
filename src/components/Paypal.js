import React from "react";
import ReactDOM from "react-dom"
import styled from 'styled-components';

const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

function PayPal() {
  const createOrder = (data, actions) =>{
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: "0.01",
          },
        },
      ],
    });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture();
  };

  return (
    <PayPalBlock>
      <PayPalButton
        createOrder={(data, actions) => createOrder(data, actions)}
        onApprove={(data, actions) => onApprove(data, actions)}
      />
    </PayPalBlock>
  );
}

export default PayPal;

const PayPalBlock = styled.div`
  background-color: gray;
  display: grid;
  margin: 100px 10px;
  place-items: center;
`