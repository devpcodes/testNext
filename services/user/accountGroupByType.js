export const accountGroupByType = (objectArray) => {
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
        { S: [], H: [], F: [] }
    );
};
