import { useState } from "react";
import { NavLink, NavLinkProps } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from '@mui/icons-material/Home';
import TaskIcon from '@mui/icons-material/Task';
import { styled } from "@mui/material/styles";
import { Box, Drawer, IconButton, MenuItem, MenuItemProps, MenuList, Paper, Typography, useMediaQuery, useTheme } from '@mui/material';

const StyledPaper = styled(Paper)(({ theme }) => ({
    borderRadius: 0,
    height: 'fit-content',
    padding: 0,
    marginTop: theme.spacing(1),
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
    color: theme.palette.primary.main,
    position: 'fixed',
    top: theme.spacing(1),
    left: theme.spacing(4),
    backgroundColor: theme.palette.background.paper
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
    display: "flex",
    flexFlow: "row nowrap",
    alignItems: "center",
    gap: theme.spacing(1),
    padding: theme.spacing(1),
    textDecoration: 'none',
    color: theme.palette.primary.main,
    "& .MuiTypography-root": {
        fontWeight: 600,
        fontSize: theme.typography.body1.fontSize,
        lineHeight: theme.typography.body1.lineHeight,
        color: 'inherit',
    },
    ".active &": {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.light
    },
    [theme.breakpoints.down('sm')]: { 
        paddingLeft: theme.spacing(4), 
    }
}));

type NavMenuItemProps = MenuItemProps & NavLinkProps;

export const NavMenuItem = ({ to, ...props }: NavMenuItemProps) => (
    <NavLink
        to={to}
        className={({ isActive }) => (isActive ? "active" : undefined)}
        style={{ textDecoration: "none" }}>
        <StyledMenuItem {...props} />
    </NavLink >
);

export default function Menu() {
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const toggleDrawer = (state: boolean) => () => {
        setOpen(state);
    }

    const menuContent = (
        <MenuList sx={{ p: 0 }}>
            <NavMenuItem
                to="/"
                onClick={isMobile ? toggleDrawer(false) : undefined}>
                <HomeIcon />
                <Typography>Home</Typography>
            </NavMenuItem>
            <NavMenuItem
                to="/tasks"
                onClick={isMobile ? toggleDrawer(false) : undefined}>
                <TaskIcon />
                <Typography>Tasks</Typography>
            </NavMenuItem>
        </MenuList>
    );

    return (
        <>
            {isMobile ? (
                <>
                    <StyledIconButton
                        edge="start"
                        aria-label="menu"
                        onClick={toggleDrawer(true)}>
                        <MenuIcon />
                    </StyledIconButton>

                    <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
                        <Box sx={{ width: '70vw' }} role="presentation">
                            {menuContent}
                        </Box>
                    </Drawer>
                </>
            ) : (
                <StyledPaper elevation={6}>
                    {menuContent}
                </StyledPaper>
            )}
        </>
    );
}