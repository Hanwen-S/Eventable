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

export default function DisplayCard({form, handleEdit, deleteSlot}) {
  //const form = props.form;
  
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