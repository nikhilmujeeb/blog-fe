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
            setError(null);

            console.log('Fetching posts with category:', category);

            try {
                const response = await API.getAllPosts(null, category ? { category } : null);
                console.log('API Response:', response); // Log full response

                if (response.isSuccess) {
                    console.log('Response Data:', response.data); // Log data structure
                    setPosts(response.data.posts || []); // Adjust according to actual data structure
                } else {
                    setError(response.msg || 'Failed to fetch posts.');
                }
            } catch (err) {
                console.error("Fetch Error:", err);
                const message = err.response && err.response.data ? err.response.data.msg : 'An error occurred while fetching posts.';
                setError(message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [category]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Typography variant="h6" sx={{ marginRight: 2 }}>Loading posts...</Typography>
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
                No posts found for this category. Try a different category!
            </Box>
        );
    }

    return (
        <Grid container spacing={2} sx={{ padding: '20px' }}>
            {posts.map((post) => (
                <Grid item lg={3} sm={4} xs={12} key={post._id}>
                    {/* Updated Link to navigate to DetailView */}
                    <Link to={`/details/${post._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Post post={post} />
                    </Link>
                </Grid>
            ))}
        </Grid>
    );
};

export default Posts;
