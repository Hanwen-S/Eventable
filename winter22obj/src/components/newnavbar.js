import * as React from 'react';
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
// import {useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { Router } from 'react-router-dom';
import axios from 'axios';
const pages = [['Home', '/home'], ['Timeslots', '/slothome'], ['Create', '/CreateEventForm']];
const settings = [['Profile', ''], 'Account', 'Dashboard', 'Logout'];



const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '15ch',
      '&:focus': {
        width: '22ch',
      },
    },
  },
}));


const ResponsiveAppBar = (props) => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const user_id = props.user_id;
  console.log(user_id)
  const routeChange = (path) => {
    navigate(
      path
      
    )};
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const open = Boolean(anchorElUser);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenProfile = () =>{
    let path = `/account`;
    navigate(path);
  }

  const handleOpenMyEvent = () =>{
    let path = `/myEvent`;
    navigate(path);
  }

  const handleLogOut = () =>{
    let path = `/`;
    navigate(path);
  }
/*
  const handleSearch=async()=>{
    const id=search.toString();
    console.log(id);
    const response = await fetch(`http://localhost:5000/record/${search.toString()}`);
    console.log(response);
    if (!response.ok) {
      const message = `An error has occured: ${response.statusText}`;
      window.alert(message);
      return;
    }

    const record = await response.json();
    if (!record) {
      window.alert(`Record with id ${search} not found`);
      navigate("/");
      return;
    }
  };
*/

const handleOnKeyPress=async(e)=>{
  if (e.key === 'Enter') {
    let found = false;
    if (search.trim() == ""){
      window.alert("Search string can't be empty");
      return;
    }
    const userResponse = await fetch(`http://localhost:5000/records/${search.trim().toString()}`)
    .then(function(userResponse){                      // first then()
      if(userResponse.ok)
      {
        return userResponse.json();         
      }

      throw new Error('Something went wrong.');
    })
    .then(user => {
      console.log('Success:', user);
      if (user){
        found = true;
        window.alert("User found:\n  User name: "+user.person_username+"\n  User email: "+user.person_email);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
    
    const eventResponse = await fetch(`http://localhost:5000/events/${search.trim().toString()}`)
    .then(function(eventResponse){                      // first then()
      if(eventResponse.ok)
      {
        return eventResponse.json();         
      }

      throw new Error('Something went wrong.');
    })
    .then(event => {
      console.log('Success:', event);
      if (event && !found){      
        window.alert("Event found:\n  Event name: "+event.event_name);
        found = true;
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  
 
  if (!found) {
    window.alert(`User or event with id "${search.trim()}" not found`);
    return;
  }
  
  }};



  return (
    <AppBar position="static" style={{width: 1450}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            Eventable
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >

            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            Eventable
          </Typography>
          <Box sx={{ flexGrow: 5, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page[0]}
                onClick={() => routeChange(page[1])}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page[0]}
              </Button>
            ))}
          </Box>

          <Tooltip title= "Enter user or event ID" placement="bottom-start">
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              onKeyDown={(e)=>handleOnKeyPress(e)}
              placeholder="Search..."
              inputProps={{ 'aria-label': 'search' }}
              //value={search}
              onChange={(e) => setSearch(e.target.value)}

            />
          </Search>
          </Tooltip>

          <Box sx={{ flexGrow: 0.5 }} />

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>

            <Menu
              id="basic-menu"
              anchorEl={anchorElUser}
              open={open}
              onClose={handleCloseUserMenu}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={handleOpenProfile}>Profile</MenuItem>
              <MenuItem onClick={handleOpenMyEvent}>My Events</MenuItem>
              <MenuItem onClick={handleLogOut}>Logout</MenuItem>
            </Menu>

          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
