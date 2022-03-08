import { AccountProfile } from "./account_profile";
import {AccountProfileDetails} from "./account_profile_detail";
import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import ResponsiveAppBar from './newnavbar';
import BasicCard from './card';
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

export const Account = (props) => {
    return(
        <div>
        <CssBaseline />
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
        <Box>
        <Grid container spacing={{ xs: 0, md: 0 }} columns={{ xs: 8, sm: 8, md: 12 }}>
              <ResponsiveAppBar user_id={user_id}/>
        </Grid>
        </Box>
        <AccountProfile/>
        <AccountProfileDetails/>
        </div>
    );
}
