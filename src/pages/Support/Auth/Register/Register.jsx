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
import "./style.css";
import { registerAgent } from "../../../../services/Auth/authentication";
import { saveDataToLocalStorage } from "../../../../utils/LocalStorage";

import { useNavigate, Link } from 'react-router-dom';

export const theme = createTheme({
    typography: {
        fontFamily: "Lato"
    }
});
const Register = () => {

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmpassword] = useState("");

    const navigate = useNavigate();

    const redirectDashboard = () => {
        navigate("/");
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = { firstname, lastname, email, password, confirmpassword };

        try {
            const response = await registerAgent(data);

            if (response.status === 201) {
                console.log(response.data);
                saveDataToLocalStorage("refreshToken", response.data.refreshToken);
                saveDataToLocalStorage("accessToken", response.data.accessToken);
                saveDataToLocalStorage("agentId", response.data.user._id);
                redirectDashboard();
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) redirectDashboard();
    }, []);


    return (
        < ThemeProvider theme={responsiveFontSizes(theme)} >
            <div className="min-h-screen flex items-center justify-center  bg-gradient-to-br from-white to-skin border-2 ">
                <Box textAlign="center" p={2} style={{ width: "22rem", }}>
                    <Box p={1} >
                        <TextField fullWidth label="First Name" variant="outlined" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                    </Box>
                    <Box p={1}>
                        <TextField fullWidth label="Last Name" variant="outlined" value={lastname} onChange={(e) => setLastname(e.target.value)} />
                    </Box>
                    <Box p={1}>
                        <TextField fullWidth label="Email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </Box>

                    <Box p={1}>
                        <TextField
                            fullWidth
                            label="Password"
                            type="password"
                            variant="outlined"
                            value={password} onChange={(e) => setPassword(e.target.value)}
                        />
                    </Box>
                    <Box p={1}>
                        <TextField
                            fullWidth
                            label="Confirm Password"
                            type="password"
                            variant="outlined"
                            value={confirmpassword} onChange={(e) => setConfirmpassword(e.target.value)}
                        />
                    </Box>
                    <Box textAlign="center" py={2} px={1} fullWidth>
                        <Button size="large" variant="contained" color="primary" fullWidth onClick={handleSubmit}>
                            Register
                        </Button>
                    </Box>
                    <Box textAlign="center" p={2} pb={0}>
                        <Typography variant="body2">
                            {" "}
                            Already have an account ? <Link to={'/login'} style={{ color: "#1976d2", textDecoration: "underline" }} >Login here</Link>{" "}
                        </Typography>
                    </Box>
                </Box>
            </div>
        </ThemeProvider >
    );
}

export default Register;
