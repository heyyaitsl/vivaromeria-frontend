import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Logo from '../Logo.jsx'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { AgricultureOutlined, ConfirmationNumberOutlined, LogoutOutlined, SettingsOutlined } from '@mui/icons-material';
import { Divider } from '@mui/material';
import { useState } from 'react';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderColor: alpha(theme.palette.common.white, 0.35),
  borderStyle: 'solid',
  borderWidth: '1px',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  marginLeft: theme.spacing(3),
  width: 'auto',
  // display: 'grid' -> 3 columns 20% | 60% | 20%
  
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
    width: '100%'
  },
}));

export function MenuV2() {
  const [anchorEl, setAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      className='menu-modal'
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      sx={{mt:'4rem'}}
    >
      <MenuItem onClick={handleMenuClose}><AgricultureOutlined/><p>Mis carrozas</p></MenuItem>
      <MenuItem onClick={handleMenuClose}><ConfirmationNumberOutlined/><p>Mis entradas</p></MenuItem>
      <MenuItem onClick={handleMenuClose}><SettingsOutlined/><p>Configuración</p></MenuItem>
      <Divider sx={{margin:'0 !important', padding:'0 !important'}} component="li" />
      <MenuItem onClick={handleMenuClose}><LogoutOutlined/><p>Cerrar sesión</p></MenuItem>
    </Menu>
  );  

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{display:'grid', gridTemplateColumns:'0.8fr 4fr 0.5fr'}}>
          <Typography
            variant="h4"
            noWrap
            component="div"
            sx={{ display: 'block'  }}
          >
            <Logo/>
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box sx={{ display: 'flex', justifyContent:'end' }} onClick={handleProfileMenuOpen}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={menuId}
              aria-haspopup="true"
              color="inherit"
            >
              <KeyboardArrowDownIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
  );
}
