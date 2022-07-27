import { getStInstance } from '../../myAxios';

export const postBankAccountBalance = async function ({ token, broker_id, account }) {
    let mockData = {
        success: 'True',
        result: {
            bankactno: '11201800505375',
            status: 0,
            balance: [
                { datacount: 0, currency: 'TWD', name: '台幣', amt: 20565.0 },
                { datacount: 1, currency: 'USD', name: '美元', amt: 0.0 },
                { datacount: 2, currency: 'JPY', name: '日幣', amt: 0.0 },
                { datacount: 3, currency: 'HKD', name: '港幣', amt: 0.0 },
                { datacount: 4, currency: 'EUR', name: '歐元', amt: 0.0 },
                { datacount: 5, currency: 'CNY', name: '人民幣', amt: 0.0 },
                { datacount: 6, currency: 'ZAR', name: '南非幣', amt: 0.0 },
                { datacount: 7, currency: 'GBP', name: '英鎊', amt: 0.0 },
                { datacount: 8, currency: 'NZD', name: '紐西蘭幣', amt: 0.0 },
                { datacount: 9, currency: 'AUD', name: '澳幣', amt: 0.0 },
            ],
            totalcount: 10,
            queryTime: '2022-05-17 08:31:26.965691',
        },
    };
    try {
        const reqUrl = '/BankAccountBalance';
        const data = getFormData({ token, broker_id, account });
        const res = await getStInstance().post(reqUrl, data, {
            // headers: {
            //     'Content-Type': 'application/x-www-form-urlencoded',
            // },
        });
        // res.data = mockData;
        if (res.data.success != null && res.data.success === 'True') {
            return res.data.result;
        } else {
            throw '伺服器錯誤';
        }
    } catch (error) {
        // return mockData.result;
        throw '伺服器錯誤';
    }
};

const getFormData = function ({ token, broker_id, account }) {
    const formData = new FormData();
    formData.append('token', token);
    formData.append('broker_id', broker_id);
    formData.append('account', account);
    console.log('formData', formData);
    return formData;
};
