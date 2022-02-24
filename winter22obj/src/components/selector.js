import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectVariants(props) {
  const [status, setStatus] = React.useState('');
  const name = props.name == null ? "" : props.name;
  const data = props.data == null ? [] : props.data;
  const ml = props.ml;
  const minWidth = props.minWidth
  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  return (
    <div>
      <FormControl variant="standard" sx={{ mt: 0, mb: 0, minWidth: {minWidth}, ml: {ml} }}>
        <InputLabel id="demo-simple-select-standard-label">{name}</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={status}
          onChange={handleChange}
          label={name}
        >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
          {data?.map((item) => (
              <MenuItem value = {item}>
                {item}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </div>
  );
}
