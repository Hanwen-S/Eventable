
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@mui/material';


export const SearchedProfileDetails = (props) => {

  const searched_id = localStorage.getItem('searched_id');

  const [user, setValues] = useState({
    first_name: "1 ",
    last_name: "2 ",
    email: "3 ",
    phone: "310 713 4217",
    events: [""],
  });

  axios
    .get("http://localhost:5000/records/" + searched_id)
    .then((res) =>{
      setValues({
        ...user,
        first_name: res.data.person_first_name,
        last_name: res.data.person_last_name,
        email: res.data.person_email,
        events: [res.data.person_joined_event_array],
      });
      //console.log(res.data.person_joined_events_array);
  });

  return (
    <form
      autoComplete="off"
      noValidate
    >
      <Card>
        <CardHeader
          title="Profile"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={2}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="First name"
                name="first_name"
                value={user.first_name}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Last name"
                name="last_name"
                value={user.last_name}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                value={user.email}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                type="text" pattern="[0-9]*"
                value={user.phone}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                fullWidth
                label="Events"
                name="Events"
                type="text"
                value= {user.events}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
      </Card>
    </form>
  );
};

