import { getStInstance } from '../../myAxios';

export const postBankAccountBalance = async function ({ token, broker_id, account }) {
    try {
        const reqUrl = '/BankAccountBalance';
        const data = getFormData({ token, broker_id, account });
        const res = await getStInstance().post(reqUrl, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        if (res.data.success != null && res.data.success === true) {
            return res.data.result;
        } else {
            throw '伺服器錯誤';
        }
    } catch (error) {
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
