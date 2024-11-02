// src/components/Update.jsx

import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    styled, Box, TextareaAutosize, Button, InputBase, FormControl,
    Select, MenuItem, InputLabel, CircularProgress, Snackbar
} from '@mui/material';
import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';

const Container = styled(Box)(({ theme }) => ({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]: {
        margin: 0
    }
}));

const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover'
});

const StyledFormControl = styled(FormControl)`
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const InputTextField = styled(InputBase)`
    flex: 1;
    margin: 0 30px;
    font-size: 25px;
`;

const Textarea = styled(TextareaAutosize)`
    width: 100%;
    border: none;
    margin-top: 50px;
    font-size: 18px;
    &:focus-visible {
        outline: none;
    }
`;

const Update = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { account } = useContext(DataContext);
    const [post, setPost] = useState(null);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchPost = async () => {
            const response = await API.getPostById(id);
            if (response.isSuccess) {
                setPost(response.data);
            }
        };
        fetchPost();
    }, [id]);

    useEffect(() => {
        const uploadImage = async () => {
            if (file) {
                const data = new FormData();
                data.append('file', file);

                const response = await API.uploadImage(data);
                if (response.isSuccess) {
                    setPost((prevPost) => ({
                        ...prevPost,
                        picture: response.data // adjust based on how your API returns the image URL
                    }));
                } else {
                    console.error("Error uploading image:", response.msg);
                }
            }
        };

        uploadImage();
    }, [file]);

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile); // Set the selected file
    };

    const updatePost = async () => {
        setLoading(true);
        const response = await API.updatePost({
            ...post,
            username: account.username
        });

        setLoading(false);

        if (response.isSuccess) {
            navigate('/');
        } else {
            setError(true); // Trigger snackbar for error message
        }
    };

    return (
        <Container>
            {post && (
                <>
                    <Image src={post.picture} alt="post" />
                    <StyledFormControl>
                        <label htmlFor="fileInput">
                            <Add fontSize="large" color="action" />
                        </label>
                        <input
                            type="file"
                            id="fileInput"
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                            aria-label="Upload File"
                        />
                        <InputTextField
                            onChange={handleChange}
                            name="title"
                            placeholder="Title"
                            value={post.title}
                        />
                        <Button
                            onClick={updatePost}
                            variant="contained"
                            color="primary"
                            disabled={loading || !post.title || !post.description}
                        >
                            {loading ? <CircularProgress size={24} /> : 'Update'}
                        </Button>
                    </StyledFormControl>

                    <StyledFormControl fullWidth>
                        <InputLabel id="category-label">Category</InputLabel>
                        <Select
                            labelId="category-label"
                            value={post.categories}
                            onChange={handleChange}
                            name="categories"
                        >
                            <MenuItem value="Music">Music</MenuItem>
                            <MenuItem value="Movies">Movies</MenuItem>
                            <MenuItem value="Sports">Sports</MenuItem>
                            <MenuItem value="Tech">Tech</MenuItem>
                        </Select>
                    </StyledFormControl>

                    <Textarea
                        minRows={5}
                        placeholder="Tell your story..."
                        name="description"
                        onChange={handleChange}
                        value={post.description}
                    />

                    <Snackbar
                        open={error}
                        autoHideDuration={3000}
                        onClose={() => setError(false)}
                        message="Error occurred while updating post."
                    />
                </>
            )}
        </Container>
    );
};

export default Update;