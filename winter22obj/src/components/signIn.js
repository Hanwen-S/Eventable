import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
// import {useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();
  const redirect = (info) => {
    navigate(
      '/home',
       {
         state :{
          user_id : info._id,
          user_first_name: info.person_first_name,
          user_last_name: info.person_last_name,
          user_username: info.person_username,
          user_email: info.person_email,
          user_phone: info.person_phone,
          user_password: info.person_password,
          user_event_array: info.person_event_array,
         }
       }
   );
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const myobj = {
      person_email: data.get('person_email'),
      person_password: data.get('person_password'),
      person_first_name: data.get('person_first_name'),
      person_last_name: data.get('person_last_name'),
      person_username: data.get('person_username'),
      person_phone: data.get('person_phone'),
    }
    axios
      .get("http://localhost:5000/records/get", {
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        params: myobj
      })
      .then((res) => {
        if (res.data.length === 0){
          alert('Incorrect Email or Password');
        }
        else{
          var info = res.data[0];
          console.log(info);
          localStorage.setItem('user_id',info._id);
          localStorage.setItem('user_first_name', info.person_first_name);
          localStorage.setItem('user_last_name', info.person_last_name);
          localStorage.setItem('user_username', info.person_username);
          localStorage.setItem('user_email', info.person_email);
          localStorage.setItem('user_phone', info.person_phone);
          localStorage.setItem('user_password', info.person_password);
          localStorage.setItem('user_event_array', info.person_event_array);
          localStorage.setItem('user_created_event_array', info.person_created_event_array);
          localStorage.setItem('user_created_event_id_array', info.person_created_event_id_array);
          localStorage.setItem('user_joined_event_array', info.person_joined_event_array);
          localStorage.setItem('user_joined_event_id_array', info.person_joined_event_id_array);
          console.log(localStorage.getItem('user'));
          redirect(res.data[0]);
        }

      });
    // eslint-disable-next-line no-console
    console.log({
      email: data.get('person_email'),
      password: data.get('person_password'),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="person_email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="person_password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
