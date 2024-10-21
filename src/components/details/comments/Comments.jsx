import React, { useState, useEffect, useContext } from 'react';
import { Box, TextareaAutosize, Button, styled, CircularProgress, Snackbar } from '@mui/material';
import { DataContext } from '../../../context/DataProvider';
import { API } from '../../../service/api';
import Typography from '@mui/material/Typography';

// Components
import Comment from './Comment';

const Container = styled(Box)`
    margin-top: 100px;
    display: flex;
`;

const Image = styled('img')({
    width: 50,
    height: 50,
    borderRadius: '50%',
});

const StyledTextArea = styled(TextareaAutosize)`
    height: 100px !important;
    width: 100%;
    margin: 0 20px;
`;

const initialValue = {
    name: '',
    postId: '',
    date: new Date(),
    comments: '',
};

const Comments = ({ post }) => {
    const url = 'https://static.thenounproject.com/png/12017-200.png';

    const [comment, setComment] = useState(initialValue);
    const [comments, setComments] = useState([]);
    const [toggle, setToggle] = useState(false);
    const [loading, setLoading] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [error, setError] = useState('');

    const { account } = useContext(DataContext);

    // Fetch all comments whenever 'toggle' or 'post' changes
    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            try {
                const response = await API.getAllComments(post._id);
                if (response.isSuccess) {
                    setComments(response.data);
                } else {
                    setError('Failed to load comments');
                }
            } catch (err) {
                console.error('Error fetching comments:', err);
                setError('An error occurred while fetching comments');
            } finally {
                setLoading(false);
            }
        };
        getData();
    }, [toggle, post]);

    // Handle comment input changes
    const handleChange = (e) => {
        setComment((prev) => ({
            ...prev,
            name: account.username,
            postId: post._id,
            comments: e.target.value,
        }));
    };

    // Add a new comment
    const addComment = async () => {
        if (!comment.comments.trim()) return; // Prevent empty comments

        try {
            await API.newComment(comment);
            setComment(initialValue); // Reset input
            setToggle((prev) => !prev); // Refresh comments
        } catch (error) {
            console.error('Error adding comment:', error);
            setError('Failed to add comment');
            setOpenSnackbar(true);
        }
    };

    // Close the Snackbar notification
    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Box>
            <Container>
                <Image src={url} alt="User avatar" />
                <StyledTextArea
                    rowsMin={5}
                    placeholder="What's on your mind?"
                    onChange={handleChange}
                    value={comment.comments}
                />
                <Button
                    variant="contained"
                    color="primary"
                    size="medium"
                    style={{ height: 40 }}
                    onClick={addComment}
                    disabled={!comment.comments.trim()} // Disable button if input is empty
                >
                    Post
                </Button>
            </Container>

            {loading ? (
                <CircularProgress style={{ marginTop: 20 }} />
            ) : (
                <Box>
                    {comments.length > 0 ? (
                        comments.map((comment) => (
                            <Comment key={comment._id} comment={comment} setToggle={setToggle} />
                        ))
                    ) : (
                        <Typography>No comments yet. Be the first to post!</Typography>
                    )}
                </Box>
            )}

            <Snackbar
                open={openSnackbar}
                autoHideDuration={4000}
                onClose={handleCloseSnackbar}
                message={error || 'Comment added successfully!'}
            />
        </Box>
    );
};

export default Comments;
