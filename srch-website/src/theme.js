import { extendTheme } from '@chakra-ui/react';

const config = {
    initialColorMode: 'light',
    useSystemColorMode: false,
};

const theme = extendTheme({
    config,
    fonts: {
        heading: "'Open Sans', sans-serif",
        body: "'Inter', sans-serif",
    },
    fontSizes: {
        sm: "0.8em",
        md: "1em",
        lg: "1.125em",
        xl: "1.68em",
    },
    colors: {
        primary: {
            light: '#7b4b24',
            dark: '#263A26',
        },
        text: {
            light: '#1a1a1a',
            dark: '#e0e0e0',
        },
        background: {
            light: '#ffffff',
            dark: '#1a1a1a',
        },
        accent: {
            light: '#9d0013',
            dark: '#A5D8AE',
        },
    },
    styles: {
        global: (props) => ({
            ':root, :host': {
                '--color-text': props.colorMode === 'dark' ? '#e0e0e0' : '#1a1a1a',
                '--sub-header-text-color': props.colorMode === 'dark' ? '#e0e0e0' : '#7b4b24',
                '--color-bg': props.colorMode === 'dark' ? '#1a1a1a' : '#ffffff',
                '--color-bg-alt': props.colorMode === 'dark' ? '#252525' : '#f8f9fa',
                '--color-border': props.colorMode === 'dark' ? '#404040' : '#e0d7ce',
                '--color-accent': props.colorMode === 'dark' ? '#263A26' : '#7b4b24',
                '--color-accent-hover': props.colorMode === 'dark' ? '#A5D8AE' : '#9d0013',
                '--navbar-bg': props.colorMode === 'dark' ? '#252525' : '#ffffff',
                '--navbar-border': props.colorMode === 'dark' ? '#404040' : '#e0d7ce',
            },
            body: {
                bg: 'var(--color-bg)',
                color: 'var(--color-text)',
                fontFamily: "body",
                fontSize: "md",
            },
        }),
    },
    components: {
        Button: {
            variants: {
                'learn-more': (props) => ({
                    bg: 'transparent',
                    border: 'none',
                    outline: '2px solid',
                    outlineColor: 'var(--button-outline)',
                    outlineOffset: '-2px',
                    borderRadius: '16px',
                    padding: '10px 20px',
                    _hover: {
                        bg: props.colorMode === 'dark' ? '#284C28' : 'rgba(83, 28, 0, 0.05)',
                        outlineColor: props.colorMode === 'dark' ? '#284C28' : 'rgba(83, 28, 0, 0.4)',
                        '& img': {
                            filter: props.colorMode === 'dark' ? 'brightness(0) invert(1)' : 'none'
                        }
                    },
                    _focus: {
                        boxShadow: 'none'
                    }
                })
            }
        },
        Text: {
            baseStyle: (props) => ({
                color: 'var(--color-text)',
            }),
        },
        Heading: {
            baseStyle: (props) => ({
                color: 'var(--color-text)',
                '&[class*="css-"]': {
                    color: 'var(--sub-header-text-color) !important',
                }
            }),
        },
    },
});

export default theme
