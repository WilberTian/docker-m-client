import React, { PureComponent } from 'react';


import DomainComponentCreator from '../../utils/DomainComponentCreator';
import DomainMapper from '../../utils/DomainMapper';
import ContainerDetailDomain from './ContainerDetailDomain';

import ContainerDetailComponent from './components/ContainerDetailComponent';

import './container-detail-container.less';

const mapper = {
    modelMapper: (model) => {
        return {
            pagination: model.pagination
        };
    },
    actionMapper: (action) => {
        return {
            queryLaunchInfoList: action.queryLaunchInfoList
        };
    }
};

@DomainComponentCreator(ContainerDetailDomain)
@DomainMapper(mapper)
export default class ContainerDetailContainer extends PureComponent {
    render() {
        return (
            <div className="container-detail-container.less">
                <ContainerDetailComponent />
            </div>
        );
    }
}
