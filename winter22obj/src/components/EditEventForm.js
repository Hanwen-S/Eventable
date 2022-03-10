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
import './CreateEventForm.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useNavigate as useHistory, useLocation } from 'react-router-dom';
import { useState,useEffect } from 'react';
const drawerWidth = 240;



const EditEventForm=(props) =>{
  const { state } = useLocation();
  const event_id = state
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  var changed=false;

  const drawer = (
    <div>
      <Toolbar />

      <Divider />

    </div>
  );
  const [values, setValues] = useState();
  /*
  const getEvent = async() => {
    const eventResponse= await fetch(`http://localhost:5000/events/${event_id}`);
    const event = await eventResponse.json();
    setValues(event);
    localStorage.setItem('new_event_name', event.event_name);
    localStorage.setItem('new_address', event.address);
    localStorage.setItem('new_date', event.date);
    localStorage.setItem('new_planned_start_time', event.new_planned_start_time);
    localStorage.setItem('new_planned_end_time', event.new_planned_end_time);
    localStorage.setItem('new_description', event.description);
    return event;
  };
  getEvent();
  console.log(values);
*/
async function fetchUserData () {
  try {
    const result = await fetch(`http://localhost:5000/events/${event_id}`, {
      method: "GET"
    })
    return await result.json()
  } catch (err) {
    console.log(err)
    return null
  }
}
const [event,setEvent]=useState({});

useEffect(() => {
  fetchUserData().then(data => {
    setEvent(data);
    console.log(data);
  });
},[]);
console.log(event);


    
/*


  useEffect(() => {
    fetchUserData().then(data => {
      data && setUserData(data)
    })
  }); // componentDidMount
  */

//FunctionalComponent();
/*
  console.log(userData);
    
*/
  const container = window !== undefined ? () => window().document.body : undefined;
  const signal = 1;
  let history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    const newevent = new FormData(event.currentTarget);
        const myobj2 = {
          new_event_name: newevent.get('event_name'),
          new_date: newevent.get('date'),
          new_address: newevent.get('address'),
          new_status: false,
          new_planned_start_time: newevent.get('planned_start_time'),
          new_planned_end_time: newevent.get('planned_end_time'),
          new_description: newevent.get('description'),
        }; 
        
        axios
          .post(
            "http://localhost:5000/update1/" + event_id, 
            myobj2)
          .then((res) => console.log(res.data))
          .then(() => history(
            '../myEvent',
         ));
  };

  const handleDelete = (event) => {
    event.preventDefault();
        axios
          .delete(
            "http://localhost:5000/delete1/" + event_id)
          .then((res) => console.log(res.data))
          .then(() => history(
            '../myEvent',
         ));
  };

  const handleChange = (e) => {
    setEvent({
      ...event,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Grid container spacing={{ xs: 0, md: 0 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        <ResponsiveAppBar wid={1450}/>
        <Box
        component="form"
        sx={{
        '& .MuiTextField-root': { m: 4, width: '45ch' },
        }}
        onSubmit={handleSubmit}
        noValidate
        autoComplete="off"
        >
          <div>
            <TextField 
            id='name' 
            name="event_name" 
            label="New_Event_Name*" 
            variant="filled" 
            value={event.event_name}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}  

            />
          </div>
          <div>
            <TextField id="address" name="address" label="New_Address*" variant="filled" 
              value={event.address}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}  
            />
          </div>
          <div>
            <TextField id="date" name="date" label="New_Planned_Date*" placeholder="Enter in the form of yyyy-mm-dd" variant="filled" />
          </div>
          <div>
            <TextField id="starttime" name="planned_start_time" label="New_Planned_Start_Time*" placeholder="Enter in the form of hh:mm" variant="filled" />
            <TextField id="endtime" name="planned_end_time" label="New_Planned_End_Time*" placeholder="Enter in the form of hh:mm" variant="filled" />
          </div>
          <div>
            <TextField
            id="description"
            name="description"
            label="New_Description"
            rows={5}
            multiline
            variant="filled"
            />
          </div>
          <div>
            <Button className='formbutton' type="submit" variant="contained">update</Button>
            <Button className='deletebutton' onClick={handleDelete} variant="contained">DELETE EVENT</Button>
          </div>
        </Box>
      </Grid>
    </Box>
  );
}

EditEventForm.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default EditEventForm;