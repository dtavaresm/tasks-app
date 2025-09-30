import { useState } from "react";
import { NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from '@mui/icons-material/Home';
import TaskIcon from '@mui/icons-material/Task';
import { Box, Drawer, IconButton, MenuItem, MenuList, Paper, useMediaQuery, useTheme } from '@mui/material';

export default function Menu() {
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const toggleDrawer = (state: boolean) => () => {
        setOpen(state);
    }

    const menuContent = (
        <MenuList>
            <MenuItem component={NavLink} to="/" onClick={isMobile ? toggleDrawer(false) : undefined}
                sx={{
                    display: 'flex', flexFlow: 'row wrap', alignItems: 'center', gap: 1, p: 1,
                    '&.active': { bgcolor: 'primary.light' }
                }}>
                <HomeIcon sx={{ color: 'primary.main' }} />
                Home
            </MenuItem>
            <MenuItem component={NavLink} to="/tasks" onClick={isMobile ? toggleDrawer(false) : undefined}
                sx={{
                    display: 'flex', flexFlow: 'row wrap', alignItems: 'center', gap: 1, p: 1,
                    '&.active': { bgcolor: 'primary.light' }
                }}>
                <TaskIcon sx={{ color: 'primary.main' }} />
                Tasks
            </MenuItem>
        </MenuList>
    );


    return (
        <>
            {isMobile ? (
                <>
                    <IconButton
                        edge="start"
                        aria-label="menu"
                        onClick={toggleDrawer(true)}
                        sx={{ color: 'primary.main', position: 'fixed', top: 8, left: 20, bgcolor: 'background.paper' }}
                    >
                        <MenuIcon />
                    </IconButton>


                    <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
                        <Box sx={{ width: '70vw' }} role="presentation">
                            {menuContent}
                        </Box>
                    </Drawer>
                </>
            ) : (
                <Paper elevation={1} sx={{ borderRadius: 2, height: 'fit-content', mt: 1 }}>
                    {menuContent}
                </Paper>
            )}
        </>
    );
}