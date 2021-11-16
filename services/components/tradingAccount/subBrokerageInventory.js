import { getToken } from '../../user/accessToken';
import { getA8Instance } from '../../myAxios';

export const getSubBrokerageData = async function (id) {
    try{
        const url = '/SubBrokerage/QueryTradeData/Position';
        let data = {
            AID : id,
            token: getToken(),
        }
        // console.log('[REQ]',data)
        const res = await getA8Instance('v2', undefined, false).post(url,data)
        // console.log('[RES]',res)
        if (res.data?.success === true) {
            return dataSource || [];
        } else {
            return [];
        }
    } catch (error) {
        throw error;
    }

};
