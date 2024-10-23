import React, { useState, useEffect, useContext } from 'react';
import { TextField, Box, Button, Typography, styled, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';
import PropTypes from 'prop-types';

const Component = styled(Box)`
    width: 400px;
    margin: auto;
    box-shadow: 5px 2px 5px 2px rgb(0 0 0 / 0.6);
`;

const Image = styled('img')({
    width: 100,
    display: 'flex',
    margin: 'auto',
    padding: '50px 0 0',
});

const Wrapper = styled(Box)`
    padding: 25px 35px;
    display: flex;
    flex-direction: column;
    & > div, & > button, & > p {
        margin-top: 20px;
    }
`;

const LoginButton = styled(Button)`
    text-transform: none;
    background: #FB641B;
    color: #fff;
    height: 48px;
    border-radius: 2px;
`;

const SignupButton = styled(Button)`
    text-transform: none;
    background: #fff;
    color: #2874f0;
    height: 48px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;

const Error = styled(Typography)`
    font-size: 10px;
    color: #ff6161;
    margin-top: 10px;
    font-weight: 600;
`;

const Login = ({ setIsUserAuthenticated }) => { 
    const loginInitialValues = { username: '', password: '' };
    const signupInitialValues = { name: '', username: '', password: '' };

    const [login, setLogin] = useState(loginInitialValues);
    const [signup, setSignup] = useState(signupInitialValues);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [account, toggleAccount] = useState('login');

    const navigate = useNavigate();
    const { setAccount } = useContext(DataContext);
    const imageURL = 'https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png';

    useEffect(() => {
        setError('');
    }, [account]);

    const handleInputChange = (e, isSignup = false) => {
        const { name, value } = e.target;
        const setter = isSignup ? setSignup : setLogin;
        setter((prev) => ({ ...prev, [name]: value }));
    };

    const loginUser = async () => {
        if (!login.username || !login.password) {
            setError('Please enter both username and password');
            return;
        }
        setLoading(true);
        try {
            const response = await API.userLogin(login);
            if (response.isSuccess) {
                sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
                setAccount({ name: response.data.name, username: response.data.username });
                setIsUserAuthenticated(true);
                navigate('/');
            } else {
                setError(response.msg || 'Invalid username or password');
            }
        } catch (error) {
            console.error('Login error:', error);
            setError(error.response?.data?.msg || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const signupUser = async () => {
        if (!signup.name || !signup.username || !signup.password) {
            setError('All fields are required');
            return;
        }
        setLoading(true);
        try {
            const response = await API.userSignup(signup);
            if (response.isSuccess) {
                toggleAccount('login');
                setSignup(signupInitialValues);
                setError('Signup successful! Please log in.');
            } else {
                setError(response.msg || 'Signup failed!');
            }
        } catch (error) {
            console.error('Signup error:', error);
            setError(error.response?.data?.msg || 'Signup failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Component>
            <Box>
                <Image src={imageURL} alt="blog" />
                {account === 'login' ? (
                    <Wrapper>
                        <TextField 
                            name='username' 
                            label='Enter Username' 
                            onChange={(e) => handleInputChange(e)} 
                            disabled={loading}
                        />
                        <TextField 
                            name='password' 
                            label='Enter Password' 
                            type="password" 
                            onChange={(e) => handleInputChange(e)} 
                            disabled={loading}
                        />
                        {error && <Error>{error}</Error>}
                        <LoginButton onClick={loginUser} disabled={loading}>
                            {loading ? <CircularProgress size={24} /> : 'Login'}
                        </LoginButton>
                        <Typography align="center">OR</Typography>
                        <SignupButton onClick={() => toggleAccount('signup')} disabled={loading}>
                            Create an account
                        </SignupButton>
                    </Wrapper>
                ) : (
                    <Wrapper>
                        <TextField 
                            name='name' 
                            label='Enter Name' 
                            onChange={(e) => handleInputChange(e, true)} 
                            disabled={loading}
                        />
                        <TextField 
                            name='username' 
                            label='Enter Username' 
                            onChange={(e) => handleInputChange(e, true)} 
                            disabled={loading}
                        />
                        <TextField 
                            name='password' 
                            label='Enter Password' 
                            type="password" 
                            onChange={(e) => handleInputChange(e, true)} 
                            disabled={loading}
                        />
                        {error && <Error>{error}</Error>}
                        <SignupButton onClick={signupUser} disabled={loading}>
                            {loading ? <CircularProgress size={24} /> : 'Signup'}
                        </SignupButton>
                        <Typography align="center">OR</Typography>
                        <LoginButton onClick={() => toggleAccount('login')} disabled={loading}>
                            Already have an account
                        </LoginButton>
                    </Wrapper>
                )}
            </Box>
        </Component>
    );
};

Login.propTypes = {
    setIsUserAuthenticated: PropTypes.func.isRequired,  // Updated prop type
};

export default Login;
