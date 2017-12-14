import fetch from '../utils/fetch';
import requestPrefix from '../utils/requestPrefix';

const prefix = requestPrefix('URI_FOR_PROD_ENV');

export default {
    getContainerList: async () => {
        const request = {
            url: `${prefix}/containers`
        };

        const result = await fetch(request);
        return result;
    }
};
