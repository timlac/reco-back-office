import {getCurrentSession} from "../libs/CognitoConstruct";
import axios from 'axios';
import {getBandSizeOfAxis} from "recharts/types/util/ChartUtils";


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
const emotionCategoriesApi = axios.create({
    baseURL: 'https://xxpy3ht9ke.execute-api.eu-west-1.amazonaws.com/prod/'
});

const videoMetadatApi = axios.create({
    baseURL: 'https://n6phu93lo7.execute-api.eu-west-1.amazonaws.com/prod'
})

emotionCategoriesApi.interceptors.request.use(apiAuthInterceptor)
videoMetadatApi.interceptors.request.use(apiAuthInterceptor)

// Add a request interceptor
// api.interceptors.request.use(async (config) => {
//     try {
//         const session = await getCurrentSession();
//         config.headers.Authorization = `Bearer ${session.getIdToken().getJwtToken()}`;
//     } catch (error) {
//         console.error('Error getting the current session', error);
//         // Handle token retrieval errors (e.g., redirect to login)
//     }
//     return config;
// }, (error) => {
//     // Do something with request error
//     return Promise.reject(error);
// });

export default emotionCategoriesApi