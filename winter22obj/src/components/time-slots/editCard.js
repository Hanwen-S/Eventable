import * as React from 'react';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import axios from 'axios';

export default function EditCard(props) {
  const form = props.form;
   const [slot, setSlot] = useState({
      id: form.id,
      year: form.year,
      month: form.month,
      day: form.day,
      start_hr: form.start_hr,
      start_min_index: form.start_min_index,
      end_hr: form.end_hr,
      end_min_index: form.end_min_index,
      coefficient: form.coefficient,

      start_index: form.start_index,
      end_index: form.end_index,
    })
   // const params = useParams();
   // const navigate = useNavigate();


      // These methods will update the state properties.
    function updateSlot(value) {
        return setSlot((prev) => {
            return { ...prev, ...value };
        });
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const month_day = [[1, 31], [2, 28], [3, 31], [4, 30], [5, 31], [6, 30], [7, 31], [8, 31], [9, 30], [10, 31], [11, 30], [12, 31]];
        if (slot.year.length != 4 || isNaN(slot.year)){
          window.alert("not right year format !")
          return;
        }
        if (slot.month.length > 2 || isNaN(slot.month) || (parseInt(slot.month) < 0 || parseInt(slot.month) > 12)){
         window.alert("not right month format !")
         return;
        }
        if (slot.day.length > 2 || isNaN(slot.day) || (parseInt(slot.day) < 0 || parseInt(slot.day) > month_day[parseInt(slot.month) - 1][1])){
         
         window.alert("not compatible day !")
         return;
        }
        if (slot.start_hr > 24 || slot.start_hr < 0 || slot.end_hr > 24 || slot.end_hr < 0 || isNaN(slot.end_hr) || isNaN(slot.start_hr)){
         window.alert("please use correct hours !")
         return;
        }
        if ((slot.start_hr === slot.end_hr) && (slot.start_min_index >= slot.end_min_index)){
         window.alert("please use correct period !")
         return;
        }
        if (slot.coefficient != 0.5 && slot.coefficient != 1){
         console.log(slot.coefficient)
         window.alert("not supported coefficient !")
         return;
        }
        if (((slot.end_hr*60 + slot.end_min_index*30 - slot.start_hr*60 + slot.start_min_index*30) % 60 != 0) && (slot.coefficient == 0.5)){
         window.alert("not supported coefficient for half-hour-unit!")
         return;
        }
        const editedTimeSlot = {
          year: slot.year,
          month: slot.month,
          day: slot.day,
          start_index: slot.start_hr*2+slot.start_min_index,
          end_index: slot.end_hr*2+slot.end_min_index,
          coefficient: slot.coefficient,
        };
      
        // This will send a post request to update the data in the database.
        await fetch(`http://localhost:5000/time_slots/update/${form.id}`, {
          method: "POST",
          body: JSON.stringify(editedTimeSlot),
          headers: {
            'Content-Type': 'application/json'
          },
        }).then(() => {
          //console.log(editedTimeSlot);
          //console.log(form.id + " updated!");
          // update the new slot in localStorage
          localStorage.setItem("time_slots", JSON.stringify(editedTimeSlot));
        });
        //navigate("/slothome");
        console.log("success");
        window.location.reload(false);
      }

      return (
        <Card style={{display: 'inline-block', height: '30vw', width: '15.5vw'}}>
        <CardContent>
          <TextField
              size="small"
              InputLabelProps={{ shrink: true }}
              id="filled-basic" 
              label="Year"
              value={slot.year}
              onChange={(e) => updateSlot({ year: e.target.value })}
              required
              variant="outlined"
          />
          <TextField
              size="small"
              InputLabelProps={{ shrink: true }}
              label="Month"
              value={slot.month}
              onChange={(e) => updateSlot({ month: e.target.value })}
              required
              variant="outlined"
          />
          <TextField
              size="small"
              InputLabelProps={{ shrink: true }}
              label="Day"
              value={slot.day}
              onChange={(e) => updateSlot({ day: e.target.value })}
              required
              variant="outlined"
          />
          <TextField
              size="small"
              fullWidth
              InputLabelProps={{ shrink: true }}
              label="Start Hour"
              onChange={(e) => updateSlot({ start_hr: e.target.value })}
              value={slot.start_hr}
              required
              variant="outlined"
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
                Start Minutes
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={slot.start_min_index}
              label="Start Minutes"
              onChange={(e) => updateSlot({ start_min_index: e.target.value })}
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
              onChange={(e) => updateSlot({ end_hr: e.target.value })}
              value={slot.end_hr}
              required
              variant="outlined"
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
                End Minutes
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={slot.end_min_index}
              label="End Minutes"
              onChange={(e) => updateSlot({ end_min_index: e.target.value })}
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
              value={slot.coefficient}
              onChange={(e) => updateSlot({ coefficient: e.target.value })}
              required
              variant="outlined"
          />
        </CardContent>
        <CardActions>
            <Button style={{float: 'right'}}
                className='formbutton' variant="contained"
                onClick={onSubmit}
            >
              Submit
            </Button>
        </CardActions>
        </Card>
     );
 
}


