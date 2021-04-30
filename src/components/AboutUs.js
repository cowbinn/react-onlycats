import React from "react";

import styled from 'styled-components';

const AboutUs = () => {

  return (
    <AboutUsBody>
        <AboutUsCenter>
          <AboutUsHeading>About Us</AboutUsHeading>
          <AboutUsBottomH3>
            OnlyCats provides your premiere experience in viewing and sharing cat pictures with other users for a price! 
            <br></br>Subscriptions are $5 USD and handled by PayPal. 
          </AboutUsBottomH3>
          
          <AboutUsBottomH3>
            Built by Michael Moon, Calvin Nguyen and Loc Nguyen.
          </AboutUsBottomH3>
      </AboutUsCenter>
    </AboutUsBody>
    )
}

export default AboutUs

const AboutUsBody = styled.body
`
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0;
  height: 86vh;
  overflow: hidden;
`

const AboutUsCenter = styled.div
`
  margin-top: 10%;
  height: 35%;
  background: #f5f0e1;
  border-radius: 20px;
  color: #000;
`

const AboutUsHeading = styled.h1
`
  font-size: 50px;
  text-align: center;
  padding: 20px 0 20px 0;
  border-bottom: 1px solid silver;
  
`

const AboutUsBottomH3 = styled.p
`
  margin: 30px 30px;
  line-height: 30px;
  text-align: center;
  font-size: 16px;
  text-decoration: none;
`
