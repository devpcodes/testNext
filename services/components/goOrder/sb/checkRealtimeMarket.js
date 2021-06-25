export const checkRealtimeMarket = market => {
    if (market === 'US' || market === 'HKR' || market === 'SEHK') {
        return true;
    } else {
        return false;
    }
};
