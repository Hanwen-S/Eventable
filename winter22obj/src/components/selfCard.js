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
import { TiUserAddOutline } from 'react-icons/ti';
import "./card.css"
import "./selfCard.css"
import axios from 'axios';

export default function SelfCard(props) {
  const time_slots = props.time_slots;
  const real_time = time_slots.map((item) => 
    [item.start_index - item.coefficient*(item.end_index - item.start_index)/2, item.end_index + item.coefficient*(item.end_index - item.start_index)/2], 
  )
  console.log(real_time)
  const signal = props.signal;
  const signal2 = props.signal2;
  const navigate = useNavigate();
  let history = useHistory();
  const item = props.it;
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState([false, []]);
  const [array, setArray] = useState([]);
  let time_periods = Array(96).fill(0)
  time_periods = time_periods.map((item, index) => (
    String(Math.floor(index / 4)).padStart(2, '0') + ":" + String((index % 4)*15)
  ))
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  let temp = Array(96).fill(0);
  console.log(temp)
  for (const inter of real_time){
      for (var k = inter[0]*2; k <= inter[1]*2; k++) {
          temp[k]++;
      }
      console.log(temp)
  }
  const handleClick = () => {
    setIsOpen2(isOpen2 => [!isOpen2[0], temp]);
  }

  const Edit = () => {
    navigate(
        '/EditEventForm',
          {state: item._id}
     );
  };
  

  const Add = () => {
    const person_id = localStorage.getItem('user_id');
    const person_name = localStorage.getItem('user_first_name') + " " + localStorage.getItem('user_last_name');
    const person_event_array = localStorage.getItem('user_joined_event_array').split(',');
    const person_event_id_array = localStorage.getItem('user_joined_event_id_array').split(',');
    const myobj = {
      person_name: person_name,
      person_id: person_id,
      names: item.participants_name,
      ids: item.participants_id,
    };
    axios
      .post(
        "http://localhost:5000/addperson/" + item._id,
        myobj)
      .then((res)=>{
        person_event_array.push(item.event_name);
        person_event_id_array.push(item._id);
        const myobj2 = {
          person_joined_event_array: person_event_array,
          person_joined_event_id_array: person_event_id_array,
        }
        localStorage.setItem('user_joined_event_array', [...person_event_array]);
        localStorage.setItem('user_joined_event_id_array', [...person_event_id_array]);
        axios
        .post("http://localhost:5000/update3/" + person_id, myobj2)
        .then(() => history(
          '../home',
       ));
      })
      console.log(array);
  };


  return <div>
    <button className='eventCardButton' onClick={togglePopup} style={{ width: '80%'}}>
      <Card style={{display: 'inline-block', width: '100%'}}>
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
            {signal === true ? <button
              className='eventCardEditButton'
              onClick={Edit}
            >
              Edit
              <GrFormEdit/>
            </button> : <button
              className='eventCardEditButton'
            >
            </button>}

            {signal2 === true ? <button
              className='eventCardEditButton'
              onClick={Add}
            >
              Add
              <TiUserAddOutline />
            </button> : <button
              className='eventCardEditButton'
            >
            </button>}
          </CardContent>
    </Card>
    </button>
    {isOpen &&
      <Popup
        content={<>
          <p>Event_Name: {item.event_name}</p>
          <p>Planned Start Time: {item.planned_start_time}</p>
          <p>Planned End Time: {item.planned_end_time}</p>
          <p>Address: {item.address}</p>
          <p>Creator: {item.creator_name}</p>
          <p>Participants: {item.participants_name}</p>
          {/*<p>Has Passed: {item.status}</p> */}
          <p>Description: {item.description}</p>
          <button className="timeSlotButton" onClick={handleClick}>Potential Time Slots <GrFormView /> </button>
        </>}
        handleClose={togglePopup}
      />
    }
    {isOpen2[0] &&
      <Popup
        content={<>
          <div>
            <Histogram
              xLabels={time_periods}
              yValues={isOpen2[1]}
              width='2000'
              height='450'
              options={{ fillColor: '#000000', strokeColor: '#000000' }}
            />
          </div>
        </>}
        handleClose={handleClick}
      />
    }
  </div>
}

