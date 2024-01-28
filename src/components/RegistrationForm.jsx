import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const RegistrationForm = ({onRegistrationSubmit}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState('');

    const validateEmail = (email) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    };

    const handleRegistrationSubmit = () => {
        if (!validateEmail(email)) {
            setError('Invalid email. Please enter a valid email.');
            return;
        }
        onRegistrationSubmit({name, email, phoneNumber});
    };

    return (
        <div style={{display:"flex", flexDirection:"column"}}>
            <TextField
                label="Enter your name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{marginBottom: 2}}
            />
            <TextField
                label="Enter your email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!error}
                helperText={error}
                sx={{marginBottom: 2}}
            />
            <TextField
                label="Enter your phone number"
                variant="outlined"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                sx={{marginBottom: 2}}
            />
            <Button variant="contained" color="primary" onClick={handleRegistrationSubmit}>
                Register
            </Button>
        </div>
    );
};

export default RegistrationForm;