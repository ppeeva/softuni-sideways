import * as request from './requester';

const baseUrl = 'http://localhost:3030/data/visits';


export const getOneForUserAndSideway = async (sidewayId, userId) => {
    const ownerQuery = encodeURIComponent(`_ownerId="${userId}" and sidewayId="${sidewayId}"`);

    const result = await request.get(`${baseUrl}/?where=${ownerQuery}`);
    if(result && result.length){
        return result[0];
    }
    return {};
};

export const create = async (sidewayId, token) => {
    const result = await request.post(baseUrl, { sidewayId }, token);

    return result;
};


export const deleteVisit = (visitId, token) => {
    request.del(`${baseUrl}/${visitId}`, null, token);
}

export const getAllForUser = async (userId) => {
    const searchQuery = encodeURIComponent(`_ownerId="${userId}"`);
    const relationQuery = encodeURIComponent(`sideway=sidewayId:sideways`);

    const result = await request.get(`${baseUrl}/?where=${searchQuery}&load=${relationQuery}`);
    const visits = Object.values(result);

    return visits;
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

