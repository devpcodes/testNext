export const getToken = () => {
    const token = window.localStorage.getItem('newweb_token');
    return token || '';
};
