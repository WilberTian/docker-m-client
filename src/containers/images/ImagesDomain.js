import services from '../../services/imageService';

const domain = {

    model: {
        queryData: {
        },

        imageList: [],
        listLoading: true,
    },

    action: {
        getImageList: async (queryData) => {
            domain.dispatch((model) => {
                return {
                    ...model,
                    listLoading: true
                };
            });

            const _queryData = { ...domain.getCurrentModel().queryData, ...queryData };
            const result = await services.getImageList(_queryData);
            const data = result.data;

            domain.dispatch((model) => {
                return {
                    ...model,
                    imageList: data,
                    listLoading: false
                };
            });
        }
    }
};

export default domain;
