import { requestFactory } from './requester';

const baseUrl = 'http://localhost:3030/data/sideways';

export const sidewayServiceFactory = (token) => {
    // console.log('sideway service token: ', token);
    const request = requestFactory(token);

    const getAll = async () => {
        const result = await request.get(`${baseUrl}/?sortBy=_createdOn%20desc`);
        const sideways = Object.values(result);

        return sideways;
    };

    const getOne = async (sidewayId) => {
        const result = await request.get(`${baseUrl}/${sidewayId}`);

        return result;
    };

    const getCount = async () => {
        try {
            const result = await request.get(`${baseUrl}/?count`);
            return result;
        }
        catch (error) {
            return 0;
        }
    };

    const create = async (data) => {
        const result = await request.post(baseUrl, data);

        // console.log(result);

        return result;
    };

    const addComment = async (sidewayId, data) => {
        const result = await request.post(`${baseUrl}/${sidewayId}/comments`, data);

        return result;
    };

    const edit = (sidewayId, data) => request.put(`${baseUrl}/${sidewayId}`, data);

    const deleteSideway = (sidewayId) => request.delete(`${baseUrl}/${sidewayId}`);

    return {
        getAll,
        getOne,
        getCount,
        create,
        edit,
        addComment,
        delete: deleteSideway,
    };
};