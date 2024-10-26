// API NOTIFICATION MESSAGES
export const API_NOTIFICATION_MESSAGES = {
    loading: {
        title: "Loading...",
        message: "Data is being loaded. Please wait"
    },
    success: {
        title: "Success",
        message: "Data successfully loaded"
    },
    requestFailure: {
        title: "Error!",
        message: "An error occur while parsing request data"
    },
    responseFailure: {
        title: "Error!",
        message: "An error occur while fetching response from server. Please try again"
    },
    networkError: {
        title: "Error!",
        message: "Unable to connect to the server. Please check internet connectivity and try again."
    }
}

export const SERVICE_URLS = {
    userLogin: { url: '/api/login', method: 'POST' },
    userSignup: { url: '/api/signup', method: 'POST' },
    getAllPosts: { url: '/posts', method: 'GET', params: true },
    getRefreshToken: { url: '/api/token', method: 'POST' },
    uploadFile: { url: '/api/file/upload', method: 'POST' },
    createPost: { url: '/api/create', method: 'POST' },
    deletePost: { url: '/api/delete', method: 'DELETE', query: true },
    getPostById: { url: '/api/post', method: 'GET', query: true },
    newComment: { url: '/api/comment/new', method: 'POST' },
    getAllComments: { url: '/api/comments', method: 'GET', query: true },
    deleteComment: { url: '/api/comment/delete', method: 'DELETE', query: true },
    updatePost: { url: '/api/update', method: 'PUT', query: true }
};
