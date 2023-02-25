
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// material components
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';

// data typing
import { CanvassingNote } from '../../../shared/typing/CanvassingNote';


export default function AllNotes() {

    // state
    const [notes, setNotes] = useState<CanvassingNote[]>([]);

    // useEffect hook to call the api for all notes
    useEffect(() => {
        axios
            .get('http://localhost:8080/api/v1/canvassing-notes/all')
            .then(({ data }) => {
                setNotes(notes => data);
            });

    }, [])


    return (

        <div>
            <Box
                component='form'
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete='off'
            > {
                    (notes && notes.length > 0) && notes.map((note: CanvassingNote, i: number) => {
                        return <Card key={i} sx={{ m: 1 }} variant='outlined'>
                            <CardContent >
                                <Typography sx={{ fontSize: 16 }} align='left'>
                                    {note.firstName} {note.lastName} - <a href='mailto:{note.email}'>{note.email}</a>
                                </Typography>
                                <Typography sx={{ fontSize: 14 }} color='text.secondary' align='left'>{note.notes}</Typography>
                            </CardContent>
                            <CardActions>
                                <Link to={`/edit-note/${note.id}`}><Button size='small'>Edit</Button></Link>
                            </CardActions>
                        </Card>

                    })
                }
            </Box>
            <Box sx={{ m: 1 }}>
                {(!notes || notes && notes.length === 0) &&
                    <Typography>No notes found. Select 'Create Note' from the menu to begin recording notes.</Typography>
                }
            </Box>


        </div>
    )

}
