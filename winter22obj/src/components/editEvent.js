import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import SelectVariants from './selector';
import { TextField } from '@mui/material';
import { useLocation } from 'react-router';
import axios from 'axios';

/*
const [values, setValues] = useState({
    first_name: localStorage.getItem('user_first_name'),
    last_name: localStorage.getItem('user_last_name'),
    email: localStorage.getItem('user_email'),
    phone: localStorage.getItem('user_phone'),
  }); 
*/
export default function EditEvent(){
    const {state} = useLocation();
    const [id, setId] = React.useState(0);
    console.log(state);

    return (
        <React.Fragment>
           <Grid container spacing={3} >
                <Grid item xs={12} sm={6} sx={{mb: 3, mt:5}}>
                    <Typography>
                        EventName
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} sx={{mb: 3, mt:5, ml: -8}}>
                    {id === 0 ? (
                    <Typography style={{textAlign: "center"}}>
                        Status
                    </Typography>
                    ) : (
                    <SelectVariants/>
                    )}
                </Grid>
                <Grid item xs={12} sm={4} sx={{mb: 3, mt:3}}>
                    <Typography>
                        Year
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={4} sx={{mb: 3, mt:3}}>
                    <Typography>
                        Month
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={4} sx={{mb: 3, mt:3}}>
                    <Typography>
                        Date
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={4} sx={{mb: 3, mt:3}}>
                    <Typography>
                        Planned Time:
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={4} sx={{mb: 3, mt:3}}>
                    <Typography>
                        Hour
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={4} sx={{mb: 3, mt:3}}>
                    <Typography>
                        Minutes
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={12} sx={{mb: 3, mt:3}}>
                    <Typography>
                        Address
                    </Typography>
                </Grid>
                <Grid item xs={12} sm = {4} sx={{mt:2.5}}>
                    <Typography style={{mb: 0}}>
                        Alternative Time:
                    </Typography>
                </Grid>
                <Grid item xs={12} sm = {8}>
                    <TextField
                        required
                        id="Hour_Min_Freq"
                        name="Hour_Min_Freq"
                        label="Hour_Min_Freq"
                        fullWidth
                        autoComplete="shipping address-line1"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} sm = {4} sx={{mt:2.5}}>
                    <Typography style={{mb: 0}}>
                        Participators:
                    </Typography>
                </Grid>
                <Grid item xs={12} sm = {8}>
                    <TextField
                        required
                        id="Participator"
                        name="Participator"
                        label="Participator"
                        fullWidth
                        autoComplete="shipping address-line1"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} sm={12} sx={{mb: 4, mt:4}}>
                    <Typography>
                        Comments
                    </Typography>
                </Grid>
           </Grid>
        </React.Fragment>

    );
}
