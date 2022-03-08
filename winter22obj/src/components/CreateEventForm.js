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
import SlotCard from './time-slots/slotCard';
import './CreateEventForm.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useNavigate as useHistory } from 'react-router-dom';
const drawerWidth = 240;



function CreateEventForm(props) {
  let history = useHistory();

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />

      <Divider />

    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;
  const signal = 1;

  const handleSubmit = (event) => {
    console.log(event);
    event.preventDefault();
    //console.log(event.currentTarget)
    const newevent = new FormData(event.currentTarget);
    const myobj = {
      event_name: newevent.get('event_name'),
      date: newevent.get('date'),
      address: newevent.get('address'),
      status: false,
      planned_start_time: newevent.get('planned_start_time'),
      planned_end_time: newevent.get('planned_end_time'),
      description: newevent.get('description'),
    };
    // const mymessage = {
    //     message_sender_id:"1",
     //    message_receiver_id: "2",
     //    message_content: "3"
    // };
    //console.log(newperson);
    axios
      .post("http://localhost:5000/events/add", myobj)
      .then((res) => console.log(res.data));
      history(
        '../home',
     );
    // eslint-disable-next-line no-console
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}

        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>

        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
        </Drawer>
      </Box>
      <Grid container spacing={{ xs: 1.5, md: 0 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        <ResponsiveAppBar />
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
            <TextField id='name' name="event_name" label="Event_Name*" variant="filled" />
          </div>
          <div>
            <TextField id="address" name="address" label="Address*" variant="filled" />
          </div>
          <div>
            <TextField id="date" name="date" label="Planned_Date*" placeholder="Enter in the form of yyyy-mm-dd" variant="filled" />
          </div>
          <div>
            <TextField id="starttime" name="planned_start_time" label="Planned_Start_Time*" placeholder="Enter in the form of hh:mm" variant="filled" />
            <TextField id="endtime" name="planned_end_time" label="Planned_End_Time*" placeholder="Enter in the form of hh:mm" variant="filled" />
          </div>
          <div>
            <TextField
            id="description"
            name="description"
            label="Description"
            rows={5}
            multiline
            variant="filled"
            />
          </div>
          <div>
            <Button className='formbutton' type="submit" variant="contained">create</Button>
          </div>
        </Box>
      </Grid>
    </Box>
  );
}

CreateEventForm.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default CreateEventForm;
