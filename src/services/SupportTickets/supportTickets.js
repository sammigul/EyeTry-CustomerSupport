import { authenticatedAxiosInstance } from '../../api/config';

export const getSupportTickets = async () => {
    try {
        const response = await authenticatedAxiosInstance.get('/support/tickets')
        return response?.data
    } catch (error) {
        throw error
    }
}

export const getSupportTicketById = async (id) => {
    try {
        const response = await authenticatedAxiosInstance.get(`/support/tickets/${id}`)
        return response?.data
    } catch (error) {
        throw error
    }
}



export const updateSupportTicket = async (id, ticket) => {
    try {
        const response = await authenticatedAxiosInstance.put(`/support/tickets/${id}`, ticket)
        return response?.data
    } catch (error) {
        throw error
    }
}

export const deleteSupportTicket = async (id) => {
    try {
        const response = await authenticatedAxiosInstance.delete(`/support/tickets/${id}`)
        return response?.data
    } catch (error) {
        throw error
    }
}

//  These api calls are for customer side ... will move them to eyetry-web repo later



export const createSupportTicket = async (ticket) => {
    try {
        const response = await authenticatedAxiosInstance.post(`/support/ticket`, ticket)
        return response?.data
    } catch (error) {
        throw error
    }
}

