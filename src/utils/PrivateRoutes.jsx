import { Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { authenticatedAxiosInstance } from "../api/config";
import { getDataFromLocalStorage, clearLocalStorage } from "./LocalStorage";

const PrivateRoutes = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const verifyToken = async () => {
            const accessToken = getDataFromLocalStorage("accessToken");
            const refreshToken = getDataFromLocalStorage("refreshToken");

            if (accessToken && refreshToken) {
                try {
                    const response = await authenticatedAxiosInstance.post(
                        "/agent/auth/verify_token"
                    );

                    if (response.status === 200) {
                        setIsAuthenticated(true);
                    } else if (response.status === 403) {
                        setIsAuthenticated(false);
                        clearLocalStorage();
                    } else {
                        setIsAuthenticated(false);
                        clearLocalStorage();
                    }
                } catch (error) {
                    setIsAuthenticated(false);
                    clearLocalStorage();
                }
            } else {
                setIsAuthenticated(false);
                clearLocalStorage();
            }
        };

        verifyToken();
    }, []);

    if (isAuthenticated === null) {
        return null;
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
