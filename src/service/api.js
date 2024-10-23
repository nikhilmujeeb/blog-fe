import axios from 'axios';
import { API_NOTIFICATION_MESSAGES, SERVICE_URLS } from '../constants/config';
import { getAccessToken, getType } from '../utils/common-utils';

const API_URL = 'https://blog-be-3tvt.onrender.com';

// Axios instance with a 10-second timeout and default headers
const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: { "Content-Type": "application/json" },
});

// Request interceptor for dynamic params and query handling
axiosInstance.interceptors.request.use(
    (config) => {
        const { TYPE } = config;
        if (TYPE) {
            if (TYPE.params) {
                config.params = TYPE.params;
            } else if (TYPE.query) {
                config.url += `/${TYPE.query}`;
            }
        }
        config.headers.authorization = getAccessToken(); // Attach token to headers
        return config;
    },
    (error) => {
        console.error("REQUEST ERROR:", error);
        return Promise.reject(error);
    }
);

// Response interceptor for consistent response and error handling
axiosInstance.interceptors.response.use(
    (response) => processResponse(response),
    (error) => Promise.reject(processError(error))
);

// Helper function to process successful responses
const processResponse = (response) => {
    return response?.status === 200
        ? { isSuccess: true, data: response.data }
        : {
            isFailure: true,
            status: response?.status,
            msg: response?.data?.msg || API_NOTIFICATION_MESSAGES.responseFailure.message,
            code: response?.status,
        };
};

// Helper function to process API errors
const processError = (error) => {
    const { response, request, message } = error;

    if (response) {
        const { status } = response;
        if (status === 403) {
            sessionStorage.clear();
            return { isError: true, msg: 'Session expired. Please log in again.', code: status };
        } 
        console.error("RESPONSE ERROR:", error.toJSON());
        return { isError: true, msg: response.data?.msg || API_NOTIFICATION_MESSAGES.responseFailure.message, code: status };
    } else if (request) {
        console.error("REQUEST ERROR:", request);
        return { isError: true, msg: API_NOTIFICATION_MESSAGES.requestFailure.message };
    } else {
        console.error("SETUP ERROR:", message);
        return { isError: true, msg: API_NOTIFICATION_MESSAGES.networkError.message };
    }
};

// API service object to create API calls dynamically from SERVICE_URLS
const API = {};
for (const [key, value] of Object.entries(SERVICE_URLS)) {
    API[key] = (body, showUploadProgress, showDownloadProgress) =>
        axiosInstance({
            method: value.method,
            url: value.url,
            data: value.method === 'DELETE' ? undefined : body,
            responseType: value.responseType,
            TYPE: getType(value, body),
            onUploadProgress: (event) => {
                if (showUploadProgress) {
                    const percentCompleted = Math.round((event.loaded * 100) / event.total);
                    showUploadProgress(percentCompleted);
                }
            },
            onDownloadProgress: (event) => {
                if (showDownloadProgress) {
                    const percentCompleted = Math.round((event.loaded * 100) / event.total);
                    showDownloadProgress(percentCompleted);
                }
            },
        });
}

export { API };
