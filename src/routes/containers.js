import App from '../containers/common/App';
import ContainersContainer from '../containers/containers/ContainersContainer';

import NotFound from './NotFound';

import { containersNav } from '../configs/NavSettings';

const notFountRoute = {
    path: '*',
    component: NotFound,
};

const route = {
    path: '/',
    component: App,
    indexRoute: {
        component: ContainersContainer,
    },
    childRoutes: [
        notFountRoute
    ],
    navStatus: containersNav
};

export default route;
