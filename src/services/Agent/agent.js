import { authenticatedAxiosInstance } from '../../api/config';


export const viewAgentProfile = async () => {
    try {
        const response = await authenticatedAxiosInstance.get(`/agent/profile`);
        return response;
    } catch (error) {
        throw error;
    }
}

export const changeAgentPassword = async (data) => {
    try {
        const response = await authenticatedAxiosInstance.put(`/agent/update_password`, data);
        return response;
    } catch (error) {
        throw error;
    }
}

export const updateAgentProfile = async (data) => {
    try {
        const response = await authenticatedAxiosInstance.put(`/agent/update_profile`, data);
        return response;
    } catch (error) {
        throw error;
    }
}


export const viewAgentPhoto = async () => {
    try {
        const response = await authenticatedAxiosInstance.get(`/agent/view_image_server`);
        return response;
    } catch (error) {
        throw error;
    }
}



export const updateAgentPhoto = async (selectedImage) => {
    const formData = new FormData();
    formData.append('image', selectedImage);
    try {
        const response = await authenticatedAxiosInstance.post(`/agent/upload_image_server/`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
        return response;
    } catch (error) {
        throw error;
    }
}

export const deleteAgentPhoto = async () => {
    try {
        const response = await authenticatedAxiosInstance.delete(`/agent/remove_image_server`);
        return response;
    } catch (error) {
        throw error;
    }
}


