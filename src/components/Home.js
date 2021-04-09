import React from 'react'
import styled from 'styled-components'

import { Link } from "react-router-dom"



function Home() {
    return (
        <div>
            <h1>HomePage</h1>
            <Link to="/singleview">
                <Picture>
                    <img alt = "error" src={"https://i.imgur.com/epMSRQH.png"}/>
                </Picture>
            </Link>
            <Link to="/signup">
                <Picture>
                    <h2>Signup</h2>
                </Picture>
            </Link>


        </div>
    )
}

export default Home

const Picture = styled.div`
    img {
        width: 500px
    }
`