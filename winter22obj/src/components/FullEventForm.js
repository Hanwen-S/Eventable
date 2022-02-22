import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import SelectVariants from './selector';
export default function FullEventForm(){
    const [id, setId] = React.useState(0);

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
                <Grid item xs={12} sm={12} sx={{mb: 3, mt:3}}>
                    <Typography>
                        Planned Time
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={12} sx={{mb: 3, mt:3}}>
                    <Typography>
                        Place
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={12} sx={{mb: 3, mt:3}}>
                    <Typography>
                        Alternative Times
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={12} sx={{mb: 4, mt:4}}>
                    <Typography>
                        Participators:
                    </Typography>
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
