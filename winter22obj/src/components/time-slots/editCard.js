import * as React from 'react';
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
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

export default function EditCard() {
    const [form, setForm] = useState({
      year: "",
      month: "",
      day: "",
      start_hr: 0, // 0-23
      start_min_index: 0, // 0 or 1
      end_hr: 0,
      end_min_index: 0,
      coefficient: 0.0,
    })
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
          //const id = "62159522d10ff4f104ed78e1";
          //const response = await fetch(`http://localhost:5000/time_slots/${id}`);
          console.log(params.id);
          const id = params.id.toString();
          const response = await fetch(`http://localhost:5000/time_slots/${params.id.toString()}`);
          if (!response.ok) {
            const message = `An error has occurred: ${response.statusText}`;
            window.alert(message);
            return;
          }
          
          const time_slot = await response.json();
          if (!time_slot) {
            window.alert(`Time slot with id ${id} not found`);
            navigate("/");
            return;
          }
          setForm(time_slot);
        }
        fetchData();
        return;
      }, [params.id, navigate]);

      // These methods will update the state properties.
    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    async function onSubmit(e) {
        e.preventDefault();
        const editedTimeSlot = {
          year: form.year,
          month: form.month,
          day: form.day,
          start_index: form.start_hr*2+form.start_min_index,
          end_index: form.end_hr*2+form.end_min_index,
          coefficient: form.coefficient,
        };
      
        // This will send a post request to update the data in the database.
        await fetch(`http://localhost:5000/time_slots/update/${params.id}`, {
          method: "POST",
          body: JSON.stringify(editedTimeSlot),
          headers: {
            'Content-Type': 'application/json'
          },
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
              value={form.year}
              onChange={(e) => updateForm({ year: e.target.year })}
              required
              variant="outlined"
          />
          <TextField
              size="small"
              InputLabelProps={{ shrink: true }}
              label="Month"
              value={form.month}
              onChange={(e) => updateForm({ month: e.target.month })}
              required
              variant="outlined"
          />
          <TextField
              size="small"
              InputLabelProps={{ shrink: true }}
              label="Day"
              value={form.day}
              onChange={(e) => updateForm({ day: e.target.day })}
              required
              variant="outlined"
          />
          <TextField
              size="small"
              fullWidth
              InputLabelProps={{ shrink: true }}
              label="Start Hour"
              onChange={(e) => updateForm({ start_hr: e.target.start_hr })}
              value={form.start_hr}
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
              value={form.start_min_index}
              label="Start Minutes"
              onChange={(e) => updateForm({ start_min_index: e.target.start_min_index })}
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
              onChange={(e) => updateForm({ end_hr: e.target.end_hr })}
              value={form.end_hr}
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
              value={form.end_min_index}
              label="End Minutes"
              onChange={(e) => updateForm({ end_min_index: e.target.end_min_index })}
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
              onChange={(e) => updateForm({ coefficient: e.target.coefficient })}
              required
              variant="outlined"
          />
        </CardContent>
        <CardActions>
            <Button size="small"
                className='formbutton' variant="contained"
                onSubmit={onSubmit}
            >
              Submit
            </Button>
        </CardActions>
        </Card>
     );
 
}
