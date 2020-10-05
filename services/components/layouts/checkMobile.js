import theme from '../../../resources/styles/theme';

export const checkMobile = function () {
    const mq = window.matchMedia(`(max-width: ${theme.mobileBreakPoint}px)`);
    if (mq.matches) {
        return true;
    } else {
        return false;
    }
};
