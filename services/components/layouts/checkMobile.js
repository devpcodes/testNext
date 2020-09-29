import theme from '../../../resources/styles/theme';

export const checkMobile = function (winWidth) {
    if (winWidth <= theme.mobileBreakPoint) {
        return true;
    } else {
        return false;
    }
};
