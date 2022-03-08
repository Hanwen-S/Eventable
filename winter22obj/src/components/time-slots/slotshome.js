import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
//import Button from '@mui/material/Button';
import { useNavigate } from "react-router";
import CreateCard from './createCard';
import DisplayCard from './displayCard';
import EditCard from './editCard';

<<<<<<< HEAD
function SlotsHome(props) {
  const user_id = localStorage.getItem('user_id');
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
              <ResponsiveAppBar user_id={user_id}/>
          {Array.from(Array(12)).map((_, index) => (
            <Grid item xs={2} sm={0} md={0} key={index}>
              <SlotCard user_id={user_id}/>
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
=======
 
// the time slot card to be mapped
function SlotCard({slot, deleteSlot}) {
    //const slot = props.slot;
    const [isDisplay, setIsDisplay] = useState(true);
    const form = {
      id: slot._id,
      year: slot.year,
      month: slot.month,
      day: slot.day,
      start_hr: parseInt(slot.start_index/2), // 0-23
      start_min: (slot.start_index%2)*30 === 0 ? "00" : "30", // 0 or 1
      end_hr: parseInt(slot.end_index/2),
      end_min: (slot.end_index%2)*30 === 0 ? "00" : "30",
      coefficient: slot.coefficient,
    }
    
    // edit card
    const handleEdit = () => {
        setIsDisplay(false);
    }
    return (
        <div>
            {isDisplay ? 
            <DisplayCard form={form} 
            handleEdit={handleEdit} 
            deleteSlot={deleteSlot}/> : <EditCard form={form}/>}
            
        </div>
>>>>>>> 1be5379 (fetch data from backend and display in slothome. Merge slotCard.js into slothome.js.)
  );
}

// sidebar on the left: the card for creating a time slot
const drawerWidth = 240;
const drawer = (
  <div>
    <Toolbar />
    <Divider />
    <div>
      <CreateCard />
    </div>
  </div>
);

export default function SlotsHome() {
 const [slots, setSlots] = useState([]);
 const navigate = useNavigate();

 // This method fetches the records from the database.
 useEffect(() => {
   async function getSlots() {
     const response = await fetch(`http://localhost:5000/time_slots/`);
 
     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const slots = await response.json();
     setSlots(slots);
   }
 
   getSlots();
 
   return;
 }, [slots.length]);
 
 // This method will delete a slot (to be called in displayCard.js)
 async function deleteSlot(id) {
   await fetch(`http://localhost:5000/time_slots/delete/${id}`, {
     method: "DELETE"
   });
   
   const newSlots = slots.filter((el) => el._id !== id);
    setSlots(newSlots);
    console.log("one slot deleted");
    //window.location.reload();
      navigate("/slothome");
 }
 
 // This method will map out the slots on the page
 function slotsPage() { 
      return slots.map((slot, index) => {
        return (
          <Grid item xs={2} sm={0} md={0} key={index}>
            <SlotCard
              slot={slot}
              deleteSlot={() => deleteSlot(slot._id)}
              key={slot._id}
            />
          </Grid>
      )});
 }
  
   /*return Array.from(Array(12)).slots.map((slot) => {
     <Grid item xs={2} sm={0} md={0} key={index}>
     return (
       <SlotCard
         slot={slot}
         deleteSlot={() => deleteSlot(slot._id)}
         key={slot._id}
       />
     );
   }); */
 
 
 // This following section will display the table with the records of individuals.
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
        {slotsPage()}
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