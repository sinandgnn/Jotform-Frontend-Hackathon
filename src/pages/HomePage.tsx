import { Container, Box, Typography, Divider } from "@mui/material";
import TestComponent from "../components/TestComponents";

const HomePage = () => {
    return (
        <Container>
            <Box sx={{ my: 4 }}>
                <TestComponent />
            </Box>
        </Container>
    );
};

export default HomePage;
