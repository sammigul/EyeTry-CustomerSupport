import { unauthenticatedAxiosInstance, authenticatedAxiosInstance } from '../../api/config';
import { getDataFromLocalStorage } from '../../utils/LocalStorage';

export const registerAgent = async (data) => {
    try {
        const response = await unauthenticatedAxiosInstance.post('/agent/auth/register', data);
        return response;
    } catch (error) {
        throw error;
    }
}

export const loginAgent = async (data) => {

    try {
        const response = await unauthenticatedAxiosInstance.post('/agent/auth/login', data);
        return response;
    } catch (error) {
        throw error;
    }
}

export const logoutAgent = async (token) => {
    try {
        const response = await authenticatedAxiosInstance.delete('/agent/auth/logout', token);
        return response;
    } catch (error) {
        throw error;
    }
}
