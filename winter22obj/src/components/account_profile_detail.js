
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



{/*
const states = [
  {
    value: 'alabama',
    label: 'Alabama'
  },
  {
    value: 'new-york',
    label: 'New York'
  },
  {
    value: 'san-francisco',
    label: 'San Francisco'
  }
];
*/}
const handleSubmit = () => {
  const myobj = {
      person_first_name: localStorage.getItem('user_first_name'),
      person_last_name: localStorage.getItem('user_last_name'),
      person_username: localStorage.getItem('user_username'),
      person_email: localStorage.getItem('user_email'),
      person_phone: localStorage.getItem('user_phone'),
      person_password:localStorage.getItem('user_password'),
  };
  console.log(myobj);
  axios
    .post(
      "http://localhost:5000/update/" + localStorage.getItem('user_id'), 
      myobj
    )
    .then((res) => {console.log(res.data)});
}; 



export const AccountProfileDetails = (props) => {
  const navigate = useNavigate();
  console.log(localStorage.getItem('user_first_name'));



  const [values, setValues] = useState({
    first_name: localStorage.getItem('user_first_name'),
    last_name: localStorage.getItem('user_last_name'),
    email: localStorage.getItem('user_email'),
    phone: localStorage.getItem('user_phone'),
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
    var changedField="user_"+event.target.name;
    localStorage[changedField]=event.target.value;
  };

  return (
    <form 
      autoComplete="off"
      noValidate
      {...props}
    >
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="First name"
                name="first_name"
                onChange={handleChange}
                required
                value={values.first_name}
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
                onChange={handleChange}
                required
                value={values.last_name}
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
                onChange={handleChange}
                required
                value={values.email}
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
                onChange={handleChange}
                type="text" pattern="[0-9]*"
                value={values.phone}
                variant="outlined"
              />
            </Grid>


          </Grid>
        </CardContent>
        <Divider />
        
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button
            color="primary"
            variant="contained"
            onClick = {handleSubmit}
          >
            Save details
          </Button> 
          </Box>
          
        
      </Card>

    </form>
  );
};

