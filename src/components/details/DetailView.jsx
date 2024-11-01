import { useState, useEffect, useContext } from 'react';
import { Box, Typography, styled, Button } from '@mui/material';
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

const DetailView = () => {
    const url = 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';
    
    const [post, setPost] = useState({});
    const [image, setImage] = useState(null);
    const { account } = useContext(DataContext);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            if (!/^[a-fA-F0-9]{24}$/.test(id)) {
                console.error('Invalid ObjectId format:', id);
                return;
            }
            try {
                const response = await API.getPostById(id);
                if (response.isSuccess) {
                    setPost(response.data);
                } else {
                    console.error('Failed to fetch post:', response.msg);
                }
            } catch (error) {
                console.error('Error fetching post:', error.msg || error.message);
            }
        };
        fetchData();
    }, [id]);    

    const deleteBlog = async () => {  
        if (!post._id || !/^[a-fA-F0-9]{24}$/.test(post._id)) {
            console.error('Invalid post ID:', post._id);
            return;
        }
        try {
            const response = await API.deletePost(post._id);
            if (response.isSuccess) {
                navigate('/');
            } else {
                console.error('Delete failed:', response.msg);
            }
        } catch (error) {
            console.error('Error deleting post:', error.msg);
        }
    };

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await API.uploadImage(formData); // Call your upload image API
            if (response.isSuccess) {
                // Update the post with the new image URL
                setPost((prevPost) => ({
                    ...prevPost,
                    picture: response.data.url, // Assuming the URL comes back as data.url
                }));
            } else {
                console.error('Image upload failed:', response.msg);
            }
        } catch (error) {
            console.error('Error uploading image:', error.msg);
        }
    };

    return (
        <Container>
            <Image src={post.picture || url} alt="post" />
            <Box style={{ float: 'right' }}>
                {   
                    account.username === post.username && 
                    <>  
                        <Link to={`/update/${post._id}`}><EditIcon color="primary" /></Link>
                        <DeleteIcon onClick={deleteBlog} color="error" />
                    </>
                }
            </Box>
            <Heading>{post.title}</Heading>
            <Author>
                <Link to={`/?username=${post.username}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Typography>Author: <span style={{fontWeight: 600}}>{post.username}</span></Typography>
                </Link>
                <Typography style={{marginLeft: 'auto'}}>{new Date(post.createdDate).toDateString()}</Typography>
            </Author>
            <Typography>{post.description}</Typography>
            
            {account.username === post.username && (
                <Box>
                    <input type="file" onChange={handleImageUpload} />
                </Box>
            )}

            <Comments post={post} />
        </Container>
    );
};

export default DetailView;