import React from 'react';
import { styled, Box, Typography } from '@mui/material';

const Container = styled(Box)`
    border: 1px solid #d3cede;
    border-radius: 10px;
    margin: 10px;
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 350px;
    width: 100%;
    max-width: 350px;  /* Ensure max-width */
    overflow: hidden;
    & > img, & > p {
        padding: 0 5px 5px 5px;
    }
`;

const Image = styled('img')({
    width: '100%',
    height: 150,
    objectFit: 'cover',
    borderRadius: '10px 10px 0 0',
});

const Text = styled(Typography)`
    color: #878787;
    font-size: 12px;
    margin-bottom: 5px;
`;

const Heading = styled(Typography)`
    font-size: 18px;
    font-weight: 600;
    text-align: center;
    margin: 5px 0;
`;

const Details = styled(Typography)`
    font-size: 14px;
    word-break: break-word;
    padding: 5px;
    text-align: center;
`;

const Post = ({ post }) => {
    const url = post.picture || 
        'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80';

    const addEllipsis = (str = '', limit) => 
        str.length > limit ? `${str.substring(0, limit)}...` : str;

    const displayCategories = () => 
        Array.isArray(post.categories) && post.categories.length 
            ? post.categories.join(', ') 
            : 'Uncategorized';

    return (
        <Container>
            <Image src={url} alt={post.title || 'Post Image'} />
            <Text>{displayCategories()}</Text>
            <Heading>{addEllipsis(post.title, 20)}</Heading>
            <Text>Author: {post.username}</Text>
            <Details>{addEllipsis(post.description, 100)}</Details>
        </Container>
    );
};

export default Post;
