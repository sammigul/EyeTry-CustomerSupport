import * as React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { styled, } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MailIcon from '@mui/icons-material/Mail';

import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import { FaSortDown } from "react-icons/fa";
import { FaGlasses } from "react-icons/fa";
import { FaSortUp } from 'react-icons/fa';


import profilePic from '../../../assets/images/CustomerSupport/profilepic.png'
import API_URL from '../../../config/config';

import { viewAgentProfile } from '../../../services/Agent/agent';
import { viewAgentPhoto } from '../../../services/Agent/agent';
import { logoutAgent } from '../../../services/Auth/authentication';
import { clearLocalStorage } from '../../../utils/LocalStorage';


const pages = ['Support Tickets', 'Chats', 'Settings'];
const settings = ['Profile', 'Logout'];


const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    // inside nav n side bars - main screen
    padding: theme.spacing(0),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function Navbar() {


  const navigate = useNavigate();
  const [toggleSortIcon, SetToggleSortIcon] = React.useState(false)

  const [profileImage, setProfileImage] = React.useState(null)
  const [name, setName] = React.useState('')

  const getProfile = async () => {
    try {
      const res = await viewAgentProfile();
      if (res.status === 200) {
        setName(res.data.firstName + " " + res.data.lastName)
      }
    }
    catch (e) {
      console.log(e)
    }
  }

const getImage = async () => {
    try {
      const res = await viewAgentPhoto();
      console.log(res)
      if (res.status === 200) {
        setProfileImage(API_URL + res.data.location)
      }
    }
    catch (e) {
      if (e.response.status == 400) {
        setProfileImage(null)
        console.log(e)
      }
    }
  }

  React.useEffect(() => {
    getProfile();
    getImage();
  }, [])



  // for navbar
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
    SetToggleSortIcon(true)
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  // Collapsed Navbar
  const handleCloseNavMenu = (page) => {
    SetToggleSortIcon(false)
    if (page == "Settings") {
      navigate("/view_personal_info")
    }
    else if (page == "Support Tickets") {
      navigate("/")
    }
    else if (page == "Chats")
    {
      navigate("/chat")
    }
    setAnchorElNav(null);

  };


  const handeDropDownMenu = (page) => {

    SetToggleSortIcon(false)
    if (page == "Settings") {
      navigate("/view_personal_info")
    }
    else if (page == "Support Tickets") {
      navigate("/")
    }
    else if(page == "Chats")
    {
      navigate("/chat")
    }
    else{
      
    }
    setAnchorElNav(null);

  };




  const logout = async () => {
    try {
      const res = await logoutAgent();
      clearLocalStorage()
      navigate("/login")
    }
    catch (e) {
      console.log("Error while logging out")
    }



  }
  const handleCloseUserMenu = (setting) => {
    if (setting == "Logout") {
      logout();
    }
    else if(setting == "Profile"){
      navigate("/view_personal_info")
    }
    setAnchorElUser(null);

  };




  return (

    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" style={{ color: "black", backgroundColor: "white", paddingRight: 20, paddingLeft: 20, display: "flex" }} open={open}>
        <Toolbar sx={{ flexGrow: 1 }}>
          {/* logo */}
          <FaGlasses size={30} sx={{ display: { xs: 'flex', sm: 'flex' }, mr: 1, ml: { xs: 0, sm: 2, md: 5, lg: 7, xl: 10 } }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <div style={{ fontWeight: "400", fontSize: "24px", marginLeft: 10 }} ><span style={{ fontWeight: "800", fontSize: "24px" }}>EYE</span>TRY</div>
          </Typography>

          {/* Nav Menu Dropdown */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, alignSelf: { xs: 'center' }, flexGrow: 1, }}>
            <IconButton
              size="small"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              {
                !toggleSortIcon ? <FaSortDown /> : <FaSortUp />
              }
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
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center" sx={{ ":hover": { color: "#FFB600" }, }}>{page}</Typography>
                </MenuItem>,

                <MenuItem>
                  <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                      <MailIcon />
                  </IconButton>
                  <p>Messages</p>
                </MenuItem>,
                <MenuItem key={page} sx={{ ":hover": { color: "#FFB600" }, }} onClick={() => handeDropDownMenu(page)}
                >
                  {/* <IconButton
                    size="large"
                    aria-label="go to following page"
                    color="inherit"

                  >
                  </IconButton> */}
                  <p>{page}</p>
                </MenuItem>

              ))}
            </Menu>
          </Box>

          {/* Pages in the navbar CS, Chats Settings etc*/}

          <Box sx={{ ml: 5 ,flexGrow: 1 ,display: { xs: 'none', sm: 'none', md: 'flex', lg: 'flex' }, justifyContent: 'center' }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handleCloseNavMenu(page)}
                sx={{ fontFamily: 'monospace', mx: { md: 1, lg: 2 }, color: 'black', display: 'flex', fontWeight: { md: '600', lg: '600' }, fontSize: { md: '14px', lg: '14px' }, ":hover": { color: "#FFB600" }, }}
              >
                {page}
              </Button>
            ))}
          </Box >

          <IconButton size="large" aria-label="show 4 new mails" color="inherit" onClick={()=>navigate('/chat')}>
            <Badge  color="error">
              <MailIcon />
            </Badge>
          </IconButton>

          <Box sx={{ flexGrow: 0, ml: 2, }}>
            <Tooltip title="Open Settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>

                {
                  profileImage ? (<Avatar alt="Remy Sharp" src={profileImage} />) : (<Avatar alt="Remy Sharp" src={profilePic} />)
                }
                <p className='text-sm ml-2 whitespace-nowrap'>Hi, Welcome<p className='font-black'>{name}</p></p>

              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      <Main open={open}>
        <DrawerHeader />
        <Outlet />
      </Main>
    </Box>
  )
}
