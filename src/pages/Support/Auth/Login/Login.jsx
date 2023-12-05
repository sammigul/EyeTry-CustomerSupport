import React, { useState, useEffect } from "react";
import {
    Box,
    createTheme,
    responsiveFontSizes,
    ThemeProvider,
    Typography,
    TextField,
    Button,
} from "@mui/material";
import { useNavigate, Link } from 'react-router-dom';
import "./style.css";

import { loginAgent } from "../../../../services/Auth/authentication";
import { saveDataToLocalStorage } from "../../../../utils/LocalStorage";

export const theme = createTheme({
    typography: {
        fontFamily: "Lato"
    }
});
const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errorVisible, setErrorVisible] = React.useState(false)
    const [errorMsg, setErrorMsg] = React.useState('')


    const navigate = useNavigate();

    const redirectDashboard = () => {
        navigate("/");
    };

    const validateForm = () => {
        // Validating user input
        if (!email || !password) {
            setErrorVisible(true)
            setErrorMsg('Please fill out all fields');
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setErrorVisible(true)
            setErrorMsg('Please enter a valid email address.');
            return false;
        }
        return true
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const data = { email, password };

        try {
            const response = await loginAgent(data);
            if (response.data?.user.status.user_status !== "Active") {
                return alert("Agent Banned By Admin...")
            }
            if (response.status === 201) {
                console.log(response.data);
                saveDataToLocalStorage("refreshToken", response.data.refreshToken);
                saveDataToLocalStorage("accessToken", response.data.accessToken);
                saveDataToLocalStorage("agentId", response.data.user._id);
                redirectDashboard();
            }
        } catch (error) {
            console.error("Error:", error);
            setErrorVisible(true)
            setErrorMsg(error.response.data.message)
        }
    };

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) redirectDashboard();
    }, []);

    return (
        < ThemeProvider theme={responsiveFontSizes(theme)} >
            <div className="min-h-screen flex items-center justify-center bg-gray-100" >
                <Box textAlign="center" style={{ width: "20rem" }}>
                    {
                        errorVisible && (<Box pl={2} pr={2} >
                            <Typography fullWidth style={{color: 'red', fontSize: 16, alignSelf: 'flex-start', paddingBottom: '4%' }}>{errorMsg}</Typography>
                        </Box>)
                    }
                    <Box pl={2} pr={2} >
                        <TextField fullWidth label="Email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </Box>
                    <Box p={2}>
                        <TextField
                            fullWidth
                            label="Password"
                            type="password"
                            variant="outlined"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Box>
                    <Box style={{ cursor: "pointer", }} pr={2}>
                        <Typography align="right" variant="body2" className="hover:text-blue-500 transform hover:scale-105">
                            Forgot password
                        </Typography>
                    </Box>
                    <Box textAlign="center" p={2} fullWidth>
                        <Button size="large" variant="contained" color="primary" fullWidth onClick={handleSubmit}>
                            Login
                        </Button>
                    </Box>
                    <Box textAlign="center" p={2}>
                        <Typography variant="body2" style={{ cursor: "pointer", }}>
                            {" "}
                            Don't have an account ? <Link to={'/register'} style={{ color: "#1976d2", textDecoration: "underline" }} >Register here</Link>{" "}
                        </Typography>
                    </Box>
                </Box>
            </div>
        </ThemeProvider >
    );
}
export default Login;
