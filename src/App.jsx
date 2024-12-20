import './App.css'
import { Menu } from './common/menu/Menu.jsx'
import { Container } from '@mui/material'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home.jsx'
import { PilgrimagePage } from './pages/PilgrimagePage.jsx'
import { BuyTicketPage } from './pages/BuyTicketPage.jsx'
import { CreateFloats } from './floats/CreateFloats.jsx'
import { LoginPage } from './pages/LoginPage.jsx'
import { ManageFloats } from './pages/ManageFloats.jsx'
import { AuthProvider } from './AuthContext.jsx'
import { MyTicketsPage } from './pages/MyTicketsPage.jsx'
import { useState } from 'react'
import { Profile } from './user/Profile.jsx'



export function App() {
  const [search, setSearch] = useState('');

  return (
    <>
    <Router>
    <AuthProvider>
    <Menu filter={setSearch}/>
    <Container sx={{ mt:"var(--marginTop)", mb:"2rem" }}>
      <Routes>
     
      <Route path='/' element={<Home filter={search} />}></Route>
      <Route path='/manage-floats' element={<ManageFloats/>}></Route>
      <Route path='/:id' element={<PilgrimagePage/>}></Route>
      <Route path='/buyTicket/:idPilgrimage/:idFloat' element={<BuyTicketPage/>}></Route>
      <Route path='/floats/edit/:id' element={<CreateFloats/>}></Route>
      <Route path='/floats/edit' element={<CreateFloats/>}></Route>
      <Route path='/login' element={<LoginPage/>}></Route>
      <Route path='/myTickets' element={<MyTicketsPage/>}></Route>
      <Route path='/profile' element={<Profile/>}></Route>
      </Routes>

      </Container></AuthProvider>

      </Router>
      
    
    </>

  )
}

export default App
