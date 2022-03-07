import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import ResponsiveAppBar from './newnavbar';
import BasicCard from './card';
import SelfCard from './selfCard';
import { Grid } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import { useLocation } from 'react-router';

export const MyEvent = (props) => {
    return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Box>
        <Grid container spacing={{ xs: 1.5, md: 0 }} columns={{ xs: 4, sm: 8, md: 12 }}>

          {Array.from(Array(12)).map((_, index) => (
            <Grid item xs={2} sm={0} md={0} key={index}>
              <SelfCard/>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
    );
}
