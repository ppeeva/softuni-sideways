import * as request from './requester';

const baseUrl = 'http://localhost:3030/data/favs';


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


export const deleteFav = (favId, token) => {
    request.del(`${baseUrl}/${favId}`, null, token);
}

export const getAllForUser = async (userId) => {
    const searchQuery = encodeURIComponent(`_ownerId="${userId}"`);
    const relationQuery = encodeURIComponent(`sideway=sidewayId:sideways`);

    const result = await request.get(`${baseUrl}/?where=${searchQuery}&load=${relationQuery}`);
    const favs = Object.values(result);

    return favs;
};


