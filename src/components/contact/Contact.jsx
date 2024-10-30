import React from 'react';
import { Box, styled, Typography, Link } from '@mui/material';
import { Instagram, Email, LinkedIn } from '@mui/icons-material';

const Banner = styled(Box)`
    background-image: url(https://cdn.vectorstock.com/i/500p/45/27/contact-us-banner-vector-46424527.jpg);
    width: 100%;
    height: 50vh;
    background-position: left 0px top -100px;
    background-size: cover;
`;

const Wrapper = styled(Box)`
    padding: 20px;
    text-align: center;
    & > h3, & > h5 {
        margin-top: 50px;
    }
`;

const Text = styled(Typography)`
    color: #878787;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;  /* Spacing between icons */
`;

const StyledLink = styled(Link)`
    color: inherit;
    display: flex;
    align-items: center;
    margin: 0 5px;
    &:hover {
        color: #555;  /* Change color on hover */
    }
`;

const Contact = () => {
    return (
        <Box>
            <Banner />
            <Wrapper>
                <Typography variant="h3">Getting in touch is easy!</Typography>
                <Text variant="h5">
                    Reach out to me on
                    <StyledLink 
                        href="https://www.instagram.com/nikhil_mujeeb/" 
                        target="_blank" 
                        aria-label="Instagram"
                    >
                        <Instagram />
                    </StyledLink>
                    <StyledLink 
                        href="https://www.linkedin.com/in/nikhil-v-mujeeb/" 
                        target="_blank" 
                        aria-label="LinkedIn"
                    >
                        <LinkedIn />
                    </StyledLink>
                    <StyledLink 
                        href="mailto:nikhilmujeeb@gmail.com?Subject=This is a subject" 
                        target="_blank" 
                        aria-label="Email"
                    >
                        <Email />
                    </StyledLink>.
                </Text>
            </Wrapper>
        </Box>
    );
}

export default Contact;
