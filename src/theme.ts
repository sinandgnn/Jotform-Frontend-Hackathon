import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: '#845EC2',
            light: '#F6F0FF',
        },
        secondary: {
            main: '#FF1744',
        },
        text: {
            primary: '#212121',
            secondary: '#666666',
        },
    },
    typography: {
        allVariants: {
            fontFamily: "Roboto, sans-serif",
            textTransform: "none",
        }
    },
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    boxShadow: '0px 0px 10px rgba(132, 94, 194, 0.2)', // Purple shadow
                    borderRadius: '12px',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '50px', // oval
                    padding: '4px 16px',
                },
            },
        },
    },
});

export default theme;
