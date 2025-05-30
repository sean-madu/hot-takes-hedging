import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Typography, Stack, CircularProgress, Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { fetchAdvicePost } from '../api';
import type { InvestmentAdvicePosts } from '../types';

import InvestmentPostsDisplay from '../components/InvestmentPostsDisplay';

import SummaryTicker from '../components/SummaryTicker';

const Post: React.FC = () => {
    const [posts, setPosts] = useState<InvestmentAdvicePosts | undefined>(undefined);

    const { id, index } = useParams<{ id: string, index?: string }>();

    const parsedIndex = index ? parseInt(index, 10) : 0

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['postAndNextFive', id],
        queryFn: () => {
            if (!id) throw new Error('Post ID is undefined.');
            let numberedID = parseInt(id, 16);
            return fetchAdvicePost(numberedID, 5);
        },
        enabled: !!id, // Only run the query if `id` is defined
    });

    useEffect(() => {
        if (data) {
            setPosts(data);
        }
    }, [data]);

    // TODO: Move out loading circlar prog into another component, and use placeholders when loading
    if (isLoading) {
        return <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
        </Box>
    }

    if (isError) {
        return <Typography color="error">Error loading post: {error?.message}</Typography>;
    }


    return (
        <>
            {posts && posts.length > 0 && (
                <>
                    <Typography textAlign={'center'} sx={{
                        fontSize: { xs: '0.8rem', md: '1rem' },
                        display: { sm: 'none', md: 'block' }
                    }}> POST AT A GLANCE</Typography>
                    <SummaryTicker advice={posts[0]['Investment Advice']} speed={80} displayOnMobile={false} />
                </>

            )}
            <Stack>
                {posts && posts.length > 0 ? <InvestmentPostsDisplay posts={posts} defaultIndex={parsedIndex} /> : (
                    <Typography>No posts found.</Typography>
                )}
            </Stack>

        </>
    );
};

export default Post;