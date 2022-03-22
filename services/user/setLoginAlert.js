import { getA8Instance } from '../myAxios';

export const setLoginAlertSettings = async function (isEnabled, token, modal = true) {
    try {
        const url = `/setLoginAlertSettings`;
        const res = await getA8Instance(undefined, undefined, modal).post(url, {
            isEnabled,
            token,
        });
        return res.data.result;
    } catch (error) {
        console.log(error);
        return {};
    }
};
