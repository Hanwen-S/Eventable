import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import axios from 'axios';
import { GrWindowsLegacy } from "react-icons/gr";
 
export default function CreateCard(props) {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
 const [form, setForm] = useState({
    year: yyyy,
    month: mm,
    day: dd,
    start_hr: 0, // 0-23
    start_min_index: 0, // 0 (00) or 1 (30)
    end_hr: 0,
    end_min_index: 0,
    coefficient: 0
 });
 const curPage = props.curPage

 const navigate = useNavigate();

 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 // This function will handle the submission.
 const onSubmit = async (e) => {
   e.preventDefault();
   const month_day = [[1, 31], [2, 28], [3, 31], [4, 30], [5, 31], [6, 30], [7, 31], [8, 31], [9, 30], [10, 31], [11, 30], [12, 31]];
   // When a post request is sent to the create url, we'll add a new time slot to the database.
   //const newTimeSlot = { ...form };
   const user_id = localStorage.getItem("user_id");
   if (form.year.length != 4 || isNaN(form.year)){
     window.alert("not right year format !")
     return;
   }
   if (form.month.length != 2 || isNaN(form.month) || (parseInt(form.month) < 0 || parseInt(form.month) > 12)){
    window.alert("not right month format !")
    return;
   }
   if (form.day.length != 2 || isNaN(form.day) || (parseInt(form.day) < 0 || parseInt(form.day) > month_day[parseInt(form.month) - 1][1])){
    
    window.alert(parseInt(form.month))
    return;
   }
   const newTimeSlot = {
     year: form.year,
     month: form.month,
     day: form.day,
     start_index: form.start_hr*2+form.start_min_index,
     end_index: form.end_hr*2+form.end_min_index,
     coefficient: form.coefficient,
     user_id: user_id, // add to the slots owned by this user
   };
 console.log(newTimeSlot);
 // POST request automatically create an id
   await fetch("http://localhost:5000/time_slots/add", {
     method: "POST",
     headers: { "Content-Type": "application/json"},
     body: JSON.stringify(newTimeSlot),
   }).then(() => {
     console.log("new slot added");
     localStorage.setItem("time_slots", JSON.stringify(newTimeSlot));
   })
   .catch(error => {
     window.alert(error);
     return;
   });
  

   setForm({ year: yyyy, month: mm, day: dd, 
            start_hr: 0, start_min_index: 0, 
            end_hr: 0, end_min_index: 0, coefficient: 0.0 });
   navigate(
     "/slothome",
    {state: curPage}
   ); // redirect to the next page
   window.location.reload(false);
 }
 
 // This following section will display the form that takes the input from the user.
 return (
    <Card style={{display: 'inline-block', height: '30vw', width: '15.5vw'}}>
    <CardContent>
      <TextField
          size="small"
          InputLabelProps={{ shrink: true }}
          id="filled-basic" 
          label="Year yyyy"
          value={form.year}
          onChange={(e) => updateForm({ year: e.target.value })}
          required
          variant="outlined"
      />
      <TextField
          size="small"
          InputLabelProps={{ shrink: true }}
          label="Month mm"
          value={form.month}
          onChange={(e) => updateForm({ month: e.target.value })}
          required
          variant="outlined"
      />
      <TextField
          size="small"
          InputLabelProps={{ shrink: true }}
          label="Day dd"
          value={form.day}
          onChange={(e) => updateForm({ day: e.target.value })}
          required
          variant="outlined"
      />
      <TextField
          size="small"
          fullWidth
          InputLabelProps={{ shrink: true }}
          label="Start Hour"
          onChange={(e) => updateForm({ start_hr: e.target.value })}
          value={form.start_hr}
          required
          variant="outlined"
      />
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">
          Start Minutes
        </InputLabel>
        <Select
          value={form.start_min_index}
          label="Start Minutes"
          onChange={(e) => updateForm({ start_min_index: e.target.value })}
        >
          <MenuItem value={0}>00</MenuItem>
          <MenuItem value={1}>30</MenuItem>
        </Select>
      </FormControl>
      <TextField
          size="small"
          fullWidth
          InputLabelProps={{ shrink: true }}
          label="End Hour"
          onChange={(e) => updateForm({ end_hr: e.target.value })}
          value={form.end_hr}
          required
          variant="outlined"
      />
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">
          End Minutes
        </InputLabel>
        <Select
          value={form.end_min_index}
          label="End Minutes"
          onChange={(e) => updateForm({ end_min_index: e.target.value })}
        >
          <MenuItem value={0}>00</MenuItem>
          <MenuItem value={1}>30</MenuItem>
        </Select>
      </FormControl>
      <TextField
          size="small"
          fullWidth
          InputLabelProps={{ shrink: true }}
          label="Coefficient"
          value={form.coefficient}
          onChange={(e) => updateForm({ coefficient: e.target.value })}
          required
          variant="outlined"
      />
    </CardContent>
    <CardActions>
        <Button 
            className='formbutton' variant="contained"
            onClick={onSubmit}
        >
          Create
        </Button>
    </CardActions>
    </Card>
 );
}

