import React from 'react';
import dayjs from 'dayjs';

import { Box, Stack, Typography, Accordion, AccordionSummary, AccordionDetails, Divider } from '@mui/material';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimeField } from '@mui/x-date-pickers/DateTimeField';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import FeaturedAdviceCard from './FeaturedAdviceCard'; 
import SwipeableCarousel from './Carousel'; 
import ArticleChip from './ArticleChip';

import type { InvestmentAdvicePosts } from '../types';

interface InvestmentPostsDisplayProps {
    posts: InvestmentAdvicePosts
    defaultIndex? : number // Default index for the first post
}

// TODO: Display post #

const InvestmentPostsDisplay: React.FC<InvestmentPostsDisplayProps> = ({ posts, defaultIndex }) => {
    return (
        <Box sx={{ maxWidth: { xs: '95vw', md: 800, lg: 1000 }, m: "auto", p: { xs: 1, md: 2 } }}>
            {posts && posts.length > 0 ? (
                <Stack spacing={4}>
                    {posts.map((investmentPost, index) => {
                        const hexId = investmentPost['hex ID'] ?? '0'
                        const adviceCards = investmentPost["Investment Advice"] && Array.isArray(investmentPost["Investment Advice"])
                            ? investmentPost["Investment Advice"].map((item, cardIndex) => (
                                
                                <FeaturedAdviceCard key={cardIndex} advice={item} postID={hexId} pageNum={`${cardIndex}`}  />
                            ))
                            : [];

                        const first = index === 0

                        return (
                            <div key={index}>
                                <Stack
                                    border={1}
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
                                        }}
                                    >
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DateTimeField
                                                label="Created At"
                                                value={dayjs(investmentPost.timestamp)}
                                                disabled 
                                                fullWidth
                                                format='LLL'
                                            />
                                        </LocalizationProvider>
                                        <Accordion defaultExpanded={first}>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls={`panel-${index}-content`}
                                                id={`panel-${index}-header`}
                                            >
                                                <Typography component="span" fontWeight={'bold'} sx={{ fontSize: { xs: '0.9rem', md: '1rem' } }}>
                                                    HEADLINES USED FOR THIS PREDICTION
                                                </Typography>
                                            </AccordionSummary>
                                            <Divider />
                                            <AccordionDetails sx={{
                                                maxHeight: "50vh",
                                                overflow: 'auto',
                                                '&::-webkit-scrollbar-track': {
                                                    background: 'transparent',
                                                },
                                                scrollbarWidth: 'thin',
                                                scrollbarColor: 'rgba(0, 0, 0, 0.3) transparent',
                                            }}>
                                                <Stack spacing={2}> 

                                                    {investmentPost.articles && investmentPost.articles.length > 0 && (
                                                        <>
                                                            {investmentPost.articles.map((article, articleIndex) => (
                                                                <ArticleChip article={article} key={articleIndex} />
                                                            ))}
                                                        </>
                                                    )}
                                                </Stack>
                                            </AccordionDetails>
                                        </Accordion>
                                    </Box>
                                    {adviceCards.length > 0 && (first ? <SwipeableCarousel defaultIndex={defaultIndex} items={adviceCards}/> : <SwipeableCarousel items={adviceCards}/>) }
                                </Stack>
                            </div>
                        );
                    })}
                </Stack>
            ) : (
                <Typography textAlign="center" color="textSecondary">
                    No Insights to Share...
                </Typography>
            )}
        </Box>
    );
};

export default InvestmentPostsDisplay;