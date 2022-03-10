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
import {useEffect} from 'react';
import axios from 'axios';


const drawer = (
  <div>
    <Toolbar />
    <Divider />
  </div>
);

export default function SearchUser(props){

  const { state } = useLocation();
  const user_id = state;
  const [userlist, setList] = React.useState([]);
  useEffect(() => {
    axios
    .get("http://localhost:5000/records/" + user_id)
    .then((res) => {
      setList(userlist => [res.data])
    })
    .catch(function (error) {
      console.log(error);
    })
    // window.location.reload();
  }, []);


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
                <ResponsiveAppBar wid={1450}/>
                {console.log(userlist)}
          </Grid>
      </Box>
    </Box>
    );
}
