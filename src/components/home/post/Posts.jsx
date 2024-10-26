import React, { useEffect, useState } from 'react';
import { Grid, Box, CircularProgress, Typography } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';
import { API } from '../../../service/api';
import Post from './Post';

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); 
            setError(null); // Reset error before new fetch

            try {
                const response = await API.getAllPosts({ category: category || '' });
                if (response.isSuccess) {
                    setPosts(response.data || []);
                } else {
                    setError('Failed to fetch posts.');
                }
            } catch (err) {
                setError('An error occurred while fetching posts.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [category]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ color: '#878787', margin: '30px 80px', fontSize: 18, textAlign: 'center' }}>
                {error}
            </Box>
        );
    }

    if (!posts.length) {
        return (
            <Box sx={{ color: '#878787', margin: '30px 80px', fontSize: 18, textAlign: 'center' }}>
                No data is available for the selected category
            </Box>
        );
    }

    return (
        <Grid container spacing={2} sx={{ padding: '20px' }}>
            {posts.map(post => (
                <Grid item lg={3} sm={4} xs={12} key={post._id}>
                    <Link to={`post/${post._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Post post={post} />
                    </Link>
                </Grid>
            ))}
        </Grid>
    );
};

export default Posts;
