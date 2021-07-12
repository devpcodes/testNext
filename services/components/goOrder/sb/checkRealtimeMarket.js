export const checkRealtimeMarket = market => {
    if (market === 'US' || market === 'SEHK') {
        return true;
    } else {
        return false;
    }
};
