import React, { PureComponent } from 'react';


import DomainComponentCreator from '../../utils/DomainComponentCreator';
import DomainMapper from '../../utils/DomainMapper';
import ImagesDomain from './ImagesDomain';

import FilterComponent from './components/FilterComponent';
import ImageListComponent from './components/ImageListComponent';

import './images-container.less';

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

@DomainComponentCreator(ImagesDomain)
@DomainMapper(mapper)
export default class ImagesContainer extends PureComponent {
    render() {
        return (
            <div className="images-container">
                <FilterComponent />
                <ImageListComponent />
            </div>
        );
    }
}
