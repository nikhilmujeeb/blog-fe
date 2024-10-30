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
        message: "An error occurred while parsing request data"
    },
    responseFailure: {
        title: "Error!",
        message: "An error occurred while fetching response from server. Please try again"
    },
    networkError: {
        title: "Error!",
        message: "Unable to connect to the server. Please check internet connectivity and try again."
    }
};

// SERVICE URLS
export const SERVICE_URLS = {
    userLogin: { url: '/api/login', method: 'POST' },
    userSignup: { url: '/api/signup', method: 'POST' },
    getAllPosts: { url: '/posts', method: 'GET' },
    getPostById: { url: '/api/post/:id', method: 'GET' },
    createPost: { url: '/api/create', method: 'POST' },
    updatePost: { url: '/api/update/:id', method: 'PUT' },
    deletePost: { url: '/api/delete/:id', method: 'DELETE' },
    newComment: { url: '/api/comment/new', method: 'POST' },
    getAllComments: { url: '/api/comments/:postId', method: 'GET' },
    deleteComment: { url: '/api/comment/delete/:id', method: 'DELETE' },
    uploadFile: { url: '/api/file/upload', method: 'POST' },
    getRefreshToken: { url: '/api/token', method: 'POST' }
};
