export const getParamFromQueryString = param => {
    const params = new URLSearchParams(window.location.search);
    if (params.has(param)) {
        return params.get(param);
    }
    return '';
};
