import React, { useState, useEffect, useContext } from 'react';
import {
    styled, Box, TextareaAutosize, Button, InputBase, FormControl, 
    Select, MenuItem, InputLabel, CircularProgress, Snackbar
} from '@mui/material';
import { AddCircle as Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
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

const initialPost = {
    title: '',
    description: '',
    picture: '',
    username: '',
    categories: '',
    createdDate: new Date()
};

const CreatePost = () => {
    const navigate = useNavigate();
    const { account } = useContext(DataContext);
    const [post, setPost] = useState(initialPost);
    const [file, setFile] = useState('');
    const [category, setCategory] = useState('Music');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const url = post.picture || 
        'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';

    useEffect(() => {
        const uploadImage = async () => {
            if (file) {
                const data = new FormData();
                data.append('name', file.name);
                data.append('file', file);

                const response = await API.uploadFile(data);
                if (response.isSuccess) {
                    setPost((prevPost) => ({
                        ...prevPost,
                        picture: response.data
                    }));
                }
            }
        };

        uploadImage();
    }, [file]);

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    };

    const handleCategoryChange = (e) => {
        const selectedCategory = e.target.value;
        setCategory(selectedCategory);
        setPost((prevPost) => ({ ...prevPost, categories: selectedCategory }));
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const savePost = async () => {
        setLoading(true);
        const response = await API.createPost({
            ...post,
            username: account.username
        });

        setLoading(false);

        if (response.isSuccess) {
            setPost(initialPost); // Clear the form
            setFile('');
            setCategory('Music'); // Reset category
            navigate('/');
        } else {
            setError(true); // Trigger snackbar for error message
        }
    };

    return (
        <Container>
            <Image src={url} alt="post" />

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
                    onClick={savePost} 
                    variant="contained" 
                    color="primary"
                    disabled={loading || !post.title || !post.description}
                >
                    {loading ? <CircularProgress size={24} /> : 'Publish'}
                </Button>
            </StyledFormControl>

            <StyledFormControl fullWidth>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                    labelId="category-label"
                    value={category}
                    onChange={handleCategoryChange}
                >
                    <MenuItem value="Music">Music</MenuItem>
                    <MenuItem value="Movies">Movies</MenuItem>
                    <MenuItem value="Sports">Sports</MenuItem>
                    <MenuItem value="Tech">Tech</MenuItem>
                    <MenuItem value="Fashion">Fashion</MenuItem>
                </Select>
            </StyledFormControl>

            <Textarea
                minRows={5}
                placeholder="Tell your story..."
                name="description"
                value={post.description}
                onChange={handleChange}
            />

            <Snackbar
                open={error}
                autoHideDuration={6000}
                onClose={() => setError(false)}
                message="Failed to save the post. Please try again."
            />
        </Container>
    );
};

export default CreatePost;
