import { getA8StpInstance } from '../../myAxios';
import { Modal } from 'antd';

export const fetchQueryEarmarkReserveStatus = async ({ account, branch, token }) => {
    try {
        const url = `/stp/api/queryEarmarkReserveStatus`;
        // const baseUrl = 'https://servicerd.sinotrade.com.tw';
        const res = await getA8StpInstance(true).post(url, {
            token,
            branch,
            account,
        });
        console.log(res.data);
        if (res.data?.success === true) {
            // return res.data?.result?.unreal_sums?.unreal_sum ?? [];
            return res.data?.result;
        } else {
            var err = res.data.message || '伺服器錯誤';
            Modal.error({
                content: err,
            });
            throw err;
        }
    } catch (error) {
        // return '伺服器錯誤';
        Modal.error({
            title: '伺服器錯誤',
        });
        throw error;
    }
};
