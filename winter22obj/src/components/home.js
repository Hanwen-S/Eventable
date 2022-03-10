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
import {useEffect, useState} from 'react';
import axios from 'axios';

const user_id = localStorage.getItem('user_id');

const drawer = (
  <div>
    <Toolbar />
    <Divider />
  </div>
);

export default function ResponsiveDrawer(props){
  // const navigate = useNavigate();
  // const routeChange = (path) => {
  //   navigate(
  //     path
  //   )};

  const [eventlist1, setList1] = React.useState([]);
  const [eventlist2, setList2] = React.useState([]);
  const[pageNum, setPageNum] = useState(1)
  const handleChange = (event, value) => {
    setPageNum(value);
  };
  useEffect(() => {
    const myobj = {
      creator_id: localStorage.getItem('user_id'),
    };
    const myobj2 = {
      creator_id: localStorage.getItem('user_id'),
      participants_id: localStorage.getItem('user_id'),
    };
    axios
      .get("http://localhost:5000/events/get", {params: myobj})
      .then((res) => {
        setList1(eventlist1 => [...res.data])
      })
      .catch(function (error) {
        console.log(error);
      })
      axios
      .get("http://localhost:5000/events/get1", {params: myobj2})
      .then((res) => {
        setList2(eventlist2 => [...res.data])
      })
      .catch(function (error) {
        console.log(error);
      })
  }, []);
    console.log(eventlist1);
    console.log(eventlist2);
    const eventlist = eventlist1.concat(eventlist2);

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
                <ResponsiveAppBar user_id={user_id} wid={1450}/>
            {eventlist.map((item, index) => (
              (index < 12*(pageNum) && index >= 12*(pageNum-1)) ?
              <Grid item xs={3} sm={0} md={0} key={index}>
                <SelfCard it = {item} key={index} signal={false} signal2={false}/>
              </Grid> :
              null
            ))}
          </Grid>
          <Pagination count={10} variant="outlined" style={{
        position: 'absolute', left: '50%', bottom: '0%',
        transform: 'translate(-50%, -50%)'
        }}
        page={pageNum}
        onChange={handleChange}
      />
      </Box>
    </Box>
    );
}