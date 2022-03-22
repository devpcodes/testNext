import { getA8Instance } from './../myAxios';

export const getLoginAlertSettings = async function (token, modal = true) {
    try {
        const url = `/getLoginAlertSettings`;
        const res = await getA8Instance(undefined, undefined, modal).post(url, {
            token,
        });
        return res.data.result;
    } catch (error) {
        console.log(error);
        return {};
    }
};
