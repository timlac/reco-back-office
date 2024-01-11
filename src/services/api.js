import {getCurrentSession} from "../libs/CognitoConstruct";
import axios from 'axios';

async function apiAuthInterceptor (config){
    try {
        const session = await getCurrentSession();
        config.headers.Authorization = `Bearer ${session.getIdToken().getJwtToken()}`;
    } catch (error) {
        console.error('Error getting the current session', error);
        // Handle token retrieval errors (e.g., redirect to login)
    }
    return config;
}


// Create an Axios instance
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

api.interceptors.request.use(apiAuthInterceptor)


export {api}
