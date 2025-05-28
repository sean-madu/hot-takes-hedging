import React from 'react';
import ReactMarkdown from 'react-markdown';
import parse from 'html-react-parser';

import { Typography, Alert, Box, Link, Stack, Divider } from '@mui/material';
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
import latestJson from '../test/latest.json';
import j2 from '../test/2.json';
import j3 from '../test/3.json';
import j4 from '../test/4.json';
import j5 from '../test/5.json';
import j6 from '../test/6.json';
import j7 from '../test/7.json';

import type { InvestmentAdvice } from '../types'; // Sometimes useful for debugging so just leaving it here. TODO Delete for prod



// TODO: Add a nice gradient so the glasst effect looks better
const Home: React.FC = () => {
    const advice = [latestJson, j2, j3, j4, j5, j6, j7]
    const latestData = advice[0]
    const summaryCards = latestData["Investment Advice"].map((item, index) => (
        <AdviceSummaryCard key={index} advice={item} />
    ));

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
            {
                latestData ?
                    <Stack alignItems={'center'} width={'100vw'} spacing={1}>
                        <Typography sx={{ fontSize: { xs: '0.8rem', md: '1rem' } }}> LAST UPDATE AT A GLANCE | NEXT UPDATE IN 00:30</Typography>
                        <Ticker items={summaryCards} speed={80} />
                    </Stack> :
                    <Typography textAlign="center" color="textSecondary">
                        Latest Advice not found. Something might have gone wrong
                    </Typography>
            }


            <Box sx={{ maxWidth: { xs: '95vw', md: 800 }, m: "auto", p: { xs: 1, md: 2 } }}> {/* Adjust max width and padding */}

                {advice.length !== 0 ? (
                    <>
                        <Stack spacing={4}>
                            {advice.map((dataItem, stackIndex) => {

                                const adviceCards = dataItem["Investment Advice"] && Array.isArray(dataItem["Investment Advice"])
                                    ? dataItem["Investment Advice"].map((item, cardIndex) => (
                                        <FeaturedAdviceCard key={cardIndex} advice={item} />
                                    ))
                                    : []; // Provide an empty array if "Investment Advice" is missing or not an array

                                // I wanna sanitze this but it messes up the styling and google was very specific
                                const rawHtmlString = dataItem["searches"] ? dataItem["searches"] : '';
                                return (
                                    <div key={stackIndex}>
                                        {/* TODO: Extract title from Date it was posted*/}
                                        <Stack border={1}
                                            borderColor="divider"
                                            borderRadius={2}
                                            sx={{
                                                p: { md: 1, lg: 2 }, 
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    p: { xs: 2, md: 3 },
                                                    mb: { xs: 2, sm: 2, md: 0 }
                                                }}>
                                                <Accordion defaultExpanded={stackIndex === 0}>
                                                    <AccordionSummary
                                                        expandIcon={<ExpandMoreIcon />}
                                                        aria-controls="panel1-content"
                                                        id="panel1-header"
                                                    >
                                                        <Typography component="span" fontWeight={'bold'} sx={{ fontSize: { xs: '0.9rem', md: '1rem' } }}>NEWS USED FOR THIS PREDICTION</Typography>
                                                    </AccordionSummary>

                                                    <Divider />
                                                    <AccordionDetails sx={{
                                                        maxHeight: "50vh",
                                                        overflow: 'auto',
                                                        // WebKit-based browsers (Chrome, Safari, Edge, newer Firefox)
                                                        '&::-webkit-scrollbar-track': {
                                                            background: 'transparent', // Make the scrollbar track invisible
                                                        },
    
                                                        // None webkits
                                                        scrollbarWidth: 'thin', // 'auto' | 'thin' | 'none'
                                                        scrollbarColor: 'rgba(0, 0, 0, 0.3) transparent', // thumb color track color
                                                        
                                                    }}>
                                                        <Stack>

                                                            <ReactMarkdown>
                                                                {dataItem['summary']}
                                                            </ReactMarkdown>
                                                            <div className="search-results-html-container">
                                                                {parse(rawHtmlString)}
                                                            </div>
                                                        </Stack>
                                                    </AccordionDetails>

                                                </Accordion>

                                            </Box>

                                            <Carousel items={adviceCards} />

                                        </Stack>

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