import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Popup from './eventCard';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackdropUnstyled from '@mui/base/BackdropUnstyled';
import { GrFormEdit } from 'react-icons/gr';
import Histogram from 'react-chart-histogram';
import { GrFormView } from 'react-icons/gr';
import { useNavigate as useHistory } from 'react-router-dom';
import "./card.css"
import "./selfCard.css"
import axios from 'axios';

export default function SelfCard(props) {
  const navigate = useNavigate();
  let history = useHistory();
  const item = props.it;
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const handleClick = () => {
    setIsOpen2(!isOpen2);
  }

  const Edit = () => {
    navigate(
        '/EditEventForm',
          {state: item._id}
     );
  };

  return <div>
    <button className='eventCardButton' onClick={togglePopup}><Card style={{display: 'inline-block'}}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {item.date}
            </Typography>
            <Typography variant="h5" component="div">
            {item.event_name}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {item.address}
            </Typography>
            <Typography variant="body2">
               {item.description}
            </Typography>
            <button
              className='eventCardEditButton'
              onClick={Edit}
            >
              Edit
              <GrFormEdit/>
            </button>
          </CardContent>
    </Card></button>
    {isOpen && 
      <Popup
        content={<>
          <p>Event_Name: {item.event_name}</p>
          <p>Planned Start Time: {item.planned_start_time}</p>
          <p>Planned End Time: {item.planned_end_time}</p>
          <p>Address: {item.address}</p>
          <p>Creator: {item.creator_name}</p>
          {/* <p>Participants: {item.event_name}</p>
          <p>Has Passed: {item.status}</p> */}
          <p>Description: {item.description}</p>
          <button className="timeSlotButton" onClick={handleClick}>Potential Time Slots</button>
          <GrFormView />
        </>}
        handleClose={togglePopup}
      />
    }
    {isOpen2 && 
      <Popup
        content={<>
          <div>
            <Histogram
              xLabels={['2016', '2017', '2018']}
              yValues={[324, 45, 672]}
              width='410'
              height='450'
              options={{ fillColor: '#FFFFFF', strokeColor: '#0000FF' }}
            />
          </div>
        </>}
        handleClose={handleClick}
      />
    }
  </div>
}
