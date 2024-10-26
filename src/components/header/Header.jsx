import React, { useState } from 'react';
import { AppBar, Toolbar, styled, IconButton, Drawer, Box, Typography } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

const Component = styled(AppBar)`
    background: #FFFFFF;
    color: black;
`;

const Container = styled(Toolbar)`
    justify-content: center;
    & > a {
        padding: 20px;
        color: #000;
        text-decoration: none;
        font-weight: 500;
    }
    & a.active {
        color: #1976d2;  /* Highlight active link */
        border-bottom: 2px solid #1976d2;
    }
`;

const MenuButton = styled(IconButton)(({ theme }) => ({
    display: 'none',
    [theme.breakpoints.down('sm')]: {
        display: 'block',
    },
}));

const DesktopLinks = styled(Box)(({ theme }) => ({
    display: 'flex',
    textDecoration: 'none',
    [theme.breakpoints.down('sm')]: {
        display: 'none',
    },
}));

const Header = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        // Perform any logout logic here (e.g., clear session)
        navigate('/account');
    };

    const toggleDrawer = () => setDrawerOpen(!drawerOpen);

    return (
        <Component position="static">
            <Toolbar>
                <MenuButton onClick={toggleDrawer} aria-label="menu">
                    <MenuIcon />
                </MenuButton>
                
                <DesktopLinks>
                    <NavLink to="/" end>HOME</NavLink>
                    <NavLink to="/about">ABOUT</NavLink>
                    <NavLink to="/contact">CONTACT</NavLink>
                    <Typography onClick={handleLogout} style={{ cursor: 'pointer', padding: '20px' }}>
                        LOGOUT
                    </Typography>
                </DesktopLinks>

                <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
                    <Box p={2} role="presentation" onClick={toggleDrawer}>
                        <NavLink to="/" end>HOME</NavLink>
                        <NavLink to="/about">ABOUT</NavLink>
                        <NavLink to="/contact">CONTACT</NavLink>
                        <Typography onClick={handleLogout} style={{ cursor: 'pointer', padding: '10px 0' }}>
                            LOGOUT
                        </Typography>
                    </Box>
                </Drawer>
            </Toolbar>
        </Component>
    );
};

export default Header;
