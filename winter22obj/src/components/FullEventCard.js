import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FullEventForm from './FullEventForm';
import ResponsiveAppBar from './newnavbar';
const theme = createTheme();

export default function EvenCard(){
    return(
        <React.Fragment>
            
            <CssBaseline />
            <ResponsiveAppBar/>
            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
            <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
            <Typography component="h1" variant="h4" align="center">
                Event Card ID:
            </Typography>
            <React.Fragment>
                <FullEventForm/>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  
                    <Button sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  <Button
                    variant="contained"
                    
                    sx={{ mt: 3, ml: 1 }}
                  >
                    Edit
                  </Button>
                </Box>
            </React.Fragment>
            </Paper>
            </Container>
        </React.Fragment>

    );
}