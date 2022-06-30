import { getA8StpInstance } from '../../../myAxios';
import moment from 'moment';
import { isArray } from 'lodash';
export const fetchApplyRecord = async function (token, branch, account) {
    try {
        console.log('applyRecord[req]', [branch, account]);
        const url = '/loan/api/applyRecord';
        const date = new Date();
        const res = await getA8StpInstance(false).get(url, {
            headers: { token: `${token}` },
            params: {
                branch,
                account,
                startDate: moment(date).add(-1, 'Y').format('YYYYMMDD'),
                endDate: moment(date).format('YYYYMMDD'),
            },
        });
        console.log('applyRecord[res]', res);
        if (res.data.success) {
            let d_ = res.data.result;
            d_.map((x, i) => {
                x.key = 'a' + i;
            });
            return d_;
        } else {
            return [];
        }
    } catch (error) {
        throw error;
    }
};

export const repaymentDetail = async function (token, branch, account, date) {
    try {
        const url = '/loan/api/repaymentDetail';
        const res = await getA8StpInstance(false).get(url, {
            headers: { token: `${token}` },
            params: {
                branch,
                account,
                applyDate: moment(date).format('YYYYMMDD'),
            },
        });
        console.log('repaymentDetail[req]', res);
        if (res.data.success) {
            return res.data.result;
        } else {
            return [];
        }
    } catch (error) {
        throw error;
    }
};

export const collateralDeatil = async function (token, branch, account, date) {
    try {
        const url = '/loan/api/collateralDeatil';
        const res = await getA8StpInstance(false).get(url, {
            headers: { token: `${token}` },
            params: {
                branch,
                account,
                applyDate: moment(date).format('YYYYMMDD'),
            },
        });
        if (res.data.success) {
            return res.data.result;
        } else {
            return [];
        }
    } catch (error) {
        throw error;
    }
};

export const applyStatus = async function (token, branch, account) {
    try {
        const url = '/loan/api/applyStatus';
        const date = new Date();
        const res = await getA8StpInstance(false).get(url, {
            headers: { token: `${token}` },
            params: {
                branch,
                account,
                startDate: moment(date).add(-1, 'Y').format('YYYYMMDD'),
                endDate: moment(date).format('YYYYMMDD'),
            },
        });
        console.log('[applyStatus]', res);
        if (res.data.success) {
            let d_ = res.data.result;
            d_.map((x, i) => {
                x.key = 'b' + i;
                x.name = 'Not Expandable';
            });
            return d_; //測試機是array 正式機待確認
        } else {
            return [];
        }
    } catch (error) {
        throw error;
    }
};

export const deleteApply = async function (token, branch, account, date) {
    try {
        const url = '/loan/api/apply';
        const res = await getA8StpInstance(false).delete(url, {
            headers: { token: `${token}` },
            params: {
                branch,
                account,
                applyDate: moment(date).format('YYYYMMDD'),
            },
        });
        if (res.data.success) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        throw error;
    }
};

export const getClose = async function (token) {
    //永豐金 2890
    try {
        const url = '/loan/api/checkGreenChannelStock';
        const res = await getA8StpInstance(false).get(url, {
            headers: { token: `${token}` },
            params: {
                stockId: 2890,
            },
        });
        if (res.data.success) {
            return res.data.result;
        } else {
            return false;
        }
    } catch (error) {
        throw error;
    }
};
