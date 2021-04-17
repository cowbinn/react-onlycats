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
                    <Link to="/">
                        <a href = "#/">OnlyCats</a>
                    </Link>
                </HeaderLogo>

                <HeaderSearch>
                    <HeaderSearchInput type='text'></HeaderSearchInput>
                    <HeaderSearchIcon>
                        <ImageSearchIcon />
                    </HeaderSearchIcon>
                </HeaderSearch>
                <HeaderMission>
                    <Link to="/aboutus">
                        <HeaderAbout>
                            <a href = "#/">About Us |</a>
                        </HeaderAbout>
                    </Link>
                    <Link to="/contactus">
                        <HeaderContact>
                            <a href = "#/"> Customer Support</a>
                        </HeaderContact>
                    </Link>
                </HeaderMission>

                <HeaderOptions>
                    <Link to="/favorites">
                        <HeaderOptionsFavorite>
                            <FavoriteBorderIcon />
                        </HeaderOptionsFavorite>
                    </Link>

                    <Link to="/profile">
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
    a {
        font-size: 50px;
        text-decoration: none;
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
    a {
        color: black;
        text-decoration: none;
    }
`

const HeaderContact = styled.div`

`

const HeaderAbout = styled.div`

`


const HeaderOptions = styled.div`
    padding: 25px 25px 25px 25px;
    display: flex;
    a {
        color: black;
        text-decoration: none;
    }
`

const HeaderOptionsFavorite = styled.div`

`

const HeaderOptionsProfile = styled.div`

`

const HeaderOptionLogOut = styled.div`

`
