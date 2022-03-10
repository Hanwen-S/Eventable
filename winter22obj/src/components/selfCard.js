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
  const signal = props.signal;
  const signal2 = props.signal2;
  const navigate = useNavigate();
  let history = useHistory();
  const item = props.it;
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  let array = [];
  for (var i = 0; i < 48; i++) {
    array[i] = 0;
  }

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const handleClick = () => {
    setIsOpen2(!isOpen2);
    for (var i = 0; i < item.participants_id.length; i++) {
      const myobj = {
        user_id: item.participants_id[i],
      };
      axios
      .get("http://localhost:5000/time_slots/get", {
        params: myobj
      })
      .then((res) => {
        console.log(i);
        for (var j = 0; j < res.data.length; j++) {
          if (res.data[j].year == item.date.substring(0, 4) && res.data[j].month == item.date.substring(5, 7) && res.data[j].day == item.date.substring(8, 10)) {
            var start_index = res.data[j].start_index;
            var end_index = res.data[j].end_index;
            for (var k = start_index; k <= end_index; k++) {
              array[k]++;
            }
          }
        }
      })
    }
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
    {isOpen2 &&
      <Popup
        content={<>
          <div>
            <Histogram
              xLabels={['0:00', '0:30', '1:00', '1:30', '2:00', '2:30', '3:00', '3:30', '4:00', '4:30', '5:00', '5:30', '6:00', '6:30', '7:00', '7:30', '8:00', '8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30']}
              yValues={[array[0], array[1], array[2], array[3], array[4], array[5], array[6], array[7], array[8], array[9], array[10], array[11], array[12], array[13], array[14], array[15], array[16], array[17], array[18], array[19], array[20], array[21], array[22], array[23], array[24], array[25], array[26], array[27], array[28], array[29], array[30], array[31], array[32], array[33], array[34], array[35], array[36], array[37], array[38], array[39], array[40], array[41], array[42], array[43], array[44], array[45], array[46], array[47]]}
              width='2000'
              height='450'
              options={{ fillColor: '#FFFFFF', strokeColor: '#000000' }}
            />
          </div>
        </>}
        handleClose={handleClick}
      />
    }
  </div>
}
