import './App.css'
import { Menu } from './common/menu/Menu.jsx'
import { Box, Container } from '@mui/material'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home.jsx'
import { PilgrimagePage } from './pages/PilgrimagePage.jsx'



export function App() {

  return (
    <>
    <Router>
    <Menu isLogged={true} />
    <Container sx={{ mt: 15 }}>
      <Routes>
     
      <Route path='/' element={<Home/>}></Route>
      <Route path='/:id' element={<PilgrimagePage/>}></Route>

      </Routes>

      </Container>
      </Router>
    
    </>

  )
}

export default App
