import React from 'react';
import { Paper} from '@mui/material';
import type { PaperProps } from '@mui/material';

const GlassCard: React.FC<PaperProps> = ({ children, sx, ...props }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 4,
        backdropFilter: 'blur(10px)',
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark'
            ? 'rgba(0, 0, 0, 0.3)'
            : 'rgba(255, 255, 255, 0.5)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        ...sx,
      }}
      {...props}
    >
      {children}
    </Paper>
  );
};

export default GlassCard;
