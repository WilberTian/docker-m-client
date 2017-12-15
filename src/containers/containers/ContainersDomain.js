import services from '../../services/containerService';

const domain = {

    model: {
        queryData: {
        },

        containerList: [],
        listLoading: true,
    },

    action: {
        getContainerList: async (queryData) => {
            domain.dispatch((model) => {
                return {
                    ...model,
                    listLoading: true
                };
            });

            const _queryData = { ...domain.getCurrentModel().queryData, ...queryData };
            const result = await services.getContainerList(_queryData);
            const data = result.data;

            domain.dispatch((model) => {
                return {
                    ...model,
                    containerList: data,
                    listLoading: false
                };
            });
        }
    }
};

export default domain;
