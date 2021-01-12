export const accountGroupByType = objectArray => {
    return objectArray.reduce(
        function (acc, obj) {
            let key = obj.accttype;
            if (!acc[key]) {
                // acc[key] = [];
                // 排除台股、複委託、期權之外的帳號
                return acc;
            }
            acc[key].push(obj);
            return acc;
        },
        { S: [], H: [], F: [] },
    );
};

export const getAccountText = accType => {
    switch (accType) {
        case 'S':
            return '國內證券';
        case 'H':
            return '海外證券';
        case 'F':
            return '期權';
        default:
            return '其他';
    }
};
