import React, { PureComponent } from 'react';
import { Tag, Button } from 'antd';


import DomainMapper from '../../../utils/DomainMapper';

import './filter-component.less';

const { CheckableTag } = Tag;

const mapper = {
    modelMapper: (model) => {
        return {
            queryData: model.queryData
        };
    },
    actionMapper: (action) => {
        return {
            updateQueryData: action.updateQueryData,
            clearQueryData: action.clearQueryData,
            getContainerList: action.getContainerList
        };
    }
};

@DomainMapper(mapper)
export default class FilterComponent extends PureComponent {
    _handleStatusChange(tag, checked) {
        const { updateQueryData, queryData } = this.props;

        const { status } = queryData;
        const nextSelectedStatus = checked ?
            [...status, tag] :
            status.filter((t) => { return t !== tag; });

        updateQueryData({ status: nextSelectedStatus });
    }

    render() {
        const { queryData } = this.props;
        const statusList = ['creatd', 'restarting', 'running', 'paused', 'exited', 'dead'];

        return (
            <div className="filter-component">
                <div className="form-group status-filter">
                    <span className="form-label">Status：</span>
                    <div className="form-input">
                        {statusList.map((status, idx) => {
                            return (
                                <CheckableTag
                                  key={idx}
                                  checked={queryData.status.indexOf(status) > -1}
                                  onChange={(checked) => {
                                      this._handleStatusChange(status, checked);
                                  }}
                                >
                                    {status}
                                </CheckableTag>
                            );
                        })}
                    </div>
                </div>

                <div className="form-group-button">
                    <Button type="primary" onClick={() => {
                        this.props.getContainerList();
                    }}
                    >
                        查询
                    </Button>
                    <Button onClick={() => {
                        this.props.clearQueryData();
                    }}
                    >
                        重置
                    </Button>
                </div>
            </div>
        );
    }
}
