import './App.css'
import { Menu } from './common/menu/Menu.jsx'
import { Box, Container } from '@mui/material'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home.jsx'
import { PilgrimagePage } from './pages/PilgrimagePage.jsx'
import { BuyTicketPage } from './pages/BuyTicketPage.jsx'
import { CreatePilgrimage } from './pilgrimage/CreatePilgrimage.jsx'
import { CreateFloats } from './floats/CreateFloats.jsx'
import { LoginPage } from './pages/LoginPage.jsx'



export function App() {

  return (
    <>
    <Router>
    <Menu isLogged={true} />
    <Container sx={{ mt:"var(--marginTop)" }}>
      <Routes>
     
      <Route path='/' element={<Home/>}></Route>
      <Route path='/createPilgrimage' element={<CreatePilgrimage/>}></Route>
      <Route path='/pilgrimage/:id/edit' element={<CreatePilgrimage/>}></Route>
      <Route path='/:id' element={<PilgrimagePage/>}></Route>
      <Route path='/buyTicket/:idPilgrimage/:idFloat' element={<BuyTicketPage/>}></Route>
      <Route path='/createFloat' element={<CreateFloats/>}></Route>
      <Route path='/float/:id/edit' element={<CreateFloats/>}></Route>
      <Route path='/login' element={<LoginPage/>}></Route>
      </Routes>

      </Container>
      </Router>
    
    </>

  )
}

export default App
