import { SearchedProfile } from './searched_profile';
import { SearchedProfileDetails } from './searched_profile_detail';
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
  const this_user_id = localStorage.getItem('user_id');
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

  const resetSearched = () => {

  }


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
          {console.log(user_id)}
          {localStorage.setItem('searched_id', user_id)}
          <ResponsiveAppBar user_id={this_user_id} wid={1450} />
    </Grid>
    </Box>
    <SearchedProfile/>
    <SearchedProfileDetails/>
    </div>
    );
}
