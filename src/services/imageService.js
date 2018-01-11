import fetch from '../utils/fetch';
import requestPrefix from '../utils/requestPrefix';

const prefix = requestPrefix('URI_FOR_PROD_ENV');

export default {
    getImageList: async () => {
        const request = {
            url: `${prefix}/images`
        };

        const result = await fetch(request);
        return result;
    },

    deleteImage: async (imageId) => {
        const request = {
            url: `${prefix}/images/${imageId}/delete`,
            method: 'POST'
        };

        const result = await fetch(request);
        return result;
    }
};
