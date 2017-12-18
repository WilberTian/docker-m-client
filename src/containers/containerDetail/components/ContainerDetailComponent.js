import React, { PureComponent } from 'react';
import { message, Spin, Table, Button } from 'antd';

import DomainMapper from '../../../utils/DomainMapper';

import './container-detail-component.less';

const mapper = {
    modelMapper: (model) => {
        return {
            containerList: model.containerList,
            loading: model.loading
        };
    },
    actionMapper: (action) => {
        return {
            getContainerDetail: action.getContainerDetail
        };
    }
};

@DomainMapper(mapper)
export default class ContainerDetailComponent extends PureComponent {
    componentWillMount() {
        this._getContainerDetail();
    }

    async _getContainerDetail() {
        const { getContainerDetail } = this.props;

        try {
            await getContainerDetail();
        } catch (ex) {
            message.error(ex.message);
        }
    }
    render() {
        const { containerList, loading } = this.props;

        return (
            <Spin spinning={loading}>
                <div className="container-detail-component">
                    <Table columns={columns} dataSource={containerList} size="middle" rowKey="Id" />
                </div>
            </Spin>
        );
    }
}
