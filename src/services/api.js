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
const responseApi = axios.create({
    baseURL: 'https://zm9qh359vf.execute-api.eu-west-1.amazonaws.com/prod/'
});

const videoMetadatApi = axios.create({
    baseURL: 'https://n6phu93lo7.execute-api.eu-west-1.amazonaws.com/prod'
})

responseApi.interceptors.request.use(apiAuthInterceptor)
videoMetadatApi.interceptors.request.use(apiAuthInterceptor)


export {responseApi, videoMetadatApi}
