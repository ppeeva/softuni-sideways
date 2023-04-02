import * as request from './requester';

const baseUrl = 'http://localhost:3030/users';

export const authServiceFactory = (token) => {
    return {
        login: (data) => request.post(`${baseUrl}/login`, data),
        register: (data) => request.post(`${baseUrl}/register`, data),
        logout: () => request.get(`${baseUrl}/logout`, null, token),
    };
};
