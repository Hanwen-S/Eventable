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

export default function Search(props){

  const { state } = useLocation();
  const event_id = state;
  const [eventlist, setList] = React.useState([]);
  useEffect(() => {
    axios
    .get("http://localhost:5000/events/" + event_id)
    .then(res => {
      const templist = [res.data]
      console.log(templist);
      return templist;
    })
    .then((templist) => {
      let participant_list = [];
      let event_date = [];
      const pairs = templist.map(item => ([item.participants_id, item.date]))
      console.log(participant_list)
      console.log(templist);
      return [templist, pairs];
    })
    .then((compots) => {
      const templist = compots[0];
      const pairs = compots[1];
      console.log('here is temp')
         const myobj3 = {
           pairs : pairs
         }
          axios
          .get("http://localhost:5000/time_slots/goget_times", {params: myobj3})
          .then((res) => {
            console.log(templist)
            let new_list = []
            for (let i = 0; i < templist.length; i++){
              new_list.push([templist[i], res.data[i]])
            }
            console.log(new_list);
            setList(eventlist => new_list)
          })
          .catch(function (error) {
            console.log(error);
        })
    })
    //window.location.reload();
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
            {console.log(eventlist)}
            {eventlist.map((item, index) => (
              <Grid item xs={3} sm={0} md={0} key={index}>
                <SelfCard it = {item[0]} time_slots = {item[1]} key={index} signal={false} signal2={true}/>
              </Grid>
            ))}
          </Grid>
      </Box>
    </Box>
    );
}
