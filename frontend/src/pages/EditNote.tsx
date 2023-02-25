import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import validator from 'validator';

// material components
import { Box, Button, BoxProps } from '@mui/material';
import { TextField as MuiTextField } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

// data typing
import { CanvassingNote } from '../../../shared/typing/CanvassingNote';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

export default function EditNote() {

    // get id from params
    const { id } = useParams();

    // state
    const [open, setOpen] = useState(false);
    const [note, setNote] = useState<CanvassingNote>({ firstName: '', lastName: '', notes: '', email: '' });
    const [emailError, setEmailError] = useState<string>('');

    // useEffect hook to call the api for note being edited
    useEffect(() => {
        axios
            .get(`http://localhost:8080/api/v1/canvassing-notes/note/${id}`)
            .then(({ data }) => {
                setNote(note => data);
            });

    }, [])

    /**
     * Validates the email form field.
     * @param event
     */
    const validateEmail = (event: React.FormEvent<HTMLFormElement>) => {
        var email = (event.target as HTMLFormElement).value;
        if (!validator.isEmail(email)) {
            setEmailError('Enter a valid email address.');
        }
        else {
            setEmailError('');
        }
    };

    /**
     * Handles closing the toast message.
     * @param event
     * @param reason
     * @returns
     */
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string): void => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    /**
    * Submits notes form data to backend, displays toast to user and clears form values.
    */
    const onSubmit = (): void => {
        const payload: CanvassingNote = note;
        axios
            .post('http://localhost:8080/api/v1/canvassing-notes/edit', payload)
            .then(({ data }) => {
                setNote(note);
                setOpen(true);
            });
    }

    /**
     * Updates the form values in state.
     * @param event
     */
    const updateFormValues = (event: React.FormEvent<HTMLFormElement>): void => {
        switch ((event.target as HTMLFormElement).name) {
            case 'firstName':
                setNote({ ...note, firstName: (event.target as HTMLFormElement).value });
                break;
            case 'lastName':
                setNote({ ...note, lastName: (event.target as HTMLFormElement).value });
                break;
            case 'email':
                validateEmail(event);
                setNote({ ...note, email: (event.target as HTMLFormElement).value });
                break;
            case 'notes':
                setNote({ ...note, notes: (event.target as HTMLFormElement).value });
                break;
        }
    }

    return (
        <div className='formWrapper'>

            <Box
                component='form'
                sx={{
                    '& .MuiTextField-root': { m: 1 },
                }}
                autoComplete='off'
                onChange={(event: React.FormEvent<HTMLFormElement>) => {
                    updateFormValues(event);
                }}
            >
                <MuiTextField name={'firstName'} value={note.firstName} label={'First Name'} required={true} variant={'filled'} sx={{ width: '100%' }}></MuiTextField>
                <MuiTextField name={'lastName'} value={note.lastName} label={'Last Name'} required={true} variant={'filled'} sx={{ width: '100%' }} ></MuiTextField>
                <MuiTextField name={'email'} value={note.email} label={'Email'} required={true} variant={'filled'} sx={{ width: '100%' }} error={emailError !== ''} helperText={emailError}></MuiTextField>
                <MuiTextField name={'notes'} multiline rows={7} value={note?.notes} label={'Notes'} required={true} variant={'filled'} sx={{ width: '100%' }} ></MuiTextField>

            </Box>


            <Button style={buttonStyles}
                disabled={!note.firstName || !note.lastName || !note.notes || !note.email}
                sx={{ backgroundColor: !note.firstName || !note.lastName || !note.notes || !note.email ? statusColors.disabled : buttonSX }}
                onClick={() => onSubmit()}
            >Submit</Button>


            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
                    Note has been saved!
                </Alert>
            </Snackbar>

        </div>

    )
}

const statusColors = {
    disabled: 'lightgrey',
    processing: '#F0E666',
    normal: 'rgb(98, 54, 255)',
    hover: '#1d1145'
}

const buttonStyles: BoxProps['style'] = {
    margin: '40px 20px',
    padding: '10px 20px',
    color: 'white',
};
const buttonSX = {
    backgroundColor: statusColors.normal,
    '&:hover': {
        backgroundColor: statusColors.hover
    },
};
