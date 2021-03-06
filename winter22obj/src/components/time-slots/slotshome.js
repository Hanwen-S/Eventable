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
import { useNavigate, useLocation } from "react-router";
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
 const { state } = useLocation();
 const [slots, setSlots] = useState([]);
 const navigate = useNavigate();
 const[pageNum, setPageNum] = useState(state ? state : 1)
 //const params = useParams();
 const user_id = localStorage.getItem('user_id');

 const handleChange = (event, value) => {
  setPageNum(value);
};
 // This method fetches the time slots of a user from the database.
 useEffect(() => {
  const myobj = {
    user_id: user_id,
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

 // sidebar on the left: the card for creating a time slot
const drawerWidth = 240;
const drawer = (
  <div>
    <Toolbar />
    <Divider />
    <div>
      <CreateCard curPage={pageNum}/>
    </div>
  </div>
);
 // This method will delete a slot (to be called in displayCard.js)
 async function deleteSlot(id) {
  //console.log("one slot deleted");
   // remove in backend
   axios.delete(`http://localhost:5000/time_slots/delete/${id}`)
          .then(() => {
            console.log("one slot deleted");
            const newSlots = slots.filter((el) => el._id !== id);
            setSlots(newSlots);
            // remove the slot in localStorage
            localStorage.setItem("time_slots", JSON.stringify(newSlots));
          })
          .then(() => navigate(
            '/slothome',
         ));
        window.location.reload(false);
 }
 
 // This method will map out the slots on the page
 function slotsPage(pageNum) { 
      return slots.map((slot, index) => {
        return (
          (index < 21*(pageNum) && index >= 21*(pageNum-1)) ?
          <Grid item xs={0} sm={0} md={0} key={index}>
            <SlotCard
              slot={slot}
              deleteSlot={() => deleteSlot(slot._id)}
              key={slot._id}
            />
          </Grid>
          : null
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
      <Grid container spacing={{ xs: 0, md: 0 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            <ResponsiveAppBar user_id={user_id} wid={1220}/>
        {slotsPage(pageNum)}
      </Grid>
      <Pagination count={(Math.floor(slots.length / 21) + 1)} variant="outlined" style={{
        position: 'absolute', left: '50%', bottom: '10%',
        transform: 'translate(-50%, -50%)'
        }}
        page={pageNum}
        onChange={handleChange}
      />
    </Box>
    
  </Box>
);

}


