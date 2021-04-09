import React from 'react'
import styled from "styled-components"

function SingleView() {
    return (
        <div>
            <h1>Single View Page</h1>
            <Picture>
                <img src={"https://i.imgur.com/epMSRQH.png"}/>
            </Picture>
            <ul>
                <li><a>User</a></li>
                <li><button>Follow</button></li>
                <li><button>Add to Cart</button></li>
            </ul>
        </div>
    )
}

export default SingleView

const Picture = styled.div`
    img {
        width: 500px
    }
`