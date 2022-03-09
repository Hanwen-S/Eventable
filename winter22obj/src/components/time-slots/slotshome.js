import React, { useEffect, useState } from "react";
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
import axios from 'axios';
 
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

      start_index: slot.start_index,
      start_min_index: slot.start_index % 2,
      end_index: slot.end_index,
      end_min_index: slot.end_index % 2,
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
  );
}

export default function SlotsHome() {
 const [slots, setSlots] = useState([]);
 const navigate = useNavigate();

 //const params = useParams();
 const user_id = localStorage.getItem('user_id');

 // This method fetches the time slots of a user from the database.
 useEffect(() => {
  const myobj = {
    user_id: user_id,
    //user_id: "62256a5c8a4c742e6585aa02",
  };
  axios
    .get("http://localhost:5000/time_slots/get", {params: myobj})
    .then((res) => {
      setSlots(slots => [...res.data]);
      //console.log(slots);
      localStorage.setItem("time_slots", JSON.stringify(slots));
    })
    .catch(function (error) {
      console.log(error);
    })
 }, [slots.length]);

 /*useEffect(() => {
   async function getSlots() {
     const myobj = {
      user_id: user_id,
     };
     //console.log(user_id);
    //const response = await fetch(`http://localhost:5000/time_slots`);
    const response = await fetch("http://localhost:5000/time_slots/get", {
      params: myobj
    }).then(() => {
      console.log("get slots");
    });

     //response = response.find(user_id);
     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }

     const slots = await response.json();
     localStorage.setItem("time_slots", JSON.stringify(slots));
     setSlots(slots);
   }
 
   getSlots();
 
   return;
 }, [slots.length]);*/

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
 // This method will delete a slot (to be called in displayCard.js)
 async function deleteSlot(id) {
   await fetch(`http://localhost:5000/time_slots/delete/${id}`, {
     method: "DELETE"
   });
   
   const newSlots = slots.filter((el) => el._id !== id);
    setSlots(newSlots);
    
    // remove the slot in localStorage
    const deletedSlot = await fetch(`http://localhost:5000/time_slots/${id}`);
    localStorage.removeItem("time_slots", JSON.stringify(deletedSlot));
    console.log("one slot deleted");
    //window.location.reload(false);
 }
 
 // This method will map out the slots on the page
 function slotsPage() { 
      return slots.map((slot, index) => {
        return (
          <Grid item xs={0} sm={0} md={0} key={index}>
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
            <ResponsiveAppBar user_id={user_id} />
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


