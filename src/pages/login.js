import React, { useState } from 'react';
import PhoneNumberInput from "../components/PhoneNumberInput";
import OTPInput from "../components/OTPInput";
import {useNavigate} from "react-router-dom";
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";

const LoginPage = () => {
    const [page, setPage] = useState(1); // 1 for phone number input, 2 for OTP input
    const [qrCode, setQRCode] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const navigate = useNavigate();

    const handleSendOTP = async (phoneNumber) => {
        // Make API request to get base64 encoded QR code
        try {
            const response = await fetch(`http://127.0.0.1:8000/user-authentication/otp?phone_number=${phoneNumber}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            console.log("data",data)
            setQRCode(data);
            setPhoneNumber(phoneNumber); // Store phone number for later use
            setPage(2);
        } catch (error) {
            console.error('Error sending OTP:', error);
        }
    };

    const handleSubmitOTP = async (otp) => {
        // Make API request to verify OTP
        try {
            const response = await fetch(`http://127.0.0.1:8000/user-authentication/login?phone_number=${phoneNumber}&otp_code=${otp}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            if(response.status !== 200) {
                alert("Invalid OTP code")
            } else {
                localStorage.setItem("token", data.access_token)
                navigate("/cuisines")
            }
            // Handle response accordingly (e.g., set authentication token, redirect, etc.)
            console.log(data);
        } catch (error) {
            console.error('Error verifying OTP:', error);
        }
    };

    const handlePrevious = () => {
        setPage(1); // Go back to phone number input page
    };

    return (
        <div className="container">
            <Typography variant="h4" component="h4" gutterBottom>Login</Typography>
            {page === 1 && <PhoneNumberInput onSendOTP={handleSendOTP} />}
            {page === 2 && <OTPInput qrCode={qrCode} onSubmitOTP={handleSubmitOTP} onPrevious={handlePrevious} />}
            <Button variant="contained" sx={{"margin":2}}  onClick={() => navigate("/signup")}>Register</Button>
        </div>
    );
};

export default LoginPage;
