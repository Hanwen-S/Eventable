import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Popup from './eventCard';
import { useState } from 'react';
import BackdropUnstyled from '@mui/base/BackdropUnstyled';
import "./card.css"

export default function BasicCard() {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  return <div>
    <button className='eventCardButton' onClick={togglePopup}><Card style={{display: 'inline-block'}}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Time
            </Typography>
            <Typography variant="h5" component="div">
            Event_name
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Address
            </Typography>
            <Typography variant="body2">
              Comment
              <br />
              {'"a benevolent smile"'}
            </Typography>
          </CardContent>
    </Card></button>
    {isOpen && 
      <Popup
        content={<>
          <b>Event_Name:</b>
          <p>Planned Time:</p>
          <p>Address:</p>
          <p>Creator:</p>
          <p>Participants:</p>
          <p>Potential Time:</p>
          <p>Has Passed:</p>
          <p>Comments:</p>
        </>}
        handleClose={togglePopup}
      />
    }
  </div>
}
