import fetch from '../utils/fetch';
import requestPrefix from '../utils/requestPrefix';

const prefix = requestPrefix('URI_FOR_PROD_ENV');

export default {
    getContainerList: async (queryData) => {
        const request = {
            url: `${prefix}/containers`,
            data: {
                all: 1,
                filters: JSON.stringify(queryData)
            }
        };

        const result = await fetch(request);
        return result;
    },

    getContainerDetail: async (containerId) => {
        const request = {
            url: `${prefix}/containers/${containerId}`
        };

        const result = await fetch(request);
        return result;
    }
};
