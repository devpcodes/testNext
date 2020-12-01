export const getToken = () => {
    const token = window.localStorage.getItem('newweb_token');
    return token || '';
};

export const setToken = token => {
    return window.localStorage.setItem('newweb_token', token);
};

export const removeToken = () => {
    return window.localStorage.removeItem('newweb_token');
};
