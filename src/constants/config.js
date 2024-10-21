// API NOTIFICATION MESSAGES
export const API_NOTIFICATION_MESSAGES = {
    loading: {
        title: "Loading...",
        message: "Data is being loaded. Please wait",
    },
    success: {
        title: "Success",
        message: "Data successfully loaded",
    },
    requestFailure: {
        title: "Error!",
        message: "An error occurred while parsing request data",
    },
    responseFailure: {
        title: "Error!",
        message: "An error occurred while fetching response from the server. Please try again",
    },
    networkError: {
        title: "Error!",
        message: "Unable to connect to the server. Please check internet connectivity and try again.",
    },
};


// API SERVICE URLS
const BASE_URL = '/api'; // Define your base URL here

export const SERVICE_URLS = {
    userLogin: { url: `${BASE_URL}/login`, method: 'POST' },
    userSignup: { url: `${BASE_URL}/signup`, method: 'POST' },
    getAllPosts: { url: `${BASE_URL}/posts`, method: 'GET', params: true },
    getRefreshToken: { url: `${BASE_URL}/token`, method: 'POST' },
    uploadFile: { url: `${BASE_URL}/file/upload`, method: 'POST' },
    createPost: { url: `${BASE_URL}/create`, method: 'POST' },
    deletePost: { url: `${BASE_URL}/delete`, method: 'DELETE', query: true },
    getPostById: { url: `${BASE_URL}/post`, method: 'GET', query: true },
    newComment: { url: `${BASE_URL}/comment/new`, method: 'POST' },
    getAllComments: { url: `${BASE_URL}/comments`, method: 'GET', query: true },
    deleteComment: { url: `${BASE_URL}/comment/delete`, method: 'DELETE', query: true },
    updatePost: { url: `${BASE_URL}/update`, method: 'PUT', query: true },
};
