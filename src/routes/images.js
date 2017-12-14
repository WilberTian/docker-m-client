import App from '../containers/common/App';
import ImagesContainer from '../containers/images/ImagesContainer';

import NotFound from './NotFound';

import { imagesNav } from '../configs/NavSettings';

const notFountRoute = {
    path: '*',
    component: NotFound,
};

const route = {
    path: '/',
    component: App,
    indexRoute: {
        component: ImagesContainer,
    },
    childRoutes: [
        notFountRoute
    ],
    navStatus: imagesNav
};

export default route;
