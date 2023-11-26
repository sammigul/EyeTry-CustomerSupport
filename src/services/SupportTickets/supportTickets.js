import { authenticatedAxiosInstance } from '../../api/config';

export const getSupportTickets = async () => {
    try {
        const response = await authenticatedAxiosInstance.get('/support/tickets')
        return response?.data
    } catch (error) {
        console.error(error)
    }
}

export const getSupportTicketById = async (id) => {
    try {
        const response = await authenticatedAxiosInstance.get(`/support/tickets/${id}`)
        return response?.data
    } catch (error) {
        console.error(error)
    }
}



export const updateSupportTicket = async (id, ticket) => {
    try {
        const response = await authenticatedAxiosInstance.put(`/support/tickets/${id}`, ticket)
        return response?.data
    } catch (error) {
        console.error(error)
    }
}

export const deleteSupportTicket = async (id) => {
    try {
        const response = await authenticatedAxiosInstance.delete(`/support/tickets/${id}`)
        return response?.data
    } catch (error) {
        console.error(error)
    }
}

