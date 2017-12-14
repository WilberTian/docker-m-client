import containersPage from '../pages/containers';

containersPage();

if (module.hot) {
    module.hot.accept('../pages/containers', () => {
        const _new = require('../pages/containers').default;
        _new();
    });
}
