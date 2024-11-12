import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Logo from '../Logo.jsx'
import { LoggedBar } from './LoggedBar.jsx';
import { useAuth } from '../../AuthContext.jsx';
import { LogoutBar } from './LogoutBar.jsx';
import { Link } from 'react-router-dom';
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

export function Menu({filter}) {
  const { isLogged } = useAuth();
  const [inputText, setInputText] = useState("");
  let inputHandler = (e) => {
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  }
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      filter(inputText);
    }
  }
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
            <Link to='/'><Logo/></Link>
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={inputHandler}
              onKeyDown={handleKeyDown}
            />
          </Search>
          {isLogged
                ? <LoggedBar/>
                : <LogoutBar/>
                }
        </Toolbar>
      </AppBar>
    </Box>
  );
}
