import services from '../../services/containerService';

const domain = {

    model: {
        containerDetail: {},
        loading: true
    },

    action: {
        getContainerDetail: async (queryData) => {
            domain.dispatch((model) => {
                return {
                    ...model,
                    loading: true
                };
            });

            const _queryData = { ...domain.getCurrentModel().queryData, ...queryData };
            const result = await services.getContainerDetail(_queryData);
            const data = result.data;

            domain.dispatch((model) => {
                return {
                    ...model,
                    containerDetail: data,
                    loading: false
                };
            });
        }
    }
};

export default domain;
