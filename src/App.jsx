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
import { AuthProvider } from './AuthContext.jsx'
import { MyTicketsPage } from './pages/MyTicketsPage.jsx'



export function App() {


  return (
    <>
    <Router>
    <AuthProvider>
    <Menu />
    <Container sx={{ mt:"var(--marginTop)", mb:"2rem" }}>
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
      <Route path='/myTickets' element={<MyTicketsPage/>}></Route>
      </Routes>

      </Container></AuthProvider>

      </Router>
      
    
    </>

  )
}

export default App
