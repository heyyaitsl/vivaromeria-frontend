import axios from 'axios';
import { useEffect, useState } from 'react';
import { IconButton, List, ListItem, ListItemText, Paper } from '@mui/material';
import { EditIcon } from 'lucide-react';

export function ManageFloatsList(){
    const urlBase = import.meta.env.VITE_URL_BASE + 'floats';
        const[floats, setFloats] = useState([]);
        useEffect(() => {
            loadFloats();
        },[]);
        const loadFloats = async () => {
            const result = await axios.get(urlBase);
            console.log("Result:");
            console.log(result.data);
            setFloats(result.data);
        }
        const username = localStorage.getItem('username');
        const filteredFloats = floats.filter(float => float.username === username);




    
    
    return (
            <>
            <Paper elevation={3} style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
              <List>
                {filteredFloats.map((float) => (
                  <ListItem
                    key={float.id}
                    secondaryAction={
                      <IconButton edge="end" aria-label="edit" component='a' href={'/floats/edit/'+float.id}>
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
                      primary={float.name}
                      primaryTypographyProps={{ style: { fontWeight: 'bold' } }}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
            </>
          
    )
}