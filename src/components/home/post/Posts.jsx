import { useEffect, useState } from 'react';
import React from 'react';
import { Grid, Box, CircularProgress } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';

// Import API
import { API } from '../../../service/api';

// Components
import Post from './Post';

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true); // Set loading to true before fetching
                const response = await API.getAllPosts({ category: category || '' });
                
                if (response.isSuccess) {
                    setPosts(response.data);
                } else {
                    setError('Failed to fetch posts.');
                }
            } catch (err) {
                setError('An error occurred while fetching posts.');
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };
        fetchData();
    }, [category]);

    if (loading) {
        return <CircularProgress />; // Show loading spinner while fetching
    }

    if (error) {
        return <Box style={{ color: '#878787', margin: '30px 80px', fontSize: 18 }}>
            {error}
        </Box>;
    }

    return (
        <Grid container spacing={2}>
            {posts.length ? posts.map(post => (
                <Grid item lg={3} sm={4} xs={12} key={post._id}>
                    <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`post/${post._id}`}>
                        <Post post={post} />
                    </Link>
                </Grid>
            )) : (
                <Box style={{ color: '#878787', margin: '30px 80px', fontSize: 18 }}>
                    No data is available for the selected category
                </Box>
            )}
        </Grid>
    );
};

export default Posts;
