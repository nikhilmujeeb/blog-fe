import { useState } from 'react';
import { Box } from '@mui/material';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import DataProvider from './context/DataProvider';
import Header from './components/header/Header';
import Home from './components/home/Home';
import CreatePost from './components/create/CreatePost';
import DetailView from './components/details/DetailView';
import Update from './components/create/Update';
import About from './components/about/About';
import Contact from './components/contact/Contact';
import Login from './components/account/Login';

const PrivateRoute = ({ isAuthenticated }) => {
    const token = sessionStorage.getItem('accessToken');
    return isAuthenticated && token ? (
        <>
            <Header />
            <Outlet />
        </>
    ) : (
        <Navigate replace to='/account' />
    );
};

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    return (
        <DataProvider>
            <BrowserRouter>
                <Box>
                    <Routes>
                        <Route path="/" element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
                            <Route path="/" element={<Home />} />
                            <Route path="/create" element={<CreatePost />} />
                            <Route path="/post/:id" element={<DetailView />} />
                            <Route path="/update/:id" element={<Update />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/contact" element={<Contact />} />
                        </Route>
                        <Route path="/account" element={<Login isUserAuthenticated={setIsAuthenticated} />} />
                    </Routes>
                </Box>
            </BrowserRouter>
        </DataProvider>
    );
}

export default App;
