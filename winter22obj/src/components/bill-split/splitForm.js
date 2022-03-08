import * as React from 'react';
import { DataGrid} from '@mui/x-data-grid';
import { useParams, useNavigate } from "react-router";
import { TextField, Button } from '@mui/material';
import axios from 'axios';
import PaypButton from './paypalButton'
const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
  {
    field: 'shared',
    headerName: 'Shared',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'action',
    headerName: 'Action',
    sortable: false,
    renderCell: (params) => {
      const onClick = (e) => {
        
      };

      //return <PaypButton/>;
    },
  },
];

const val = 50

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 , shared:val},
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42, shared:val },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45, shared:val },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16, shared:val },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null, shared:val },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150, shared:val},
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44, shared:val },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36, shared:val },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65, shared:val },
];

export default function SplitForm() {
    const checkOnClick = () => {
        
    }
    const handleChange = () => {
    
    }
    const [val, setValue] = React.useState("")
  return (
    <div style={{ height: 400, width: '100%' }}>
    <input type="text" onChange={handleChange} value={val}></input>
      <button onClick={checkOnClick}>input the cost</button>

      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}
