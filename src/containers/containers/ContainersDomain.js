import services from '../../services/containerService';

const domain = {

    model: {
        queryData: {
            status: []
        },

        containerList: [],
        listLoading: true,
    },

    action: {
        updateQueryData: (data) => {
            domain.dispatch((model) => {
                const temp = Object.assign({}, model.queryData, data);
                return {
                    ...model,
                    queryData: temp
                };
            });
        },

        clearQueryData: () => {
            domain.dispatch((model) => {
                return {
                    ...model,
                    queryData: domain.model.queryData
                };
            });
        },

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
