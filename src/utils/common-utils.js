// Get the access token from session storage
export const getAccessToken = () => {
    return sessionStorage.getItem('accessToken');
};

// Set the access token in session storage
export const setAccessToken = (accessToken) => {
    sessionStorage.setItem('accessToken', `Bearer ${accessToken}`);
};

// Get the refresh token from session storage
export const getRefreshToken = () => {
    return sessionStorage.getItem('refreshToken');
};

// Set the refresh token in session storage
export const setRefreshToken = (refreshToken) => {
    sessionStorage.setItem('refreshToken', refreshToken);
};

// Determine the type of request (params or query) based on the provided value
export const getType = (value, body) => {
    if (value.params) {
        return { params: body };
    } else if (value.query) {
        return { query: typeof body === 'object' ? body._id : body };
    }
    return {};
};

// Function to format URL by replacing placeholders with actual parameters
export const formatURL = (url, params) => {
    return Object.keys(params).reduce(
        (formattedUrl, key) => formattedUrl.replace(`:${key}`, params[key]),
        url
    );
};