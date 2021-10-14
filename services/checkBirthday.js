import { getA8Instance } from './myAxios';

export const checkBirthday = async function (token, birthday, modal = false) {
    try {
        const url = `/checkBirthday`;
        const res = await getA8Instance(undefined, undefined, modal).post(url, {
            token,
            birthday,
            domain: 'NewWeb',
        });
        console.log(res);
        if (res.data.success != null && res.data.success === 'True') {
            return res.data;
        } else {
            return {};
        }
    } catch (error) {
        return {};
    }
};
