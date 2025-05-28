import React, { useState } from 'react';
import {
    Box,
    Stack,
    Slide,
    useTheme,
    useMediaQuery,
    Pagination
} from '@mui/material';
import { useSwipeable } from 'react-swipeable';

type CarouselProps = {
    items: React.ReactNode[];
};

const SwipeableCarousel: React.FC<CarouselProps> = ({ items }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState<'left' | 'right'>('left');

    const handlePrev = () => {
        setDirection('right');
        setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setDirection('left');
        setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
    };

    const swipeHandlers = useSwipeable({
        onSwipedLeft: handleNext,
        onSwipedRight: handlePrev,
        trackMouse: false,
        delta: 10,
        trackTouch: true,
        touchEventOptions: { passive: false },
    });

    return (
        <>
            <Stack
                direction="column"
                alignItems="center"
                justifyContent="center"
                spacing={2}
                sx={{
                    width: '100%',
                    flexWrap: 'nowrap',
                    animation: 'height ease 0.3s',
                    p: { xs: 1, sm: 2 }
                }}
            >
                <Box
                    {...swipeHandlers}
                    sx={{
                        width: '100%',
                        maxWidth: '100%',
                        position: 'relative',
                        overflowX: 'hidden',
                        overflowY: 'auto',

                        display: 'flex',
                        flexDirection: 'column',
                        height: { xs: '70vh', sm: '85vh' },
                        p: { xs: 1, sm: 0 }, 

                        // WebKit-based browsers (Chrome, Safari, Edge, newer Firefox)
                        '&::-webkit-scrollbar-track': {
                            background: 'transparent', // Make the scrollbar track invisible
                        },

                        // None webkits
                        scrollbarWidth: 'thin', // 'auto' | 'thin' | 'none'
                        scrollbarColor: 'rgba(0, 0, 0, 0.3) transparent', // thumb color track color

                    }}
                >
                    <Slide
                        in
                        direction={direction}
                        key={currentIndex}
                        mountOnEnter
                        unmountOnExit
                        timeout={400}
                    >
                        <Box
                            sx={{
                                width: '100%',
                                position: 'relative',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                px: { xs: 2, sm: 0 }
                            }}
                        >
                            {items[currentIndex]}
                        </Box>
                    </Slide>
                </Box>
                <Pagination
                    count={items.length}
                    page={currentIndex + 1}
                    onChange={(_, value) => {
                        setCurrentIndex(value - 1);
                    }}
                    color="primary"
                    shape="rounded"
                    size={isMobile ? "medium" : "large"}
                    sx={{ padding: 1 }}
                />
            </Stack>
        </>
    );
};

export default SwipeableCarousel;