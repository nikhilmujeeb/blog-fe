import React, { useState } from 'react';
import { AppBar, Toolbar, styled, IconButton, Drawer, Box, Typography, Divider } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

// Styled Components
const Component = styled(AppBar)`
    background: #ffffff;
    color: black;
    box-shadow: none;
    position: static;
`;

const Container = styled(Toolbar)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 64px;
    padding: 0 16px;
`;

const NavLinks = styled(Box)`
    display: flex;
    gap: 24px;

    & a {
        text-decoration: none;
        color: inherit;
        font-weight: 500;
        font-size: 16px;
        padding: 8px 0;
        position: relative;
    }

    & a.active::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: -2px;
        height: 2px;
        width: 100%;
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
    justifyContent: center,
    alignItems: center,
    gap: '24px',
    [theme.breakpoints.down('sm')]: {
        display: 'none',
    },
}));

const DrawerContent = styled(Box)`
    width: 250px;
    display: flex;
    flex-direction: column;
    padding: 16px;
`;

const LogoutText = styled(Typography)`
    cursor: pointer;
    font-weight: 500;
    &:hover {
        color: #1976d2;
    }
`;

// Header Component
const Header = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear session or token storage here
        navigate('/account');
    };

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
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
        <Component>
            <Container>
                {/* Mobile Menu Button */}
                <MenuButton onClick={toggleDrawer(true)} aria-label="menu">
                    <MenuIcon />
                </MenuButton>

                {/* Desktop Links */}
                <DesktopLinks>{renderLinks()}</DesktopLinks>

                {/* Drawer for Mobile */}
                <Drawer
                    anchor="left"
                    open={drawerOpen}
                    onClose={toggleDrawer(false)}
                >
                    <DrawerContent
                        role="presentation"
                        onClick={toggleDrawer(false)}
                        onKeyDown={toggleDrawer(false)}
                    >
                        {renderLinks()}
                        <Divider sx={{ marginTop: 2 }} />
                    </DrawerContent>
                </Drawer>
            </Container>
        </Component>
    );
};

export default Header;
