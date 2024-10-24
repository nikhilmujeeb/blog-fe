import axios from 'axios';
import { API_NOTIFICATION_MESSAGES, SERVICE_URLS } from '../constants/config';
import { getAccessToken, getType } from '../utils/common-utils';

const API_URL = process.env.REACT_APP_API_URL || 'https://blog-be-3tvt.onrender.com';

// Create an axios instance with base configuration
const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptors
axiosInstance.interceptors.request.use(
    (config) => {
        const token = getAccessToken();
        if (token) config.headers.authorization = token;
        
        // Handle TYPE-based configurations
        if (config.TYPE) {
            if (config.TYPE.params) {
                config.params = config.TYPE.params;
            } else if (config.TYPE.query) {
                config.url += `/${config.TYPE.query}`;
            }
        }

        return config;
    },
    (error) => {
        console.error('Request Error:', error);
        return Promise.reject(error);
    }
);

axios.post('https://blog-be-3tvt.onrender.com/api/login', {
    email: 'test@example.com',
    password: 'password123',
  })
  .then(response => console.log('Login Successful:', response))
  .catch(error => console.error('Login Error:', error));  

axiosInstance.interceptors.response.use(
    (response) => {
        console.log('API Response:', response);
        return processResponse(response);
    },
    async (error) => {
        console.error('Response Error:', error.toJSON());
        return Promise.reject(await processError(error));
    }
);

// Response Processing
const processResponse = (response) => {
    if (response?.status === 200) {
        return { isSuccess: true, data: response.data };
    }
    return {
        isFailure: true,
        status: response?.status,
        msg: response?.data?.msg || API_NOTIFICATION_MESSAGES.responseFailure.message,
        code: response?.status,
    };
};

const processError = async (error) => {
    if (error.response) {
        const { status, data } = error.response;
        if (status === 403) {
            sessionStorage.clear();
            return { isError: true, msg: 'Session expired. Please log in again.', code: status };
        }
        console.error('ERROR RESPONSE DATA:', data);
        return { isError: true, msg: data?.msg || API_NOTIFICATION_MESSAGES.responseFailure.message, code: status };
    } else if (error.request) {
        console.error('ERROR IN REQUEST:', error.request);
        return { isError: true, msg: API_NOTIFICATION_MESSAGES.requestFailure.message, code: '' };
    }
    console.error('ERROR IN SETUP:', error.message);
    return { isError: true, msg: API_NOTIFICATION_MESSAGES.networkError.message, code: '' };
};

// Dynamic API Methods
const API = {};
for (const [key, value] of Object.entries(SERVICE_URLS)) {
    API[key] = (body, showUploadProgress, showDownloadProgress) =>
        axiosInstance({
            method: value.method,
            url: value.url,
            data: value.method === 'DELETE' ? undefined : body,
            responseType: value.responseType,
            TYPE: getType(value, body),
            onUploadProgress: (progressEvent) => {
                if (showUploadProgress) {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showUploadProgress(percentCompleted);
                }
            },
            onDownloadProgress: (progressEvent) => {
                if (showDownloadProgress) {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showDownloadProgress(percentCompleted);
                }
            },
        });
}

// Specific API methods
export const userLogin = async (data) => {
    console.log('Login Request Data:', data);
    return API.login(data);
};

export const userSignup = async (data) => {
    console.log('Signup Request Data:', data);
    return API.signup(data);
};

export { API };
