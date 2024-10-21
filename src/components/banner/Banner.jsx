import React from 'react';
import { styled, Box, Typography } from '@mui/material';

const Image = styled(Box)`
    width: 100%;
    background: url(https://www.blogtyrant.com/wp-content/uploads/2019/07/draft-a-post.jpg) center/cover no-repeat #000;
    height: 50vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Heading = styled(Typography)(({ theme }) => ({
    fontSize: '4rem',
    [theme.breakpoints.down('sm')]: {
        fontSize: '2.5rem',
    },
    color: '#FFFFFF',
    lineHeight: 1,
}));

const SubHeading = styled(Typography)(({ theme }) => ({
    fontSize: '1.5rem',
    [theme.breakpoints.down('sm')]: {
        fontSize: '1rem',
    },
    color: '#FFFFFF',
}));

const Banner = () => {
    return (
        <Image aria-label="Blog Banner">
            <Heading>BLOG</Heading>
            <SubHeading>Share What Your Heart Desire</SubHeading>
        </Image>
    );
};

export default Banner;
