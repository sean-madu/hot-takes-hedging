import React, { useRef, useEffect, useState } from 'react';
import {  Box } from '@mui/material';

type TickerProps = {
  items: React.ReactNode[];
  speed?: number; // pixels per second
};

const Ticker: React.FC<TickerProps> = ({ items, speed = 50 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [animationDuration, setAnimationDuration] = useState(0);

  useEffect(() => {
    if (contentRef.current && containerRef.current) {
      const contentWidth = contentRef.current.scrollWidth / 2; // because content is duplicated
      const duration = contentWidth / speed; // seconds
      setAnimationDuration(duration);
    }
  }, [items, speed]);

  return (
    <Box
      ref={containerRef}
      sx={{
        overflow: 'hidden',
        width: '100%',
        borderTop: '1px solid',
        borderBottom: '1px solid',
        bgcolor: 'background.paper',
        py: 1,
        userSelect: 'none',
      }}
    >
      <Box
        ref={contentRef}
        sx={{
          display: 'flex',
          width: 'max-content',
          animation: animationDuration
            ? `ticker-scroll ${animationDuration}s linear infinite`
            : 'none',
        }}
      >
        {/* Duplicate the items twice */}
        {[...items, ...items].map((item, i) => (
          <Box key={i} sx={{ mr: 4, flexShrink: 0 }}>
            {item}
          </Box>
        ))}
      </Box>

      {/* CSS Keyframes */}
      <style>
        {`
          @keyframes ticker-scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
        `}
      </style>
    </Box>
  );
};

export default Ticker;
