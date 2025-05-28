import React from 'react';
import ReactMarkdown from 'react-markdown';

import { Typography, Alert, Box, Link, Stack, Divider, } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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



// TODO: Add a nice gradient so the glasst effect looks better
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
                <Alert severity='error' sx={{
                    mb: 2,
                    fontSize: '1.25rem',
                    padding: '16px 24px'
                }}>
                    This is <b>NOT</b> financial advice  see the full disclaimer on our{" "}
                    <Link href="/about" underline="hover">
                        about page
                    </Link>
                    .
                    Take it more as an exercise to see how many things you can spot wrong
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
                                        <Box border={1}
                                            borderColor="divider"
                                            borderRadius={2}
                                            p={3}
                                            >
                                            <Accordion defaultExpanded={stackIndex === 0}>
                                                <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon />}
                                                    aria-controls="panel1-content"
                                                    id="panel1-header"
                                                >
                                                    <Typography component="span" fontWeight={'bold'}>NEWS USED FOR THIS PREDICTION</Typography>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <ReactMarkdown>
                                                        {dataItem['summary']}
                                                    </ReactMarkdown>
                                                </AccordionDetails>
                                            </Accordion>
                                            <Carousel items={adviceCards} />

                                        </Box>

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
