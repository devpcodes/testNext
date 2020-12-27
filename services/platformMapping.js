export const platformMapping = platform => {
    let obj = {};
    switch (platform) {
        case 'udn':
            obj.platform = 'udn';
            obj.source = 'udn';
            break;
        default:
            break;
    }
    return obj;
};
