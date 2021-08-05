export const platformMapping = platform => {
    let obj = {};
    switch (platform) {
        case 'udn':
            obj.platform = 'udn';
            obj.source = 'udn';
            break;
        case 'alpha':
            obj.platform = 'alpha';
            obj.source = 'alpha';
            break;
        default:
            break;
    }
    return obj;
};
