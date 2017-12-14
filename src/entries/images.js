import imagesPage from '../pages/images';

imagesPage();

if (module.hot) {
    module.hot.accept('../pages/images', () => {
        const _new = require('../pages/images').default;
        _new();
    });
}
