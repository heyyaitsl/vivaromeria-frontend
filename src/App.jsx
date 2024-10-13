import './App.css'
import { Menu } from './common/menu/Menu.jsx'
import { Box, Container } from '@mui/material'
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom'
import { Home } from './pages/Home.jsx'
import { PilgrimagePage } from './pages/PilgrimagePage.jsx'
import { BuyTicketPage } from './pages/BuyTicketPage.jsx'
import { CreatePilgrimage } from './pilgrimage/CreatePilgrimage.jsx'
import { CreateFloats } from './floats/CreateFloats.jsx'
import { LoginPage } from './pages/LoginPage.jsx'
import { useEffect, useState } from 'react'
import { ManagePilgrimage } from './pages/ManagePilgrimage.jsx'
import { ManageFloats } from './pages/ManageFloats.jsx'



export function App() {
  const [isLogged, setIsLogged] = useState(false);

  // Chequear si el usuario tiene token en el localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLogged(true);
    }
  }, []);

  return (
    <>
    <Router>
    <Menu isLogged={isLogged} />
    <Container sx={{ mt:"var(--marginTop)" }}>
      <Routes>
     
      <Route path='/' element={<Home/>}></Route>
      <Route path='/manage-pilgrimages' element={<ManagePilgrimage/>}></Route>
      <Route path='/manage-floats' element={<ManageFloats/>}></Route>
      <Route path='/pilgrimage/edit/:id' element={<CreatePilgrimage/>}></Route>
      <Route path='/pilgrimage/edit' element={<CreatePilgrimage/>}></Route>
      <Route path='/:id' element={<PilgrimagePage/>}></Route>
      <Route path='/buyTicket/:idPilgrimage/:idFloat' element={<BuyTicketPage/>}></Route>
      <Route path='/floats/edit/:id' element={<CreateFloats/>}></Route>
      <Route path='/floats/edit' element={<CreateFloats/>}></Route>
      <Route path='/login' element={<LoginPage/>}></Route>
      </Routes>

      </Container>
      </Router>
    
    </>

  )
}

export default App
