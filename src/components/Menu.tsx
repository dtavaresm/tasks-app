import { useState } from "react";
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
            <MenuItem sx={{ display: 'flex', flexFlow: 'row wrap', alignItems: 'center', gap: 1 }}>
                <HomeIcon sx={{ color: 'primary.main' }} />
                Home
            </MenuItem>
            <MenuItem sx={{ display: 'flex', flexFlow: 'row wrap', alignItems: 'center', gap: 1 }}>
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
                        sx={{ color: 'primary.main', position: 'fixed', top: 0, left: 16, bgcolor: 'background.paper' }}
                    >
                        <MenuIcon />
                    </IconButton>


                    <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
                        <Box sx={{ width: '60vw' }} role="presentation">
                            {menuContent}
                        </Box>
                    </Drawer>
                </>
            ) : (
                <Paper elevation={1} sx={{ borderRadius: 2, height: 'fit-content' }}>
                    {menuContent}
                </Paper>
            )}
        </>
    );
}