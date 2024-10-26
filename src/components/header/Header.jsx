import React, { useState } from 'react';
import { AppBar, Toolbar, styled, IconButton, Drawer, Box, Typography } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

const Component = styled(AppBar)`
    background: #FFFFFF;
    box-shadow: none;
`;

const Container = styled(Toolbar)`
    display: flex;
    justify-content: center;
    align-items: center; /* Fix alignment here */
    min-height: 64px;
`;

const LinkBox = styled(Box)`
    display: flex;
    gap: 32px;
    align-items: center;

    & a, & p {
        text-decoration: none;
        color: black;
        font-weight: 500;
        font-size: 18px;
        cursor: pointer;
        position: relative;
    }

    & a.active::after {
        content: '';
        position: absolute;
        bottom: -4px;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: #1976d2;
    }

    & a:hover, & p:hover {
        color: #1976d2;
    }
`;

const MenuButton = styled(IconButton)(({ theme }) => ({
    display: 'none',
    [theme.breakpoints.down('sm')]: {
        display: 'block',
    },
}));

const DrawerContent = styled(Box)`
    width: 250px;
    display: flex;
    flex-direction: column;
    padding: 16px;
    gap: 16px;

    & a, & p {
        text-decoration: none;
        color: black;
        font-weight: 500;
        font-size: 18px;
        cursor: pointer;
    }

    & a:hover, & p:hover {
        color: #1976d2;
    }
`;

const Header = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/account');
    };

    const toggleDrawer = (open) => () => {
        setDrawerOpen(open);
    };

    const renderLinks = () => (
        <>
            <NavLink to="/" end>HOME</NavLink>
            <NavLink to="/about">ABOUT</NavLink>
            <NavLink to="/contact">CONTACT</NavLink>
            <Typography onClick={handleLogout}>LOGOUT</Typography>
        </>
    );

    return (
        <Component position="static">
            <Container>
                <MenuButton onClick={toggleDrawer(true)} aria-label="menu">
                    <MenuIcon />
                </MenuButton>

                <LinkBox>{renderLinks()}</LinkBox>

                <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                    <DrawerContent onClick={toggleDrawer(false)}>
                        {renderLinks()}
                    </DrawerContent>
                </Drawer>
            </Container>
        </Component>
    );
};

export default Header;