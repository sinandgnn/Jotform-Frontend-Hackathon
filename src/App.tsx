import { AppBar, Toolbar, Typography, Container } from "@mui/material";
import { Outlet } from "react-router-dom";

const App = () => {
    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">E Commerce</Typography>
                </Toolbar>
            </AppBar>
            <Container sx={{ mt: 4 }}>
                <Outlet />
            </Container>
        </>
    );
};

export default App;