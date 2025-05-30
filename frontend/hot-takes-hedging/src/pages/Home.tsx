import React from 'react';
import { useQuery } from '@tanstack/react-query';

import { fetchLatestAdvice } from '../api'; 

import {
    Typography,
    Alert,
    Box,
    Link,
    Stack,
    CircularProgress,
} from '@mui/material';

import InvestmentPostsDisplay from '../components/InvestmentPostsDisplay';
import SummaryTicker from '../components/SummaryTicker';

// TODO: Add a nice gradient so the glasst effect looks better
const Home: React.FC = () => {
    const {
        data: advice,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['latestAdvice'],
        queryFn: fetchLatestAdvice, 
        staleTime: Infinity,
    });

    return (
        <>
            <Box
                alignItems={'center'}
                sx={{
                    m: { xs: 1, md: 2 },
                    p: 0
                }}
            >
                <Typography
                    variant="h2"
                    fontWeight={'bold'}
                    gutterBottom
                    textAlign="center"
                    sx={{ fontSize: { xs: '2.5rem', md: '3.75rem' } }}
                >
                    HEDGE YOUR BETS!
                </Typography>
                <Alert severity='error' sx={{
                    mb: 2,
                    fontSize: { xs: '1rem', md: '1.25rem' }, 
                    padding: { xs: '8px 12px', md: '16px 24px' } 
                }}>
                    This is <b>NOT</b> financial advice, it is 1000% AI made, see the full disclaimer on our{" "}
                    <Link href="/about" underline="hover">
                        about page here
                    </Link>
                    .
                    Take it more as an exercise to see how many things you can spot wrong
                </Alert>
            </Box>

            {isLoading ? (
                <Box display="flex" justifyContent="center" mt={4}>
                    <CircularProgress />
                </Box>
            ) : isError ? (
                <Alert severity="error" sx={{ m: 2 }}>
                    Failed to load the latest advice: {error instanceof Error ? error.message : 'Unknown error'}
                </Alert>
            ) : advice && advice.length > 0 ? (
                <>
                    <Stack alignItems={'center'} width={'100vw'} spacing={1}>
                        <Typography sx={{ fontSize: { xs: '0.8rem', md: '1rem' } }}>
                            LAST UPDATE AT A GLANCE | NEXT UPDATE IN 00:30
                        </Typography>
                        <SummaryTicker advice={advice[0]['Investment Advice']} speed={80} />
                    </Stack>
                    <InvestmentPostsDisplay posts={advice} />
                </>
            ) : (
                <Typography textAlign="center" color="textSecondary">
                    Latest Advice not found. Something might have gone wrong.
                </Typography>
            )}
        </>

    );
};

export default Home;