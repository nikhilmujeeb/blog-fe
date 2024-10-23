import axios from 'axios';
import { API_NOTIFICATION_MESSAGES, SERVICE_URLS } from '../constants/config';
import { getAccessToken, getType } from '../utils/common-utils';

const API_URL = 'https://blog-be-3tvt.onrender.com';

// Create an axios instance with base configuration
const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000, // Timeout after 10 seconds
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor
axiosInstance.interceptors.request.use(
    function (config) {
        // Handle custom TYPE-based query or params
        if (config.TYPE) {
            if (config.TYPE.params) {
                config.params = config.TYPE.params;
            } else if (config.TYPE.query) {
                config.url += `/${config.TYPE.query}`;
            }
        }
        // Attach authorization token if available
        config.headers.authorization = getAccessToken();
        return config;
    },
    function (error) {
        console.error("ERROR IN REQUEST INTERCEPTOR: ", error);
        return Promise.reject(error);
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    function (response) {
        return processResponse(response);
    },
    async function (error) {
        return Promise.reject(await processError(error));
    }
);

// Function to process API responses
const processResponse = (response) => {
    if (response?.status === 200) {
        return { isSuccess: true, data: response.data };
    } else {
        return {
            isFailure: true,
            status: response?.status,
            msg: response?.data?.msg || API_NOTIFICATION_MESSAGES.responseFailure.message,
            code: response?.status,
        };
    }
};

// Function to process errors with detailed logging
const processError = async (error) => {
    if (error.response) {
        const { status } = error.response;

        // Handle session expiration (403)
        if (status === 403) {
            sessionStorage.clear();
            return {
                isError: true,
                msg: 'Session expired. Please log in again.',
                code: status,
            };
        } else {
            console.error("ERROR IN RESPONSE: ", error.toJSON());
            return {
                isError: true,
                msg: error.response.data?.msg || API_NOTIFICATION_MESSAGES.responseFailure.message,
                code: status,
            };
        }
    } else if (error.request) {
        console.error("ERROR IN REQUEST: ", error.request); // Log request error
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.requestFailure.message,
            code: "",
        };
    } else {
        console.error("ERROR IN SETUP: ", error.message); // Log setup error
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.networkError.message,
            code: "",
        };
    }
};

// Create API object with service methods
const API = {};
for (const [key, value] of Object.entries(SERVICE_URLS)) {
    API[key] = (body, showUploadProgress, showDownloadProgress) =>
        axiosInstance({
            method: value.method,
            url: value.url,
            data: value.method === 'DELETE' ? undefined : body,
            responseType: value.responseType,
            TYPE: getType(value, body),
            // Track upload progress
            onUploadProgress: function (progressEvent) {
                if (showUploadProgress) {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showUploadProgress(percentCompleted);
                }
            },
            // Track download progress
            onDownloadProgress: function (progressEvent) {
                if (showDownloadProgress) {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showDownloadProgress(percentCompleted);
                }
            },
        });
}

export { API };
