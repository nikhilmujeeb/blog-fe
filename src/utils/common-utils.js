// Get the access token from session storage
export const getAccessToken = () => {
    return sessionStorage.getItem('accessToken');
}

// Get the refresh token from session storage
export const getRefreshToken = () => {
    return sessionStorage.getItem('refreshToken');
}

// Set the access token in session storage
export const setAccessToken = (accessToken) => {
    sessionStorage.setItem('accessToken', `Bearer ${accessToken}`);
}

// Set the refresh token in session storage
export const setRefreshToken = (refreshToken) => {
    sessionStorage.setItem('refreshToken', refreshToken); // No need for 'Bearer' in refresh token
}

// Determine the type of request (params or query) based on the provided value
export const getType = (value, body) => {
    if (value.params) {
        return { params: body }; // If parameters are needed
    } else if (value.query) {
        return { query: typeof body === 'object' ? body._id : body }; // Handle object or primitive body
    }
    return {}; // Return empty object if no type is matched
}
