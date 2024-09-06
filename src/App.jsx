import './App.css'
 import { PilgrimageList } from './pilgrimage/pilgrimageList/PilgrimageList.jsx'
import { Menu } from './common/menu/Menu.jsx'
import { Box, Container } from '@mui/material'
import { Pilgrimage } from './pilgrimage/pilgrimageDetails/Pilgrimage.jsx'



export function App() {

  return (
    <>
    <div className='container'>
    <Menu isLogged={true} /> 
    </div>
    <PilgrimageList/>
    <Container sx={{mt:15 }}>
      <Box>
        
        <Pilgrimage/>
      </Box>
    </Container>
    </>

  )
}

export default App
