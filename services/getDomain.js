import { getParamFromQueryString } from './getParamFromQueryString';

export const getDomain = () => {
    const defaultVal = 'newweb';
    try {
        const sourceFromQueryString = getParamFromQueryString('platform');
        const sourceFromSessionStorage = sessionStorage.getItem('platform') || sessionStorage.getItem('source');
        const source = (sourceFromQueryString || sourceFromSessionStorage || defaultVal).toLowerCase();
        let domain;

        switch (source) {
            case 'mma':
            case 'line':
                domain = source;
                break;
            default:
                domain = defaultVal;
                break;
        }

        return domain;
    } catch (error) {
        // server render
        return defaultVal;
    }
};
