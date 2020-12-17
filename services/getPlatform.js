import { getParamFromQueryString } from './getParamFromQueryString';

export const getPlatform = () => {
    const defaultVal = 'newweb';
    try {
        return (getParamFromQueryString('platform') || sessionStorage.getItem('platform') || defaultVal).toLowerCase();
    } catch (error) {
        // server render
        return defaultVal;
    }
};
