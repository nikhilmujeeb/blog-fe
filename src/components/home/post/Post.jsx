import React from 'react';
import { styled, Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const Container = styled(Box)`
    border: 1px solid #d3cede;
    border-radius: 10px;
    margin: 10px;
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 350px;
    width: 100%;
    max-width: 350px; 
    overflow: hidden;
    &:hover {
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        transition: box-shadow 0.3s ease;
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

    const title = post.title || 'Untitled';
    const username = post.username || 'Anonymous';
    const description = post.description || '';

    const handleImageError = (e) => {
        e.target.src = 'https://via.placeholder.com/150'; // Fallback image
    };

    return (
        <Container>
            <Image src={url} alt={title} onError={handleImageError} />
            <Text>{displayCategories()}</Text>
            <Heading>{addEllipsis(title, 20)}</Heading>
            <Text>Author: {username}</Text>
            <Details>{addEllipsis(description, 100)}</Details>
        </Container>
    );
};

Post.propTypes = {
    post: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        picture: PropTypes.string,
        username: PropTypes.string,
        categories: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
};

export default Post;
