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

<<<<<<< HEAD
export default function DisplayCard(props) {
  const handleEdit = props.handleEdit
  const user_id = props.user_id
  console.log(user_id)
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

      const id = user_id;

      const response = await fetch(`http://localhost:5000/time_slots/${id}`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const time_slot = await response.json();
      console.log(time_slot)
      if (!time_slot) {
        window.alert(`Time slot with id ${id} not found`);
        navigate("/home", {user_id: user_id});
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
 
=======
export default function DisplayCard({form, handleEdit, deleteSlot}) {
  //const form = props.form;
  
>>>>>>> 1be5379 (fetch data from backend and display in slothome. Merge slotCard.js into slothome.js.)
    return (
              <Card style={{display: 'inline-block', width: '10.5vw'}}>
              <CardContent>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  {form.year}-{form.month}-{form.day}
                  </Typography>
                  <Typography variant="h6" component="div">
                  {form.start_hr}:{form.start_min} - {form.end_hr}:{form.end_min}
                  </Typography>
                  <Typography variant="body2">
                  {form.coefficient}
                  </Typography>
              </CardContent>
              <CardActions>
                  <Button size="small" onClick={()=> handleEdit()}>
                    Edit
                  </Button>
                  {/*<Link to={`/slothome/${slot.id}`}>
                    <Button size="small" onClick={handleEdit}>
                      Edit
                    </Button>
                  </Link>*/}
                  <Button size="small"
                  onClick={() => deleteSlot(form.id)}>
                    Delete
                  </Button>
              </CardActions>
              </Card>
    );
  }