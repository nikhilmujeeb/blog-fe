import React, { useState } from 'react';
import { AppBar, Toolbar, styled, IconButton, Drawer, Box, Typography } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

// Styled Components
const Component = styled(AppBar)`
    background: #ffffff;
    box-shadow: none;
`;

const Container = styled(Toolbar)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 64px;
    padding: 0 24px;
`;

const NavLinks = styled(Box)`
    display: flex;
    gap: 32px;

    & a {
        text-decoration: none;
        color: inherit;
        font-weight: 500;
        font-size: 18px;
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

    & a:hover {
        color: #1976d2;
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
    justifyContent: 'center',
    alignItems: 'center',
    gap: '32px',
    [theme.breakpoints.down('sm')]: {
        display: 'none',
    },
}));

const DrawerContent = styled(Box)`
    width: 250px;
    display: flex;
    flex-direction: column;
    padding: 16px;

    & a {
        margin-bottom: 16px;
        text-decoration: none;
        color: inherit;
        font-weight: 500;
    }

    & a:hover {
        color: #1976d2;
    }
`;

const LogoutText = styled(Typography)`
    cursor: pointer;
    font-weight: 500;
    &:hover {
        color: #1976d2;
    }
`;

const Header = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear session or token storage here
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
            <LogoutText onClick={handleLogout}>LOGOUT</LogoutText>
        </>
    );

    return (
        <Component position="static">
            <Container>
                <MenuButton onClick={toggleDrawer(true)} aria-label="menu">
                    <MenuIcon />
                </MenuButton>

                <DesktopLinks>{renderLinks()}</DesktopLinks>

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
