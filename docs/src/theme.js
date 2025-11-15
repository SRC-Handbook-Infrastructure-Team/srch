import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
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
    styles: {
        global: {
            body: {
                bg: "#ffffff",
                color: "#1a1a1a",
                fontFamily: "body",
                fontSize: "md",
            },
        },
    },
})

export default theme
