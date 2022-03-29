export const getCurrentPath = () => {
    const pathName =
        window.location.pathname.slice(-1) === '/' ? window.location.pathname.slice(0, -1) : window.location.pathname;
    const lastPath = pathName.split('/').pop();
    const pathArr = pathName.split('/');
    const index = pathArr.findIndex(element => {
        return element === 'newweb';
    });
    let rPath = pathArr.slice(index + 1, pathArr.length);
    rPath = rPath.join('/') + location.search;

    if (process.env.NEXT_PUBLIC_SUBPATH === '/newweb') {
        return `/${lastPath === 'newweb' ? '' : rPath}`;
    } else {
        return `${rPath === '' ? '/' : rPath}`;
    }
};
