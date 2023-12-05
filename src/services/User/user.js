import { authenticatedAxiosInstance } from '../../api/config';


export const getUser = async (id) => {
    try {
        const response = await authenticatedAxiosInstance.get(`users/view_user_info/${id}`)
        return response?.data
    } catch (error) {
        console.error(error)
    }
}

