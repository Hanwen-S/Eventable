import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    Typography
  } from '@mui/material';
import axios from 'axios';

  const searched_id = localStorage.getItem('searched_id');

  const user = {
    name: " ",
    email: " ",
    id: " ",
  };

  axios
    .get("http://localhost:5000/records/" + searched_id)
    .then((res) =>{
        user.name = res.data.person_username;
        user.email = res.data.person_email;
        user.id = searched_id;
    });

  console.log(user);

  export const SearchedProfile = (props) => (
    <Card {...props}>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Avatar
            src={user.avatar}
            sx={{
              height: 64,
              mb: 2,
              width: 64
            }}
          />
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h5"
          >
            {user.name}
          </Typography>

          <Typography
            color="textSecondary"
            variant="body2"
          >
            {user.id}
          </Typography>
        </Box>
      </CardContent>
      <Divider />


    </Card>
  );
