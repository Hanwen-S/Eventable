import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectVariants() {
  const [status, setStatus] = React.useState('');

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  return (
    <div>
      <FormControl variant="standard" sx={{ mt: -2.5, mb: 0, minWidth: 120, ml: 8 }}>
        <InputLabel id="demo-simple-select-standard-label">Status</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={status}
          onChange={handleChange}
          label="Status"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Comming</MenuItem>
          <MenuItem value={20}>Doing</MenuItem>
          <MenuItem value={30}>Fulfilled</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
