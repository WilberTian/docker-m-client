import React from 'react';
import { render } from 'react-dom';

import routes from '../routes/images';
import Root from '../containers/common/Root';

import './images.less';

export default () => {
    render(
        <Root routes={routes} />,
        document.getElementById('root')
    );
};
