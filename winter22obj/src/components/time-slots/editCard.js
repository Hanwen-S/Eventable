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
    const navigate = useNavigate();


      // These methods will update the state properties.
    function updateSlot(value) {
        return setSlot((prev) => {
            return { ...prev, ...value };
        });
    }

    const onSubmit = async (e) => {
        e.preventDefault();

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
          console.log(editedTimeSlot);
          console.log(form.id + " updated!");
          // update the new slot in localStorage
          localStorage.setItem("time_slots", JSON.stringify(editedTimeSlot));
        });
        navigate("/slothome");
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
            <Button size="small"
                className='formbutton' variant="contained"
                onClick={onSubmit}
            >
              Submit
            </Button>
        </CardActions>
        </Card>
     );
 
}


