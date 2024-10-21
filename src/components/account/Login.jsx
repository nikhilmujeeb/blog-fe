import React, { useState, useEffect, useContext } from 'react';
import { TextField, Box, Button, Typography, styled, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';

const Component = styled(Box)`
    width: 400px;
    margin: auto;
    box-shadow: 5px 2px 5px 2px rgb(0 0 0 / 0.6);
`;

const Image = styled('img')({
    width: 100,
    display: 'flex',
    margin: 'auto',
    padding: '50px 0 0'
});

const Wrapper = styled(Box)`
    padding: 25px 35px;
    display: flex;
    flex: 1;
    overflow: auto;
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

const Text = styled(Typography)`
    color: #878787;
    font-size: 12px;
`;

const Error = styled(Typography)`
    font-size: 10px;
    color: #ff6161;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600;
`;

const loginInitialValues = {
    username: '',
    password: ''
};

const signupInitialValues = {
    name: '',
    username: '',
    password: '',
};

const Login = ({ isUserAuthenticated }) => {
    const [login, setLogin] = useState(loginInitialValues);
    const [signup, setSignup] = useState(signupInitialValues);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [account, toggleAccount] = useState('login');

    const navigate = useNavigate();
    const { setAccount } = useContext(DataContext);

    const imageURL = 'https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png';

    useEffect(() => {
        setError(''); // Clear error on account switch
    }, [account]);

    const onValueChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
        setError(''); // Clear error on input change
    };

    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });
        setError(''); // Clear error on input change
    };

    const loginUser = async () => {
        if (!login.username || !login.password) {
            setError('Please enter username and password');
            return;
        }

        setLoading(true);
        try {
            const response = await API.userLogin(login);
            if (response.isSuccess) {
                sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
                sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
                setAccount({ name: response.data.name, username: response.data.username });
                isUserAuthenticated(true);
                setLogin(loginInitialValues);
                navigate('/');
            } else {
                setError(response.msg || 'Login failed! Please try again.');
            }
        } catch (error) {
            console.error("Login error:", error);
            setError('An unexpected error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const signupUser = async () => {
        if (!signup.name || !signup.username || !signup.password) {
            setError('Please fill in all fields');
            return;
        }

        setLoading(true);
        try {
            const response = await API.userSignup(signup);
            if (response.isSuccess) {
                setSignup(signupInitialValues);
                toggleAccount('login');
                setError('Signup successful! Please log in.');
            } else {
                setError(response.msg || 'Signup failed! Please try again.');
            }
        } catch (error) {
            console.error("Signup error:", error);
            setError('An unexpected error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const toggleSignup = () => {
        toggleAccount((prev) => (prev === 'signup' ? 'login' : 'signup'));
    };

    return (
        <Component>
            <Box>
                <Image src={imageURL} alt="blog" />
                {
                    account === 'login' ? (
                        <Wrapper>
                            <TextField variant="standard" value={login.username} onChange={onValueChange} name='username' label='Enter Username' />
                            <TextField variant="standard" type="password" value={login.password} onChange={onValueChange} name='password' label='Enter Password' />
                            {error && <Error>{error}</Error>}
                            <LoginButton variant="contained" onClick={loginUser} disabled={loading}>
                                {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
                            </LoginButton>
                            <Text style={{ textAlign: 'center' }}>OR</Text>
                            <SignupButton onClick={toggleSignup} style={{ marginBottom: 50 }}>Create an account</SignupButton>
                        </Wrapper>
                    ) : (
                        <Wrapper>
                            <TextField variant="standard" onChange={onInputChange} name='name' label='Enter Name' />
                            <TextField variant="standard" onChange={onInputChange} name='username' label='Enter Username' />
                            <TextField variant="standard" type="password" onChange={onInputChange} name='password' label='Enter Password' />
                            {error && <Error>{error}</Error>}
                            <SignupButton onClick={signupUser} disabled={loading}>
                                {loading ? <CircularProgress size={24} color="inherit" /> : 'Signup'}
                            </SignupButton>
                            <Text style={{ textAlign: 'center' }}>OR</Text>
                            <LoginButton variant="contained" onClick={toggleSignup}>Already have an account</LoginButton>
                        </Wrapper>
                    )
                }
            </Box>
        </Component>
    );
};

export default Login;
