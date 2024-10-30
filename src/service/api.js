import axios from 'axios';
import { API_NOTIFICATION_MESSAGES, SERVICE_URLS } from '../constants/config';
import { getAccessToken, formatURL } from '../utils/common-utils';

// Define API base URL
const API_URL = process.env.REACT_APP_API_URL || 'https://blog-be-3tvt.onrender.com';

// Create axios instance with default settings
const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 30000, // Set timeout to 30 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Adds Authorization Header to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error) // Reject promise if there's an error
);

// Response handler: Checks and returns response data
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

// Error handler: Handles various types of errors (Network, 4xx, 5xx, etc.)
const processError = (error) => {
  let message = API_NOTIFICATION_MESSAGES.networkError.message;

  if (error.response) {
    const { status, data } = error.response;
    message = data?.msg || `Error: ${status}`;
    if (status === 403) message = 'Session expired. Please log in again.';
  } else if (error.request) {
    message = API_NOTIFICATION_MESSAGES.networkError.message;
  }

  console.error('API Error:', message);
  return { isError: true, msg: message };
};

// Dynamic API Builder: Generates API functions for all routes in SERVICE_URLS
const API = {};
for (const [key, value] of Object.entries(SERVICE_URLS)) {
  API[key] = (body, params, showUploadProgress) => {
    const url = formatURL(value.url, params || {});
    const options = {
      method: value.method.toLowerCase(),
      url,
      data: body,
      ...(showUploadProgress && {
        onUploadProgress: (progressEvent) => console.log('Upload Progress:', progressEvent),
      }),
    };

    return axiosInstance(options).then(processResponse).catch(processError);
  };
}

export { API };
