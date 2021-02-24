export const mappingStatusMsg = function (type) {
    var mappingObj = {
        ' ': ' ',
        0: '委託成功',
        1: '委託失敗',
        2: '完全成交',
        3: '部分成交',
        4: '已刪單',
        5: '改量成功',
        6: '委託預約中',
        7: '傳送中',
    };
    return mappingObj[type];
};

export const mappingShowChangeBtn = function (type) {
    var mappingObj = {
        ' ': false,
        0: true,
        1: false,
        2: false,
        3: true,
        4: false,
        5: true,
        6: true,
        7: false,
    };
    return mappingObj[type];
};

export const mappingCommissionedCode = (ord_type2, market_id, ord_type1, sys_id) => {
    let ord_char = '';
    let word = '';
    if (market_id == 'R' || sys_id === '05') {
        ord_char = '興';
    } else if (ord_type1 === '2') {
        ord_char = '零'; //盤後零
    } else if (ord_type1 === 'C') {
        ord_char = '零'; //盤中零
    } else {
        switch (ord_type2) {
            case '0':
                ord_char = '現';
                break;
            case '1':
            case '3':
                ord_char = '資';
                break;
            case '2':
            case '4':
                ord_char = '券';
                break;
            default:
                ord_char = '';
        }
    }
    word = ord_char;
    return word;
};
