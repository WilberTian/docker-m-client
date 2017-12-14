import React, { PureComponent } from 'react';
import { message, Spin, Table } from 'antd';

import DomainMapper from '../../../utils/DomainMapper';

import './container-list-component.less';

const mapper = {
    modelMapper: (model) => {
        return {
            containerList: model.containerList,
            listLoading: model.listLoading
        };
    },
    actionMapper: (action) => {
        return {
            getContainerList: action.getContainerList
        };
    }
};

@DomainMapper(mapper)
export default class ContainerListComponent extends PureComponent {
    componentWillMount() {
        this._getContainerList();
    }

    async _getContainerList() {
        const { getContainerList } = this.props;

        try {
            await getContainerList();
        } catch (ex) {
            message.error(ex.message);
        }
    }
    render() {
        const { containerList, listLoading } = this.props;

        const columns = [{
            title: 'Id',
            dataIndex: 'Id',
            key: 'Id'
        }, {
            title: 'Names',
            dataIndex: 'Names',
            key: 'Names'
        }, {
            title: 'Image',
            dataIndex: 'Image',
            key: 'Image'
        }, {
            title: 'Command',
            dataIndex: 'Command',
            key: 'Command'
        }, {
            title: 'Port',
            dataIndex: 'Port',
            key: 'Port'
        }, {
            title: 'Status',
            dataIndex: 'Status',
            key: 'Status'
        }, {
            title: 'Operation',
            key: 'Operation'
        }];

        return (
            <Spin spinning={listLoading}>
                <div className="container-list-component">
                    <Table columns={columns} dataSource={containerList} pagination={false} rowKey="Id" />
                </div>
            </Spin>
        );
    }
}
