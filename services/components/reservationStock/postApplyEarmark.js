import { Modal } from 'antd';
import { getA8StpInstance } from '../../myAxios';

export const postApplyEarmark = async function (token, branch, account, symbol, qty, category, ca_content) {
    try {
        const url = '/stp/api/applyEarmark';
        // const baseUrl = 'https://servicerd.sinotrade.com.tw';
        const res = await getA8StpInstance(true).post(url, {
            token,
            branch,
            account,
            symbol,
            qty,
            category,
            ca_content,
        });
        if (res?.data?.success === true) {
            return res.data?.result || '';
        } else {
            var err = res.data.message || '伺服器錯誤';
            Modal.error({
                content: err,
                onOk() {
                    if (res?.data?.result?.isSignCustodialBookEntry === false) {
                        Modal.confirm({
                            content:
                                '抱歉，您必須簽署「保管劃撥帳戶契約書」後，才能繼續申請，是否前往線上簽署中心進行簽署？',
                            onOk() {
                                window.location = `${
                                    process.env.NEXT_PUBLIC_SERVICE_POSITIONS
                                }/sign3382/?TOKEN=${getToken()}`;
                            },
                            okText: '確認',
                            cancelText: '取消',
                        });
                    }
                },
            });
            return false;
        }
    } catch (error) {
        Modal.error({
            content: '伺服器錯誤',
            onOk() {},
        });
        return false;
    }
};
