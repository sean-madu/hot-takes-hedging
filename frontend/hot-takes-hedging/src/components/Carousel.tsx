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

// TODO: on mobile make the height of things bigger actually since it wont have as much width to expand into
// But make the carousel medium instead of large
// ALso make things wider with more padding
const SwipeableCarousel: React.FC<CarouselProps> = ({ items }) => {
    const theme = useTheme();
    //const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
        trackMouse: true,
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
                sx={{ width: '100%', flexWrap: 'nowrap', animation: 'height ease 0.3s' }}

            >
                <Box
                    {...swipeHandlers}
                    sx={{
                        width: '100%',
                        maxWidth: '100%',
                        position: 'relative',
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: "90vh",
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
                                position: 'relative', // was 'absolute'
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
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
                    size="large"
                    sx={{padding: 1}}
                />


            </Stack>
        </>

    );
};

export default SwipeableCarousel;
