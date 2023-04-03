import * as request from './requester';

const baseUrl = 'http://localhost:3030/data/comments';


export const create = async (sidewayId, comment, token) => {
    const result = await request.post(baseUrl, {sidewayId, comment}, token);

    return result;
};

export const getAll = async (sidewayId) => {
    const searchQuery = encodeURIComponent(`sidewayId="${sidewayId}"`);
    const relationQuery = encodeURIComponent(`author=_ownerId:users`);
    
    const result = await request.get(`${baseUrl}/?where=${searchQuery}&load=${relationQuery}`);
    const comments = Object.values(result);

    return comments;
};
