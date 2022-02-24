import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import SelectVariants from './selector';


export default function AddressForm() {
    const name = "Status";
    const data = ["Comming", "Doing", "Fulfilled"];
    const name2 = "Hour_Min_Fre";
    const data2 = ["2022-1-2", "Doing", "Fulfilled"];
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="eventName"
            name="eventName"
            label="Event Name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SelectVariants name = {name} data = {data} ml = {8} minWidth = {120}/>
        </Grid>
        <Grid item xs={12} sm = {4} >
          <TextField
            required
            id="Year"
            name="Year"
            label="Year"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
          />
          </Grid>
          <Grid item xs={12} sm = {4} >
          <TextField
            required
            id="Month"
            name="Month"
            label="Month"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
          />
          </Grid>
          <Grid item xs={12} sm = {4} >
          <TextField
            required
            id="Date"
            name="Date"
            label="Date"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm = {4} sx={{mt:2.5}}>
          <Typography style={{mb: 0}}>
            Planned Time:
          </Typography>
        </Grid>
        <Grid item xs={12} sm = {4}>
        <TextField
            required
            id="Hour"
            name="Hour"
            label="Hour"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm = {4}>
        <TextField
            required
            id="Minute"
            name="Minute"
            label="Minute"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
          /> 
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="Address"
            name="Address"
            label="Address"
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm = {4} sx={{mt:2.5}}>
          <Typography style={{mb: 0}}>
            Alternative Time:
          </Typography>
        </Grid>
        <Grid item xs={12} sm = {8}>
        <SelectVariants name = {name2} data = {data2} ml = {0} minWidth = {240}/>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="Participators"
            name="Participators"
            label="Participators"
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
          />
        </Grid>
        
        <Grid item xs={12} sm={12}>
          <TextField
            required
            id="Comment"
            name="Comment"
            label="Comment"
            multiline
            fullWidth
            autoComplete="shipping country"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Use this address for payment details"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}