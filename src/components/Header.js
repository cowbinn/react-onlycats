import React from 'react';
import styled from 'styled-components';
import { Link, useHistory} from "react-router-dom"

import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
//import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import {auth} from "./config";

function Header() {
    const history = useHistory()
    const logouthandle = event =>{
        auth.signOut()
        history.push("/signin")
      }

    return (
        <div>
            <HeaderContainer>
                <HeaderLogo>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <h1>OnlyCats</h1>
                    </Link>
                </HeaderLogo>

                {/* <HeaderSearch>
                    <HeaderSearchInput type='text'></HeaderSearchInput>
                    <HeaderSearchIcon>
                        <ImageSearchIcon />
                    </HeaderSearchIcon>
                </HeaderSearch> */}
                <HeaderMission>
                    
                    {/* <Link to="/contactus" style={{ textDecoration: 'none' }}>
                        <HeaderContact>
                            <h5> Customer Support</h5>
                        </HeaderContact>
                    </Link> */}
                </HeaderMission>

                <HeaderOptions>
                    <Link to="/aboutus" style={{ textDecoration: 'none' }}>
                        <HeaderContact>
                            <h5>About Us </h5>
                        </HeaderContact>
                    </Link>
                    <h5>|</h5>
                    <Link to="/upload" style={{ textDecoration: 'none' }}>
                        <HeaderContact>
                            <h5> Upload Picture</h5>
                        </HeaderContact>
                    </Link>
                    <Link to="/favorites" style={{ textDecoration: 'none' }}>
                        <HeaderOptionsFavorite>
                            <FavoriteBorderIcon />
                        </HeaderOptionsFavorite>
                    </Link>

                    <Link to="/profile" style={{ textDecoration: 'none' }}>
                        <HeaderOptionsProfile>
                            <PermIdentityIcon/>
                        </HeaderOptionsProfile>
                    </Link>

                        <HeaderOptionLogOutButton onClick={logouthandle}>Log Out</HeaderOptionLogOutButton>

                </HeaderOptions>

            </HeaderContainer>
        </div>
    )
}

export default Header

const HeaderContainer = styled.div`
    font-size: 20px;
    height: 100px;
    background-color: #EEDBD7;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: black;
    text-decoration: none;
`

const HeaderLogo = styled.div`
    padding-left: 20px;
    h1 {
        color: black;
    }
`;

// const HeaderSearch = styled.div`
//     display: flex;
// `

// const HeaderSearchInput = styled.input`

// `

// const HeaderSearchIcon = styled.div`
//     background-color: white;
// `

const HeaderMission = styled.div`
    display: flex;
    justify-content: space-between;
    a{
        &:hover {
            cursor: pointer;
        }
    }
`

const HeaderContact = styled.div`
    color: black;
    padding: 0px 5px;
    font-size: 20px;
`

const HeaderOptions = styled.div`
    padding: 25px 25px 25px 25px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    align-content: center;
`

const HeaderOptionsFavorite = styled.div`
    color: black;
    padding: 10px 0px;
    
`

const HeaderOptionsProfile = styled.div`
    color: black;
    padding: 10px 10px 10px 5px;
`

const HeaderOptionLogOutButton = styled.button`
    display: inline-block;
    border-radius: 20px;
    text-decoration:none;
    color:#FFFFFF;
    background-color: #3369ff;
    text-align: center;
    position: relative;
    width: 6rem;
    height: 2.5rem;
    outline: none;
    }
    &:hover {
        color: #000;
        background-color: #fff;
        transition:
    }

`
