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
};
