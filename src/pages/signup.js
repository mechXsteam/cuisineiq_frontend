import React, {useState} from 'react';
import RegistrationForm from "../components/RegistrationForm";
import OTPInput from "../components/OTPInput";
import {useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";

const RegistrationPage = () => {
    const [page, setPage] = useState(1); // 1 for registration form, 2 for OTP input
    const [qrCode, setQRCode] = useState('');
    const [registrationData, setRegistrationData] = useState(null);
    const navigate = useNavigate();

    const handleRegistrationSubmit = async (data) => {
        // Make API request to send OTP
        try {
            const response = await fetch(`http://127.0.0.1:8000/user-authentication/otp?phone_number=${data.phone_number}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const responseData = await response.json();
            setQRCode(responseData);
            setRegistrationData(data);
            setPage(2);
        } catch (error) {
            console.error('Error sending OTP:', error);
        }
    };

    const handleSubmitOTP = async (otp) => {
        // Make API request to verify OTP
        try {
            const response = await fetch(`http://127.0.0.1:8000/user-authentication/register-candidate?otp_code=${otp}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registrationData)
            });
            const data = await response.json();
            if (response.status !== 200) {
                alert("Invalid OTP code")
            }
            if (response.status === 400) {
                alert("User already exists")
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
        setPage(1); // Go back to registration form page
    };

    return (
        <div className="container">
            <h1>Registration</h1>
            {page === 1 && <RegistrationForm onRegistrationSubmit={handleRegistrationSubmit}/>}
            {page === 2 && <OTPInput qrCode={qrCode} onSubmitOTP={handleSubmitOTP} onPrevious={handlePrevious}/>}
            <Button variant="contained" sx={{"margin":2}}  onClick={() => navigate("/")}>Login</Button>
        </div>
    );
};

export default RegistrationPage;