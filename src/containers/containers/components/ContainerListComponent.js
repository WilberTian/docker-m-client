import React, { PureComponent } from 'react';
import { message, Spin, Table, Button } from 'antd';

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
            getContainerList: action.getContainerList,
            startContainer: action.startContainer,
            stopContainer: action.stopContainer,
            deleteContainer: action.deleteContainer
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

    async _startContainer(containerId) {
        const { startContainer, getContainerList } = this.props;

        try {
            await startContainer(containerId);
            await getContainerList();
        } catch (ex) {
            message.error(ex.message);
        }
    }

    async _stopContainer(containerId) {
        const { stopContainer, getContainerList } = this.props;

        try {
            await stopContainer(containerId);
            await getContainerList();
        } catch (ex) {
            message.error(ex.message);
        }
    }

    async _deleteContainer(containerId) {
        const { deleteContainer, getContainerList } = this.props;

        try {
            await deleteContainer(containerId);
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
            key: 'Id',
            render: (text, record) => {
                return (<span>{record.Id.substr(0, 12)}</span>);
            }
        }, {
            title: 'Names',
            dataIndex: 'Names',
            key: 'Names',
            render: (text, record) => {
                return (
                    <div>
                        {record.Names.map((name, idx) => {
                            return (
                                <div key={idx}>
                                    {name}
                                </div>
                            );
                        })}
                    </div>
                );
            }
        }, {
            title: 'Image',
            dataIndex: 'Image',
            key: 'Image'
        }, {
            title: 'Command',
            dataIndex: 'Command',
            key: 'Command'
        }, {
            title: 'Ports',
            dataIndex: 'Ports',
            key: 'Ports',
            render: (text, record) => {
                return (
                    <div>
                        {record.Ports.map((Port, idx) => {
                            const IP = Port.IP === '' ? '0.0.0.0' : Port.IP;
                            return (
                                <div key={idx}>
                                    {`${Port.Type}: ${IP}:${Port.PrivatePort} -> ${IP}:${Port.PublicPort}`}
                                </div>
                            );
                        })}
                    </div>
                );
            }
        }, {
            title: 'State',
            dataIndex: 'State',
            key: 'State'
        }, {
            title: 'Status',
            dataIndex: 'Status',
            key: 'Status'
        }, {
            title: 'Operations',
            key: 'Operations',
            render: (text, record) => {
                return (
                    <div className="container-operation-btn-group">
                        {record.State === 'running' && <div>
                            <Button
                              size="small"
                              type="danger"
                              onClick={() => {
                                  this._stopContainer(record.Id);
                              }}
                            >
                                Stop
                            </Button>
                        </div>}
                        {record.State === 'exited' && <div>
                            <Button
                              size="small"
                              type="primary"
                              onClick={() => {
                                  this._startContainer(record.Id);
                              }}
                            >
                                Start
                            </Button>
                            <Button
                              size="small"
                              type="danger"
                              onClick={() => {
                                  this._deleteContainer(record.Id);
                              }}
                            >
                                Delete
                            </Button>
                        </div>}
                    </div>
                );
            }
        }];

        return (
            <Spin spinning={listLoading}>
                <div className="container-list-component">
                    <Table columns={columns} dataSource={containerList} size="middle" rowKey="Id" />
                </div>
            </Spin>
        );
    }
}
