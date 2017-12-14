import services from '../../services/containerService';

const domain = {

    model: {
        queryData: {
        },

        containerList: [],
        listLoading: true,

        pagination: {
            total: 0,
            pageIndex: 0,
            pageSize: 0
        }
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
                    containerList: data.rows,
                    listLoading: false,
                    pagination: {
                        total: data.total,
                        pageIndex: data.pageIndex,
                        pageSize: data.pageSize
                    }
                };
            });
        }
    }
};

export default domain;
