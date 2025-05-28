import React from 'react';
import { Typography, Alert, Box, Link, Stack, Divider, } from '@mui/material';

import FeaturedAdviceCard from '../components/FeaturedAdviceCard';
import AdviceSummaryCard from '../components/AdviceSummaryCard';
import Ticker from '../components/Ticker';
import Carousel from '../components/Carousel';

// This is just test data in real life, it will load 5 at a time then load the next 5 when they scroll to the bottom
// and so on.. TODO:  Adding in that loading only 5 feature
import latestData from '../test/latest.json';
import j2 from '../test/2.json';
import j3 from '../test/3.json';
import j4 from '../test/4.json';
import j5 from '../test/5.json';
import j6 from '../test/6.json';
import j7 from '../test/7.json';

import type { InvestmentAdvice } from '../types'; // Sometimes useful for debugging so just leaving it here. TODO Delete for prod



const Home: React.FC = () => {
    const advice = [latestData, j2, j3, j4, j5, j6, j7]

    const summaryCards = latestData["Investment Advice"].map((item, index) => (
        <AdviceSummaryCard key={index} advice={item} />
    ));

    return (
        <>
        <Box alignItems={'center'} m={2}>
        <Typography variant="h2" fontWeight={'bold'} gutterBottom textAlign="center">
                HEDGE YOUR BETS!
            </Typography>
            <Alert severity='error' sx={{ mb: 2, 
                    fontSize: '1.25rem',  
                    padding: '16px 24px'   
             }}>
                This is <b>NOT</b> financial advice  see the full disclaimer on our{" "}
                <Link href="/about" underline="hover">
                    about page
                </Link>
                .
            </Alert>
        
        </Box>
        {
            latestData ?
            <Stack alignItems={'center'} width={'100vw'} spacing={1}>
            <Typography> LAST UPDATE AT A GLANCE</Typography>
            <Ticker items={summaryCards} speed={80} />
        </Stack> : 
        <Typography textAlign="center" color="textSecondary">
        Latest Advice not found. Something might have gone wrong
    </Typography>
        }


            <Box sx={{ maxWidth: 800, m: "auto", p: 2, width: "90vw" }}>

                {advice.length !== 0 ? (
                    <>
                        {/* TODO: MAke them more distinct  (maybe a box around each one) and add in all date and all that jazz*/}
                        <Stack spacing={4}> 
                            {advice.map((dataItem, stackIndex) => {
                            
                                const adviceCards = dataItem["Investment Advice"] && Array.isArray(dataItem["Investment Advice"])
                                    ? dataItem["Investment Advice"].map((item, cardIndex) => (
                                        <FeaturedAdviceCard key={cardIndex} advice={item} />
                                    ))
                                    : []; // Provide an empty array if "Investment Advice" is missing or not an array

                                return (
                                    <div key={stackIndex}>
                                        {/* TODO: Extract title from Date it was posted*/}
                                        <Carousel items={adviceCards} />
                                        <Divider/>
                                    </div>
                                );
                            })}
                        </Stack>
                    </>
                ) : (
                    <Typography textAlign="center" color="textSecondary">
                        No advice available at the moment. Something might have gone wrong
                    </Typography>
                )}
            </Box>
        </>

    );
};

export default Home;
