import { Modal } from 'antd';
import { getA8StpInstance } from '../../myAxios';

export const PostApplyEarmarkReserve = async ({
    account,
    branch,
    symbol,
    order_qty,
    order_price,
    token,
    ca_content,
}) => {
    const url = '/stp/api/applyEarmarkReserve';
    try {
        const res = await getA8StpInstance(true).post(url, {
            account,
            branch,
            symbol,
            order_qty,
            order_price,
            token,
            ca_content,
        });
        console.log('res', res);
        if (res?.data?.success === true) {
            return res.data?.result || '';
        } else {
            var err = res.data.message || '伺服器錯誤';
            Modal.error({
                content: err,
            });
            throw err;
        }
    } catch (error) {
        console.log(error.message);
        throw error;
    }
};
