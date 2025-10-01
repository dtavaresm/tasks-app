import { Box, Typography } from '@mui/material';

export default function HomePage() {

    return (
        <Box sx={{ width: '100%' }}>
            <Typography variant="body1" sx={{ fontWeight: '600', color: 'primary.dark', mb: 2 }}>
                Welcome to the Task Manager App
            </Typography>
            <Typography variant="body2" sx={{ color: 'primary.dark', textAlign: 'justify' }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eu ipsum ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ullamcorper elementum tellus, sed viverra diam rutrum vitae. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam vestibulum erat nec erat viverra iaculis. Etiam sed efficitur nulla. In hac habitasse platea dictumst.
            </Typography>
        </Box>
    )
}