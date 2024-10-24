import React from 'react';
import { Box, styled, Typography } from '@mui/material';

const Banner = styled(Box)`
    background-image: url(https://www.wallpapertip.com/wmimgs/23-236943_us-wallpaper-for-website.jpg);
    width: 100%;
    height: 50vh;
    background-position: center;
    background-size: cover;
    position: relative;
`;

const Overlay = styled(Box)`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
`;

const Wrapper = styled(Box)`
    padding: 20px;
    max-width: 800px;
    margin: auto;
    & > h3, & > h5 {
        margin-top: 50px;
    }
`;

const Text = styled(Typography)`
    color: #878787;
    line-height: 1.6;
`;

const About = () => {
    return (
        <Box>
            <Banner>
                <Overlay />
            </Banner>
            <Wrapper>
                <Typography variant="h3" align="center">About This Blog</Typography>
                <Text variant="h6">
                    Welcome to our blog! Here, we share insights, stories, and tips on a variety of topics including technology, lifestyle, travel, 
                    and personal development. Our goal is to create a space for readers to explore, learn, and connect through engaging content.
                </Text>
                <Text variant="h6">
                    Whether you’re looking for inspiration or practical advice, we aim to provide valuable information to help you navigate life's challenges.
                </Text>
                <Text variant="h6">
                    We believe in the power of community and invite you to join the conversation. Share your thoughts in the comments or reach out to us through 
                    our social media channels. We love hearing from our readers and are always open to suggestions for future topics.
                </Text>
            </Wrapper>
        </Box>
    );
}

export default About;
