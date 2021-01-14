export const getCurrentPath = () => {
    const pathName =
        window.location.pathname.slice(-1) === '/' ? window.location.pathname.slice(0, -1) : window.location.pathname;
    const lastPath = pathName.split('/').pop();
    return `/${lastPath === 'newweb' ? '' : lastPath}`;
};
