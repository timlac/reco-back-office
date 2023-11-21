import {getCurrentSession} from "../libs/CognitoConstruct";
import axios from 'axios';

// Create an Axios instance
const api = axios.create({
    baseURL: 'https://xa5yfn82wc.execute-api.eu-west-1.amazonaws.com/prod/'
});

// Add a request interceptor
api.interceptors.request.use(async (config) => {
    try {
        const session = await getCurrentSession();
        config.headers.Authorization = `Bearer ${session.getIdToken().getJwtToken()}`;
    } catch (error) {
        console.error('Error getting the current session', error);
        // Handle token retrieval errors (e.g., redirect to login)
    }
    return config;
}, (error) => {
    // Do something with request error
    return Promise.reject(error);
});

export default api