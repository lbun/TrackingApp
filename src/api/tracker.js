import axios from 'axios';
import { AsyncStorage } from 'react-native'; 

const instance = axios.create({
    baseURL: 'http://0293e477.ngrok.io'
});

// we define a function that will be executed before we make a request  
instance.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        console.log(`Bearer ${token}`)
        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
);

export default instance;