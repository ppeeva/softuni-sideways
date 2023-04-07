import * as request from './requester';

const baseUrl = 'http://localhost:3030/data/sideways';


export const getAll = async () => {
    const result = await request.get(`${baseUrl}/?sortBy=_createdOn%20desc`);
    const sideways = Object.values(result);

    return sideways;
};

export const getAllForUser = async (userId) => {
    const searchQuery = encodeURIComponent(`_ownerId="${userId}"`);

    const result = await request.get(`${baseUrl}/?where=${searchQuery}`);
    const createdByUser = Object.values(result);

    return createdByUser;
};

export const getOne = async (sidewayId) => {
    const result = await request.get(`${baseUrl}/${sidewayId}`);

    return result;
};

export const getCount = async () => {
    try {
        const result = await request.get(`${baseUrl}/?count`);
        if(typeof(result) !== "number"){
            return 0;
        }
        return result;
    }
    catch (error) {
        return 0;
    }
};

export const create = async (data, token) => {
    console.log(token);
    const result = await request.post(baseUrl, data, token);

    return result;
};

export const edit = (sidewayId, data, token) => request.put(`${baseUrl}/${sidewayId}`, data, token);

export const deleteSideway = (sidewayId, token) => request.del(`${baseUrl}/${sidewayId}`, null, token);
