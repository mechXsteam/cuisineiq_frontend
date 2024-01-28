import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const PhoneNumberInput = ({ onSendOTP }) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState('');

    const validatePhoneNumber = (phoneNumber) => {
        const regex = /^\d{10}$/;
        return regex.test(phoneNumber);
    };

    const handleSendOTP = () => {
        if (!validatePhoneNumber(phoneNumber)) {
            setError('Invalid phone number. Please enter a 10 digit phone number.');
            return;
        }
        setError('');
        onSendOTP(phoneNumber);
    };

    return (
        <div style={{display:"flex", flexDirection:"column"}}>
            <TextField
                variant="outlined"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                error={!!error}
                helperText={error}
                sx={{ marginBottom: 2 }}
            />
            <Button variant="contained" color="primary" onClick={handleSendOTP}>
                Send OTP
            </Button>
        </div>
    );
};

export default PhoneNumberInput;