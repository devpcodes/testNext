export const checkTouchPrice = (price, touchPrice, close, bs) => {
    if (bs === 'B') {
        if (price >= touchPrice && touchPrice >= close) {
            return true;
        } else {
            return false;
        }
    } else {
        if (price <= touchPrice && touchPrice <= close) {
            return true;
        } else {
            return false;
        }
    }
};
