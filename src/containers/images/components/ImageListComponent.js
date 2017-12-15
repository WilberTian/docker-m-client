import React, { PureComponent } from 'react';
import { message, Spin, Table, Button } from 'antd';
import moment from 'moment';

import DomainMapper from '../../../utils/DomainMapper';

import bytesToSize from '../../../utils/bytesToSize';

import './image-list-component.less';

const mapper = {
    modelMapper: (model) => {
        return {
            imageList: model.imageList,
            listLoading: model.listLoading
        };
    },
    actionMapper: (action) => {
        return {
            getImageList: action.getImageList
        };
    }
};

@DomainMapper(mapper)
export default class ImageListComponent extends PureComponent {
    componentWillMount() {
        this._getImageList();
    }

    async _getImageList() {
        const { getImageList } = this.props;

        try {
            await getImageList();
        } catch (ex) {
            message.error(ex.message);
        }
    }
    render() {
        const { imageList, listLoading } = this.props;

        const columns = [{
            title: 'Id',
            dataIndex: 'Id',
            key: 'Id',
            render: (text, record) => {
                return (<span>{record.Id.substr(7, 12)}</span>);
            }
        }, {
            title: 'RepoTags',
            dataIndex: 'RepoTags',
            key: 'RepoTags',
            render: (text, record) => {
                return (
                    <div>
                        {record.RepoTags.map((repoTag, idx) => {
                            return (
                                <div key={idx}>
                                    {repoTag}
                                </div>
                            );
                        })}
                    </div>
                );
            }
        }, {
            title: 'Created',
            dataIndex: 'Created',
            key: 'Created',
            render: (text, record) => {
                return (
                    <div>
                        {moment.unix(record.Created).format('YYYY-MM-DD hh:mm:ss a')}
                    </div>
                );
            }
        }, {
            title: 'VirtualSize',
            dataIndex: 'VirtualSize',
            key: 'VirtualSize',
            render: (text, record) => {
                return (
                    <div>
                        {bytesToSize(record.VirtualSize)}
                    </div>
                );
            }
        }, {
            title: 'Operations',
            key: 'Operations',
            render: (text, record) => {
                return (
                    <div className="image-operation-btn-group">
                        <Button size="small" type="danger">Delete</Button>
                    </div>
                );
            }
        }];

        return (
            <Spin spinning={listLoading}>
                <div className="image-list-component">
                    <Table columns={columns} dataSource={imageList} size="middle" rowKey="Id" />
                </div>
            </Spin>
        );
    }
}
