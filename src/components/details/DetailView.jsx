import React, { useState, useEffect, useContext } from 'react';
import { Box, Typography, Button, Dialog, DialogActions, DialogContent, DialogContentText, CircularProgress, styled } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';
import Comments from './comments/Comments';

const Container = styled(Box)(({ theme }) => ({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]: {
        margin: 0,
    },
}));

const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover',
});

const EditIcon = styled(Edit)`
    margin: 5px;
    padding: 5px;
    border: 1px solid #878787;
    border-radius: 10px;
`;

const DeleteIcon = styled(Delete)`
    margin: 5px;
    padding: 5px;
    border: 1px solid #878787;
    border-radius: 10px;
`;

const Heading = styled(Typography)`
    font-size: 38px;
    font-weight: 600;
    text-align: center;
    margin: 50px 0 10px 0;
`;

const Author = styled(Box)(({ theme }) => ({
    color: '#878787',
    display: 'flex',
    margin: '20px 0',
    [theme.breakpoints.down('sm')]: {
        display: 'block',
    },
}));

const DetailView = () => {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const { account } = useContext(DataContext);
    const navigate = useNavigate();
    const { id } = useParams();

    const url = post?.picture || 
        'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await API.getPostById(id);
                if (response.isSuccess) {
                    setPost(response.data);
                } else {
                    console.error('Failed to load post.');
                    navigate('/');
                }
            } catch (error) {
                console.error('Error fetching post:', error);
                navigate('/');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id, navigate]);

    const handleDelete = async () => {
        try {
            const response = await API.deletePost(post._id);
            if (response.isSuccess) {
                navigate('/');
            } else {
                console.error('Failed to delete post:', response.message || 'Unknown error');
            }
        } catch (error) {
            console.error('Error deleting post:', error);
        }
        setOpenDialog(false);
    };

    const handleDialogOpen = () => setOpenDialog(true);
    const handleDialogClose = () => setOpenDialog(false);

    if (loading) return <CircularProgress style={{ marginTop: '20px' }} />;

    if (!post) return <Typography>Post not found.</Typography>;

    return (
        <Container>
            <Image src={url} alt="post" />
            <Box style={{ float: 'right' }}>
                {account.username === post.username && (
                    <>
                        <Link to={`/update/${post._id}`}>
                            <EditIcon color="primary" />
                        </Link>
                        <DeleteIcon onClick={handleDialogOpen} color="error" />
                    </>
                )}
            </Box>

            <Heading>{post.title}</Heading>

            <Author>
                <Link to={`/?username=${post.username}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Typography>
                        Author: <strong>{post.username}</strong>
                    </Typography>
                </Link>
                <Typography style={{ marginLeft: 'auto' }}>
                    {new Date(post.createdDate).toDateString()}
                </Typography>
            </Author>

            <Typography>{post.description}</Typography>

            <Comments post={post} />

            <Dialog open={openDialog} onClose={handleDialogClose}>
                <DialogContent>
                    <DialogContentText>Are you sure you want to delete this post?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default DetailView;
