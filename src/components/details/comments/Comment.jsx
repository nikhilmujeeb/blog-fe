import React, { useState, useContext } from 'react';
import { Typography, Box, styled, CircularProgress, Snackbar, IconButton } from "@mui/material";
import { Delete } from '@mui/icons-material';

import { API } from '../../../service/api';
import { DataContext } from "../../../context/DataProvider";

const Component = styled(Box)`
    margin-top: 30px;
    background: #F5F5F5;
    padding: 10px;
`;

const Container = styled(Box)`
    display: flex;
    align-items: center;
    margin-bottom: 5px;
`;

const Name = styled(Typography)`
    font-weight: 600;
    font-size: 18px;
    margin-right: 20px;
`;

const StyledDate = styled(Typography)`
    font-size: 14px;
    color: #878787;
`;

const DeleteIcon = styled(Delete)`
    margin-left: auto;
    cursor: pointer;
`;

const Comment = ({ comment, setToggle }) => {
    const { account } = useContext(DataContext);
    const [loading, setLoading] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [error, setError] = useState('');

    const removeComment = async () => {
        const confirm = window.confirm("Are you sure you want to delete this comment?");
        if (!confirm) return;

        setLoading(true);
        try {
            const response = await API.deleteComment(comment._id);
            if (response.isSuccess) {
                setToggle(prev => !prev);
            } else {
                setError('Failed to delete the comment.');
            }
        } catch (error) {
            console.error('Error deleting comment:', error);
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
            setOpenSnackbar(true);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Component>
            <Container>
                <Name>{comment.name}</Name>
                <StyledDate>{new Date(comment.date).toDateString()}</StyledDate>
                {comment.name === account.username && (
                    <IconButton onClick={removeComment} disabled={loading}>
                        {loading ? <CircularProgress size={24} /> : <DeleteIcon />}
                    </IconButton>
                )}
            </Container>
            <Typography>{comment.comments}</Typography>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={4000}
                onClose={handleCloseSnackbar}
                message={error || 'Comment deleted successfully!'}
            />
        </Component>
    );
};

export default Comment;
