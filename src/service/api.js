import axios from 'axios';
import { API_NOTIFICATION_MESSAGES, SERVICE_URLS } from '../constants/config';
import { getAccessToken, getType } from '../utils/common-utils';

const API_URL = 'https://blog-be-3tvt.onrender.com';

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const { TYPE } = config;
        if (TYPE) {
            if (TYPE.params) config.params = TYPE.params;
            else if (TYPE.query) config.url += `/${TYPE.query}`;
        }
        config.headers.authorization = getAccessToken();
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => processResponse(response),
    (error) => Promise.reject(processError(error))
);

const processResponse = (response) => response.status === 200
    ? { isSuccess: true, data: response.data }
    : { isFailure: true, msg: response?.data?.msg || 'Failed!', code: response.status };

const processError = (error) => {
    const { response, request, message } = error;
    if (response) return { isError: true, msg: response.data?.msg || 'Failed!', code: response.status };
    if (request) return { isError: true, msg: 'Request failed!' };
    return { isError: true, msg: message || 'Network error' };
};

const API = {};
Object.entries(SERVICE_URLS).forEach(([key, value]) => {
    API[key] = (body, uploadProgress, downloadProgress) =>
        axiosInstance({
            method: value.method,
            url: value.url,
            data: value.method === 'DELETE' ? undefined : body,
            TYPE: getType(value, body),
            onUploadProgress: (e) => uploadProgress?.(Math.round((e.loaded * 100) / e.total)),
            onDownloadProgress: (e) => downloadProgress?.(Math.round((e.loaded * 100) / e.total)),
        });
});

export { API };
