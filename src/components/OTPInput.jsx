import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import QRCodeImage from './QRCode';
import Typography from "@mui/material/Typography";

const OTPInput = ({qrCode, onSubmitOTP, onPrevious}) => {
    const [otp, setOTP] = useState('');

    const handleOTPSubmit = () => {
        onSubmitOTP(otp);
    };

    return (
        <div style={{display:"flex", flexDirection:"column"}}>
            <Typography variant="h6" gutterBottom component="div">Use Google Authenticator.</Typography>
            <QRCodeImage base64String={qrCode}/>

            <TextField
                label="Enter OTP"
                variant="outlined"
                value={otp}
                onChange={(e) => setOTP(e.target.value)}
                sx={{marginBottom: 2}}
            />
            <div className="button-container">
                <Button variant="contained" color="primary" onClick={handleOTPSubmit}>
                    Submit OTP
                </Button>
                <Button variant="contained" color="secondary" onClick={onPrevious}>
                    Previous
                </Button>
            </div>
        </div>
    );
};

export default OTPInput;