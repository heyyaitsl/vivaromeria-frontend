import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Divider, IconButton, Menu, MenuItem } from "@mui/material";
import { AccountCircle, AgricultureOutlined, ConfirmationNumberOutlined, KeyboardArrowDown, LogoutOutlined, SettingsOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useAuth } from "../../AuthContext";

export function LoggedBar() {
    const [isIconBoxOpen, setIsIconBoxOpen] = useState(false);

    const urlBase = import.meta.env.VITE_URL_BASE+"user/"+localStorage.getItem('username');
    const [user, setUser] = useState([]);
    useEffect(() => {
        loadUser();
},[])
    const loadUser = async () => {
        const result = await axios.get(urlBase);
        setUser(result.data);
    }
  const toggleIconBox = () => {
    setIsIconBoxOpen(!isIconBoxOpen);
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const { logOut } = useAuth();
    const role = localStorage.getItem('role');
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    window.location.href = '/login';
    logOut();
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
      {role === 'ROLE_FLOATS' &&(<Link to="/manage-floats"><MenuItem onClick={handleMenuClose}><AgricultureOutlined/><p>Mis carrozas</p></MenuItem></Link>)}
      <Link to="/myTickets"><MenuItem onClick={handleMenuClose}><ConfirmationNumberOutlined/><p>Mis entradas</p></MenuItem></Link>
      <MenuItem onClick={handleMenuClose}><SettingsOutlined/><p>Configuración</p></MenuItem>
      <Divider sx={{margin:'0 !important', padding:'0 !important'}} component="li" />
      <MenuItem onClick={logout}><LogoutOutlined/><p>Cerrar sesión</p></MenuItem>
    </Menu>
  );  
    return (
        <>
            <Box sx={{ display: 'flex', justifyContent:'end' }} onClick={handleProfileMenuOpen}>
            {user.photo ? <img className="profile-img" src={"data:image/png;base64,"+user.photo} alt="Usuario" /> :
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>}
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={menuId}
              aria-haspopup="true"
              color="inherit"
            >
              <KeyboardArrowDown/>
            </IconButton>
          </Box>
          {renderMenu}
        </>
    )
}