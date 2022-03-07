import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ResponsiveAppBar from '../newnavbar';
// import BasicCard from '../card';
import { Grid } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import SlotCard from './slotCard';
import CreateCard from './createCard';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
//import List from '@mui/material/List';
const drawerWidth = 240;

function SlotsHome(props) {
  
  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <div>
        <CreateCard />
      </div>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="create a time slot"
      >
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* the slot home at the right side */}
      <Box>
        <Grid container spacing={{ xs: 1.5, md: 0 }} columns={{ xs: 4, sm: 8, md: 12 }}>
              <ResponsiveAppBar />
          {Array.from(Array(12)).map((_, index) => (
            <Grid item xs={2} sm={0} md={0} key={index}>
              <SlotCard/>
            </Grid>
          ))}
        </Grid>
        <Pagination count={10} variant="outlined" style={{
          position: 'absolute', left: '50%', bottom: '10%',
          transform: 'translate(-50%, -50%)'
          }}
        />
      </Box>
      
    </Box>
  );
}

SlotsHome.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default SlotsHome;
