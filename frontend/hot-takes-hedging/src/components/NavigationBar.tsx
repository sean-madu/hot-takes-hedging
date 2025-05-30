import React from 'react';
import { BottomNavigation, BottomNavigationAction, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import GavelIcon from '@mui/icons-material/Gavel';
import PolicyIcon from '@mui/icons-material/Policy';
import GlassCard from './GlassCard';

import { useLocation, useNavigate } from 'react-router-dom';

const NavigationBar: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [value, setValue] = React.useState(location.pathname);

    React.useEffect(() => {
        setValue(location.pathname);
    }, [location.pathname]);

    return (
        <GlassCard sx={{ borderRadius: 0, border: 0, p: 0, m: 0 }} elevation={3}>
            <Typography variant="body2" fontStyle="italic" color="gray" textAlign={'center'}>
                Any resemblance to sound financial strategy — living or dead — is purely coincidental.
            </Typography>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(_, newValue) => {
                    setValue(newValue);
                    navigate(newValue);
                }}
                sx={{
                    backgroundColor: 'transparent'
                }}
            >
                <BottomNavigationAction label="Home" value="/" icon={<HomeIcon />} />
                <BottomNavigationAction label="About" value="/about" icon={<InfoIcon />} />
                <BottomNavigationAction label="Terms" value="/tos" icon={<GavelIcon />} />
                <BottomNavigationAction label="Privacy Policy" value="/privacy" icon={<PolicyIcon />} />
            </BottomNavigation>
        </GlassCard>
    );
};


export default NavigationBar