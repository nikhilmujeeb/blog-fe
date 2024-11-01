import axios from 'axios';
import { API_NOTIFICATION_MESSAGES, SERVICE_URLS } from '../constants/config';
import { formatURL } from '../utils/common-utils';

const API_URL = process.env.REACT_APP_API_URL || 'https://blog-be-3tvt.onrender.com';

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Authorization Interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem('accessToken');
        if (token) config.headers.Authorization = `Bearer ${token}`; 
        return config;
    },
    (error) => Promise.reject(error)
);

// Process Response
const processResponse = (response) => {
    if (response?.status === 200 || response?.status === 201) {
        return { isSuccess: true, data: response.data };
    }
    return {
        isFailure: true,
        status: response?.status,
        msg: response?.data?.msg || API_NOTIFICATION_MESSAGES.responseFailure.message,
        code: response?.status,
    };
};

// Error Processor
const processError = (error) => {
    let message = API_NOTIFICATION_MESSAGES.networkError.message;
    console.error("Detailed API Error:", error);

    if (error.response) {
        const { status, data } = error.response;
        message = data?.msg || `Error: ${status}`;
        if (status === 403) message = 'Session expired. Please log in again.';
        if (status === 404) message = 'Requested resource not found.';
    } else if (error.request) {
        message = 'No response received from server. Please try again.';
    } else if (error.message.includes('Network Error') || error.message.includes('CORS')) {
        message = 'Network or CORS error. Please check the server configuration.';
    }

    console.error('API Error:', message);
    return { isError: true, msg: message };
};

// Dynamic API Builder
const API = {};
for (const [key, value] of Object.entries(SERVICE_URLS)) {
    API[key] = (body, params, showUploadProgress) => {
        const url = formatURL(value.url, params || {});
        const options = {
            method: value.method.toLowerCase(),
            url,
            data: body,
            ...(showUploadProgress && {
                onUploadProgress: (progressEvent) => {
                    const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    console.log(`Upload Progress: ${progress}%`);
                },
            }),
        };

        return axiosInstance(options)
            .then(processResponse)
            .catch(processError);
    };
}

// New method to upload images
API.uploadImage = async (formData) => {
    return await axiosInstance.post('/file/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }).then(processResponse).catch(processError);
};

// Update your existing API methods as needed
API.getAllPosts = async ({ category }) => {
    return await axiosInstance.get(`/api/posts`, { params: { category } })
        .then(processResponse)
        .catch(processError);
};

API.getPostById = async (id) => {
    return await axiosInstance.get(`/api/post/${id}`)
        .then(processResponse)
        .catch(processError);
};

API.updatePost = async (post) => {
    return await axiosInstance.put(`/api/update/${post._id}`, post)
        .then(processResponse)
        .catch(processError);
};

API.deletePost = async (id) => {
    return await axiosInstance.delete(`/api/delete/${id}`)
        .then(processResponse)
        .catch(processError);
};

export { API };