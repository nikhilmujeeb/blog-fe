import axios from 'axios';
import { API_NOTIFICATION_MESSAGES, SERVICE_URLS } from '../constants/config';
import { getAccessToken } from '../utils/common-utils';

const API_URL = process.env.REACT_APP_API_URL || 'https://blog-be-3tvt.onrender.com/api';

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = getAccessToken();
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => {
        console.error('Request Error:', error);
        return Promise.reject(error);
    }
);

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
    let message = API_NOTIFICATION_MESSAGES.responseFailure.message; // Default message
    if (error.response) {
        const { status, data } = error.response;
        if (status === 403) {
            message = 'Session expired. Please log in again.';
        } else {
            message = data?.msg || message; // Custom error message if available
        }
    } else if (error.request) {
        message = API_NOTIFICATION_MESSAGES.networkError.message;
    }
    console.error('API Error:', message);
    return { isError: true, msg: message };
};

const API = {};
for (const [key, value] of Object.entries(SERVICE_URLS)) {
    API[key] = (body, showUploadProgress) => {
        const method = value.method.toLowerCase();
        const url = value.url;
        const options = {
            method: method,
            url: url,
            data: body,
            ...(showUploadProgress && { onUploadProgress: (progressEvent) => console.log(progressEvent) }),
        };
        return axiosInstance(options)
            .then(processResponse)
            .catch(processError);
    };
}

export { API };
