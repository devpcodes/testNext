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

export const mappingCommissionedCodeTradingAcc = (ord_bs, ord_type2, market_id, ord_type1, sys_id) => {
    var ord_char = '';
    var bs_char = '';
    var word = '';
    switch (ord_bs) {
        case 'B':
            bs_char = '買';
            break;
        case 'S':
            bs_char = '賣';
            break;
    }
    if (market_id == 'R' || sys_id === '05') {
        ord_char = '興';
    } else if (ord_type1 === '2') {
        ord_char = '盤後零';
    } else if (ord_type1 === 'C') {
        ord_char = '盤中零';
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
                bs_char = '';
                ord_char = '';
        }
    }
    word = ord_char + bs_char;
    return word;
};

export const mappingWebId = webID => {
    const webIDList = {
        0: '現場單',
        10: '馬可波羅',
        101: 'iLeader(i)',
        102: 'iLeader(G)',
        103: 'iLeader',
        108: 'ＥＺ下單',
        109: 'MMA',
        11: 'BLOOMBERG 下單',
        110: '語音',
        111: 'ＡＰ下單[人工單]',
        113: '大戶投(g)',
        115: 'EZTrade',
        119: '雷影管理',
        12: '奇唯JF',
        121: '國泰世華(台開API下單)',
        122: '好神通PLUS',
        124: 'MMA',
        125: '籌碼K線',
        127: 'iLeader(PDA)',
        128: 'Line',
        129: 'new web',
        13: '奇唯法人',
        134: 'iLeader(iPad)',
        136: '凱衛HTS',
        137: 'iWow',
        139: '中華電信MOD',
        140: '股金寶',
        141: 'iLeader(W)',
        143: 'iLeader(GPad)',
        144: 'XQ',
        145: 'QTrade',
        146: '大戶投(i)',
        148: '觸價幫手',
        149: '倚天股票機',
        150: 'eLeader',
        151: '新致富快手',
        152: 'API',
        155: 'CTS',
        16: 'JPMF怡富',
        160: '股市大亨',
        161: '微股力',
        162: 'XQ全球贏家APP',
        163: '股感',
        164: 'cnYES',
        17: 'ＭＩＮＥ ＢＲＯＫＥＲ --- 人工',
        170: 'BTS',
        18: 'NYSE 下單',
        19: '凱衛---人工',
        2: '投信下單(精業Mini-Broker)',
        20: '凱衛---ＤＭＡ',
        21: 'ＦＩＤＥＳＳＡ',
        22: 'ＴＲＡＤＥ　ＷＥＢ',
        29: 'BLUE BOX',
        33: '網路贏家',
        777: '強制下單',
        9: 'PINK BOX',
        TTT: '自營下單',
        WXX: '拆單[電子單]',
        'e快客(55)': '055',
        'e快客(56)': '056',
        111: 'MORE',
        158: '經濟日報',
        165: '網龍條件單',
    };
    return webIDList[webID];
};

export const mappingIspreOrder = function (orderNumber) {
    var returnCode = '';
    if (orderNumber == '' || orderNumber == '00000') {
        returnCode = 'Y';
    } else {
        returnCode = 'N';
    }
    return returnCode;
};

export const padLeft = function (str, lenght) {
    if (str != undefined && str != '') {
        str = str.toString();
    }
    if (str.length >= lenght) return str;
    else return padLeft('0' + str, lenght);
};

export const mappingPriceMsg = function (price, type, flag, ord_type1) {
    if (ord_type1 === 'P') {
        return '定盤';
    }
    if (flag == 1) {
        return '市價';
    } else if (type == 1) {
        return '平盤';
    } else if (type == 2) {
        return '漲停';
    } else if (type == 3) {
        return '跌停';
    } else {
        return price;
    }
};

export const checkPriceUpdate = function (flag, ord_type1, market_id) {
    // 檢查市價
    if (flag === '1' || flag == null) {
        return false;
    }
    // 檢查盤後零股 / 盤中零股 / 定盤
    if (ord_type1 === '2' || ord_type1 === 'C' || ord_type1 === 'P') {
        return false;
    }
    //TODO 暫時拿掉興櫃改價功能
    if (market_id === 'R') {
        return false;
    }
    return true;
};
