import axios from 'axios';
import { useEffect, useState } from 'react';
import { IconButton, List, ListItem, ListItemText, Paper } from '@mui/material';
import { EditIcon } from 'lucide-react';

export function ManagePilgrimageList(){
    const urlBase = import.meta.env.VITE_URL_BASE + 'pilgrimages';
        const[pilgrimages, setPilgrimages] = useState([]);
        useEffect(() => {
            loadPilgrimages();
        },[]);
        const loadPilgrimages = async () => {
            const result = await axios.get(urlBase);
            console.log("Result:");
            console.log(result.data);
            setPilgrimages(result.data);
        }




    
    
    return (
            <>
            <Paper elevation={3} style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
              <List>
                {pilgrimages.map((pilgrimage) => (
                  <ListItem
                    key={pilgrimage.id}
                    secondaryAction={
                      <IconButton edge="end" aria-label="edit" component='a' href={'/pilgrimage/edit/'+pilgrimage.id}>
                        <EditIcon />
                      </IconButton>
                    }
                    style={{
                      marginBottom: '10px',
                      borderRadius: '4px',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor: '#f0f0f0',
                        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                      },
                    }}
                  >
                    <ListItemText
                      primary={pilgrimage.name}
                      primaryTypographyProps={{ style: { fontWeight: 'bold' } }}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
            </>
          
    )
}