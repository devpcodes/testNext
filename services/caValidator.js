import { getA8Instance } from './myAxios';

export const caValidator = async function (token, ca_content, modal = true) {
    try {
        const url = `/CAvalidator`;
        const res = await getA8Instance(undefined, undefined, modal).post(url, {
            token,
            txn_code: 'newweb',
            ca_content,
        });
        if (res.data.success != null && res.data.success === 'True') {
            return res.data.result;
        } else {
            return [];
        }
    } catch (error) {
        console.log(error);
        return {};
    }
};
