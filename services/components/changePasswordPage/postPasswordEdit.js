import { getStInstance } from '../../myAxios';

export const postPasswordEdit = async function (token, user_id, newPwd, oldPwd) {
    var url = `/password/edit`;
    var bodyFormData = new FormData();
    bodyFormData.append('token', token);
    bodyFormData.append('user_id', user_id);
    bodyFormData.append('newPwd', newPwd);
    bodyFormData.append('oldPwd', oldPwd);
    try {
        const res = await getStInstance(
            'v1',
            true,
        )({
            method: 'post',
            url,
            data: bodyFormData,
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        if (res.data.success === 'True') {
            return '密碼修改成功，請重新登入系統。';
        } else if (res.data.success == 'False') {
            const msg = res.data.result?.detail || res.data.result?.msg || res.data.result?.message || '伺服器錯誤';
            throw msg;
        }
    } catch (error) {
        const msg =
            error.response.data.result?.detail ||
            error.response.data.result?.msg ||
            error.response.data.result?.message ||
            '伺服器錯誤';
        throw msg;
    }
};
