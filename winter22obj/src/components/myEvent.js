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

const user_id = localStorage.getItem('user_id');

const drawer = (
  <div>
    <Toolbar />
    <Divider />
  </div>
);


export const MyEvent = (props) => {
    return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Box>
        <Box
        component="nav"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer>
          {drawer}
        </Drawer>
        <Drawer>
          {drawer}
        </Drawer>
      </Box>
        <Grid container spacing={{ xs: 0, md: 0}} columns={{ xs: 4, sm: 8, md: 12 }}>
                <ResponsiveAppBar user_id={user_id}/>
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
