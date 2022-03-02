import * as React from 'react';
import Card from '@mui/material/Card';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import DisplayCard from "./displayCard"
import EditCard from "./editCard"

export default function SlotCard() {
    const [isDisplay, setIsDisplay] = React.useState(true);
    // edit card
    const handleEdit = () => {
        setIsDisplay(false);
    }
    return (
        <div>
            {isDisplay ? <DisplayCard handleEdit={handleEdit} /> : <EditCard />}

        </div>
  );
}