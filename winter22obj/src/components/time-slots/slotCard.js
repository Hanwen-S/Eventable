import * as React from 'react';
import { Navigate } from 'react-router';
import DisplayCard from "./displayCard"
import EditCard from "./editCard"

export default function SlotCard() {
    const [isDisplay, setIsDisplay] = React.useState(true);
    // edit card
    const handleEdit = () => {
        setIsDisplay(false);
        Navigate("/slothome/${time_slot.id}");
    }
    return (
        <div>
            {isDisplay ? <DisplayCard handleEdit={handleEdit} /> : <EditCard />}

        </div>
  );
}