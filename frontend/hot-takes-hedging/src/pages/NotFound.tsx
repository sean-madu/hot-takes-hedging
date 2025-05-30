import { Typography, Stack, Button } from '@mui/material';
import React from 'react';
import GlassCard from '../components/GlassCard';

const NotFound: React.FC = () => {

    return <>
        <Stack alignItems={'center'} spacing={2} p={2} m={2}>
            <GlassCard>
                <Typography variant={'h4'} fontWeight={'bold'} textAlign={'center'}>
                    Whatever you were looking for, can't be found. 404
                </Typography>
                <Typography textAlign={'center'}>
                    Why don't you check out our actual pages instead?
                </Typography>
                <Stack width={'100%'} alignItems={'center'} direction={'row'} spacing={2}>
                    {/* TODO: I feel I should move these into their own components.. */}
                    <Button variant='contained'>
                        HOME
                    </Button>
                    <Button variant='contained'>
                        ABOUT
                    </Button>
                </Stack>

            </GlassCard>

        </Stack>

    </>
}

export default NotFound;
