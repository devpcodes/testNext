import { getA8Instance } from '../../../myAxios';
export const postMatchWithSwr = async (strObj, type) => {
    if (strObj == 'null') return;
    return await postMatch(JSON.parse(strObj), type);
};
export const postMatch = async ({ AID, orderID, orderNo, sort, token }, type) => {
    console.log('aaaa', AID, orderID, orderNo, sort, token);
    try {
        var url = '/SubBrokerage/QueryTradeData/Match';
        const res = await getA8Instance('v1', undefined, true).post(url, {
            AID,
            orderID,
            orderNo,
            sort,
            token,
        });
        if (res.data.success === 'True') {
            //此API，只有一筆它給obj，2筆以上變陣列...
            const arr = [];
            if (res.data.result?.Data?.Row) {
                if (!Array.isArray(res.data.result?.Data?.Row)) {
                    arr.push(res.data.result?.Data?.Row);
                    return keyHandler(arr);
                } else {
                    return keyHandler(res.data.result?.Data?.Row);
                }
            } else {
                return [];
            }
        } else {
            throw 'error';
        }
    } catch (error) {
        throw '伺服器錯誤';
    }
};

const keyHandler = data => {
    const output = [];
    for (const d of data) {
        const rtnData = {
            OID: d.hasOwnProperty('@OID') ? d['@OID'].trim() : null,
            AID: d.hasOwnProperty('@AID') ? d['@AID'].trim() : null,
            CID: d.hasOwnProperty('@CID') ? d['@CID'].trim() : null,
            CreateTime: d.hasOwnProperty('@CreateTime') ? d['@CreateTime'].trim() : null,
            Creator: d.hasOwnProperty('@Creator') ? d['@Creator'].trim() : null,
            SID: d.hasOwnProperty('@SID') ? d['@SID'].trim() : null,
            TDate: d.hasOwnProperty('@TDate') ? d['@TDate'].trim() : null,
            TT: d.hasOwnProperty('@TT') ? d['@TT'].trim() : null,
            OT: d.hasOwnProperty('@OT') ? d['@OT'].trim() : null,
            Closed: d.hasOwnProperty('@Closed') ? d['@Closed'].trim() : null,
            Session: d.hasOwnProperty('@Session') ? d['@Session'].trim() : null,
            UBID: d.hasOwnProperty('@UBID') ? d['@UBID'].trim() : null,
            BS: d.hasOwnProperty('@BS') ? d['@BS'].trim() : null,
            StockID: d.hasOwnProperty('@StockID') ? d['@StockID'].trim() : null,
            Qoriginal: d.hasOwnProperty('@Qoriginal') ? d['@Qoriginal'].trim() : null,
            Price: d.hasOwnProperty('@Price') ? d['@Price'].trim() : null,
            PriceType: d.hasOwnProperty('@PriceType') ? d['@PriceType'].trim() : null,
            OrderNo: d.hasOwnProperty('@OrderNo') ? d['@OrderNo'].trim() : null,
            Qcurrent: d.hasOwnProperty('@Qcurrent') ? d['@Qcurrent'].trim() : null,
            Qnext: d.hasOwnProperty('@Qnext') ? d['@Qnext'].trim() : null,
            Qmatched: d.hasOwnProperty('@Qmatched') ? d['@Qmatched'].trim() : null,
            DeliverTime: d.hasOwnProperty('@DeliverTime') ? d['@DeliverTime'].trim() : null,
            HostSendTime: d.hasOwnProperty('@HostSendTime') ? d['@HostSendTime'].trim() : null,
            ConfirmTime: d.hasOwnProperty('@ConfirmTime') ? d['@ConfirmTime'].trim() : null,
            Code: d.hasOwnProperty('@Code') ? d['@Code'].trim() : null,
            SortKey: d.hasOwnProperty('@SortKey') ? d['@SortKey'].trim() : null,
            State: d.hasOwnProperty('@State') ? d['@State'].trim() : null,
            ClientIP: d.hasOwnProperty('@ClientIP') ? d['@ClientIP'].trim() : null,
            CodeMsg: d.hasOwnProperty('@CodeMsg') ? d['@CodeMsg'].trim() : null,
            Source: d.hasOwnProperty('@Source') ? d['@Source'].trim() : null,
            Currency: d.hasOwnProperty('@Currency') ? d['@Currency'].trim() : null,
            LastStatus: d.hasOwnProperty('@LastStatus') ? d['@LastStatus'].trim() : null,
            AvgPrice: d.hasOwnProperty('@AvgPrice') ? d['@AvgPrice'].trim() : null,
            Poid: d.hasOwnProperty('@Poid') ? d['@Poid'].trim() : null,
            IsPreOrder: d.hasOwnProperty('@IsPreOrder') ? d['@IsPreOrder'].trim() : null,
            GtcDate: d.hasOwnProperty('@GtcDate') ? d['@GtcDate'].trim() : null,
            CanCancel: d.hasOwnProperty('@CanCancel') ? d['@CanCancel'].trim() : null,
            CanModify: d.hasOwnProperty('@CanModify') ? d['@CanModify'].trim() : null,
            StateMesg: d.hasOwnProperty('@StateMesg') ? d['@StateMesg'].trim() : null,
            TouchedPrice: d.hasOwnProperty('@TouchedPrice') ? d['@TouchedPrice'].trim() : null,
            Fee: d.hasOwnProperty('@Fee') ? d['@Fee'].trim() : null,
            MatchTime: d.hasOwnProperty('@MatchTime') ? d['@MatchTime'].trim() : null,
        };
        output.push(rtnData);
    }
    console.log('output......................', output);
    return output;
};
