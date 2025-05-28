import React from 'react';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4'; 
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Tooltip from '@mui/material/Tooltip';
import { useThemeContext } from '../ThemeContext';

const ThemeToggleButton: React.FC = () => {
  const { isDarkMode, toggleTheme } = useThemeContext();

  return (
    <Tooltip title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}>
      <IconButton
        color="inherit"
        onClick={toggleTheme}
        aria-label="toggle theme"
        size="large"
      >
        {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggleButton;
