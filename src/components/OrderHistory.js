import React from 'react'
import styled from "styled-components"

const date = "January 1, 2021"
const ordernumber = 1;
const username = "John";
const orderstatus = "pending";

function OrderHistory() {
    return (
        <div>
            <h1>Order History</h1>
            <a>{date}</a>
            <Picture>
                <img src={"https://i.imgur.com/epMSRQH.png"}/>
            </Picture>
            <a>Order Number: {ordernumber}</a>
            <a>Username: {username}</a>
            <a>Order Status: {orderstatus}</a>
        </div>
    )
}

export default OrderHistory

const Picture = styled.div`
    img {
        width: 500px
    }
`