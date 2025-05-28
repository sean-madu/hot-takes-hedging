// React imports
import React, {
    createContext,
    useState,
    useContext,
    useEffect,
} from 'react';

//Mui imports
import { createTheme } from '@mui/material/styles';
import { ThemeProvider, CssBaseline } from '@mui/material';

// Types
import type { ReactNode } from 'react'
import type { Theme } from '@mui/material/styles';

// Define the type for context value
interface ThemeContextType {
    isDarkMode: boolean;
    toggleTheme: () => void;
}

const glassBase = {
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Light theme
const lightTheme: Theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#4e342e',
        },
        secondary: {
            main: '#455a64',
        },
        text: {
            primary: '#212121',
        },
        success: {
            main: '#66bb6a',
        },
        info: {
            main: '#311b92', 
        },
        warning: {
            main: '#ff6f00',
        },
        divider: '#b71c1c',
        background: {
            default: '#eeeeee',
            paper: '#fafafa',
        },
    },
    typography: {
        fontFamily: 'Anonymous Pro',
    },
    components: {
        MuiSwitch: {
            styleOverrides: {
                root: {
                    width: 46,
                    height: 27,
                    padding: 0,
                    margin: 8,
                },
                switchBase: {
                    padding: 1,
                    '&.Mui-checked': {
                        transform: 'translateX(16px)',
                        color: '#fff',
                        '& + .MuiSwitch-track': {
                            opacity: 1,
                            border: 'none',
                        },
                    },
                },
                thumb: {
                    width: 24,
                    height: 24,
                },
                track: {
                    borderRadius: 13,
                    border: '1px solid #bdbdbd',
                    backgroundColor: '#fafafa',
                    opacity: 1,
                    transition:
                        'background-color 300ms cubic-bezier(0.4, 0, 0.2, 1), border 300ms cubic-bezier(0.4, 0, 0.2, 1)',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
              root: {
                ...glassBase,
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
              },
            },
          },
    },
});

// Dark theme
const darkTheme: Theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#b71c1c',
        },
        secondary: {
            main: '#ce93d8',
        },
        text: {
            primary: '#fffde7',
            secondary: '#ffebee',
        },
        success: {
            main: '#66bb6a',
        },
        info: {
            main: '#311b92', // Dark info is not good contrast TODO: Fix
        },
        warning: {
            main: '#ff6f00',
        },
        divider: '#ffff8d',
    },
    typography: {
        fontFamily: 'Anonymous Pro',
    },
    components: {
        MuiSwitch: {
            styleOverrides: {
                root: {
                    width: 46,
                    height: 27,
                    padding: 0,
                    margin: 8,
                },
                switchBase: {
                    padding: 1,
                    '&.Mui-checked': {
                        transform: 'translateX(16px)',
                        color: '#fff',
                        '& + .MuiSwitch-track': {
                            opacity: 1,
                            border: 'none',
                        },
                    },
                },
                thumb: {
                    width: 24,
                    height: 24,
                },
                track: {
                    borderRadius: 13,
                    border: '1px solid #bdbdbd',
                    backgroundColor: '#fafafa',
                    opacity: 1,
                    transition:
                        'background-color 300ms cubic-bezier(0.4, 0, 0.2, 1), border 300ms cubic-bezier(0.4, 0, 0.2, 1)',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
              root: {
                ...glassBase,
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
              },
            },
          },
    },
});

interface ThemeProviderWrapperProps {
    children: ReactNode;
}

export const ThemeProviderWrapper: React.FC<ThemeProviderWrapperProps> = ({
    children,
}) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const prefersDarkMode = window.matchMedia(
            '(prefers-color-scheme: dark)'
        ).matches;
        setIsDarkMode(prefersDarkMode);
    }, []);

    const toggleTheme = () => {
        // TODO: Save this 
        setIsDarkMode((prev) => !prev);
    };

    const theme = isDarkMode ? darkTheme : lightTheme;

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};

export const useThemeContext = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useThemeContext must be used within a ThemeProviderWrapper');
    }
    return context;
};
