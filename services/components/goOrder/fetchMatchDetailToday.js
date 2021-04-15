import { getA8Instance } from '../../myAxios';
//={action: "account",currency:'',ord_type1:'',ord_type2:'',}
export const fetchMatchDetailToday = async function ({
    account,
    broker_id,
    currency,
    ord_type1,
    ord_type2,
    token,
    stock_id,
}) {
    const url = `/Equity/MatchDetailToday`;
    try {
        const res = await await getA8Instance('v1', undefined, true).post(url, {
            account,
            broker_id,
            currency,
            ord_type1,
            ord_type2,
            token,
            stock_id,
        });
        if (res.data.success === 'True') {
            if (Array.isArray(res.data.result.data)) {
                return res.data.result.data;
            } else {
                return [];
            }
        } else {
            return [];
        }
    } catch (error) {
        return error;
    }
};
