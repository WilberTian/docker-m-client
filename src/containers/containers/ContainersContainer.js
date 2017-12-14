import React, { PureComponent } from 'react';


import DomainComponentCreator from '../../utils/DomainComponentCreator';
import DomainMapper from '../../utils/DomainMapper';
import ContainersDomain from './ContainersDomain';

import FilterComponent from './components/FilterComponent';
import ContainerListComponent from './components/ContainerListComponent';

import './containers-container.less';

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

@DomainComponentCreator(ContainersDomain)
@DomainMapper(mapper)
export default class ContainersContainer extends PureComponent {
    render() {
        return (
            <div className="containers-container">
                <FilterComponent />
                <ContainerListComponent />
            </div>
        );
    }
}
