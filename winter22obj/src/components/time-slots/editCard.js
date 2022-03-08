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
  const [slot, setSlot] = useState({}) // to make it uncontrolled component
   /* const [slot, setSlot] = useState({
      id: form.id,
      year: form.year,
      month: form.month,
      day: form.day,
      start_hr: parseInt(form.start_index/2), // 0-23
      start_min_index: (form.start_index%2)*30 === 0 ? "00" : "30", // 0 or 1
      end_hr: parseInt(form.end_index/2),
      end_min_index: (form.end_index%2)*30 === 0 ? "00" : "30",
      coefficient: form.coefficient,
    })
    const params = useParams(); */
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
        });
        navigate("/slothome");
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
              onChange={(e) => updateSlot({ year: e.target.year })}
              required
              variant="outlined"
          />
          <TextField
              size="small"
              InputLabelProps={{ shrink: true }}
              label="Month"
              value={slot.month}
              onChange={(e) => updateSlot({ month: e.target.month })}
              required
              variant="outlined"
          />
          <TextField
              size="small"
              InputLabelProps={{ shrink: true }}
              label="Day"
              value={slot.day}
              onChange={(e) => updateSlot({ day: e.target.day })}
              required
              variant="outlined"
          />
          <TextField
              size="small"
              fullWidth
              InputLabelProps={{ shrink: true }}
              label="Start Hour"
              onChange={(e) => updateSlot({ start_hr: e.target.start_hr })}
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
              onChange={(e) => updateSlot({ start_min_index: e.target.start_min_index })}
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
              onChange={(e) => updateSlot({ end_hr: e.target.end_hr })}
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
              onChange={(e) => updateSlot({ end_min_index: e.target.end_min_index })}
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
              onChange={(e) => updateSlot({ coefficient: e.target.coefficient })}
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

