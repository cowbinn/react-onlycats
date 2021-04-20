import React from 'react';
import styled from 'styled-components';
import { Link, useHistory} from "react-router-dom"
import './header.css'

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

                <HeaderSearch>
                    <HeaderSearchInput type='text'></HeaderSearchInput>
                    <HeaderSearchIcon>
                        <ImageSearchIcon />
                    </HeaderSearchIcon>
                </HeaderSearch>
                <HeaderMission>
                    <Link to="/aboutus" style={{ textDecoration: 'none' }}>
                        <HeaderContact>
                            <h5>About Us |</h5>
                        </HeaderContact>
                    </Link>
                    <Link to="/upload" style={{ textDecoration: 'none' }}>
                        <HeaderContact>
                            <h5> Upload Picture | </h5>
                        </HeaderContact>
                    </Link>
                    <Link to="/contactus" style={{ textDecoration: 'none' }}>
                        <HeaderContact>
                            <h5> Customer Support</h5>
                        </HeaderContact>
                    </Link>
                </HeaderMission>

                <HeaderOptions>
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

                    <HeaderOptionLogOut>
                        <button onClick={logouthandle}>Log Out</button>
                    </HeaderOptionLogOut>

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
    color: black;
    text-decoration: none;
`

const HeaderLogo = styled.div`
    display: flex;
    h1 {
        color: black;
    }
`;

const HeaderSearch = styled.div`
    display: flex;
    flex-grow: 1;
`

const HeaderSearchInput = styled.input`

`

const HeaderSearchIcon = styled.div`
    background-color: white;
`

const HeaderMission = styled.div`
    display:flex;
    padding: 25px 25px 25px 25px;
    text-decoration: none;
`

const HeaderContact = styled.div`
    color: black;
`

const HeaderAbout = styled.div`

`


const HeaderOptions = styled.div`
    padding: 25px 25px 25px 25px;
    display: flex;

`

const HeaderOptionsFavorite = styled.div`
color: black;
`

const HeaderOptionsProfile = styled.div`
color: black;
`

const HeaderOptionLogOut = styled.div`

`
