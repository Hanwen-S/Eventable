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
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const user_id = localStorage.getItem('user_id');

const drawer = (
  <div>
    <Toolbar />
    <Divider />
  </div>
);

const updateEvent = () => {
  const myobj = {
    creator_id: user_id,
  };
  axios
  .get("http://localhost:5000/events/get", {
    params: myobj
  })
};

export const MyEvent = (props) => {
  // const navigate = useNavigate();
  // const routeChange = (path) => {
  //   navigate(
  //     path
  //   )}; 
  const eventlist = [];

  useEffect(() => {
    const myobj = {
      creator_id: localStorage.getItem('user_id'),
    };
    console.log(myobj);
    axios
      .get("http://localhost:5000/events/get", {params: myobj})
      .then((res) => {
        console.log(res.data);
        res.data.map(item => {
          eventlist.push(item)
        })
      })
      .catch(function (error) {
        console.log(error);
      })
    //   navigate(
    //     '../myEvent',
    //  );
  });
    return (
    <Box sx={{ display: 'flex' }}>
      {/* <button> Refresh </button> */}
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
