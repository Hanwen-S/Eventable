import * as React from 'react';
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Grid } from '@mui/material';
import axios from 'axios';
import EditCard from './editCard';

export default function DisplayCard({handleEdit, form}) {
  const [slot, setSlot] = useState({
    year: "",
    month: "",
    day: "",
    start_hr: 0, // 0-23
    start_min: "00", // 00 or 30
    end_hr: 0, // 0-23
    end_min: "00", // 00 or 30
    coefficient: 0.0, // 0-1
  });
  const params = useParams();
  const navigate = useNavigate();

  // fetch a slot from the database
  useEffect(() => {
    async function getSlot() {
      /*const id = "62159522d10ff4f104ed78e1";
      const response = await fetch(`http://localhost:5000/time_slots/${id}`); */
      if (params.id.length === 24)
        console.log("success!")

      const id = params.id.toString();

      const response = await fetch(`http://localhost:5000/time_slots/${params.id.toString()}`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const time_slot = await response.json();
      if (!time_slot) {
        window.alert(`Time slot with id ${id} not found`);
        navigate("/");
        return;
      }
      
      setSlot({ year: time_slot.year, month: time_slot.month, 
        day: time_slot.day, 
        start_hr: parseInt(time_slot.start_index/2), 
        start_min: (time_slot.start_index%2)*30 === 0 ? "00" : "30",  
        end_hr: parseInt(time_slot.end_index/2), 
        end_min: (time_slot.end_index%2)*30 === 0 ? "00" : "30", 
        coefficient: time_slot.coefficient});
    }
    getSlot();
    return;
  }, [params.id, setSlot, navigate]);
 
    return (
              <Card style={{display: 'inline-block', width: '10.5vw'}}>
              <CardContent>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  {slot.year}-{slot.month}-{slot.day}
                  </Typography>
                  <Typography variant="h6" component="div">
                  {slot.start_hr}:{slot.start_min} - {slot.end_hr}:{slot.end_min}
                  </Typography>
                  <Typography variant="body2">
                  {slot.coefficient}
                  </Typography>
              </CardContent>
              <CardActions>
                  <Button size="small" onClick={handleEdit}>
                    Edit
                  </Button>
                  {/*<Link to={`/slothome/${slot.id}`}>
                    <Button size="small" onClick={handleEdit}>
                      Edit
                    </Button>
                  </Link>*/}
                  <Button size="small"
                  >
                    Delete
                  </Button>
              </CardActions>
              </Card>
    );
  }