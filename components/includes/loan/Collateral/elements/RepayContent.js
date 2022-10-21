import VerticalTable from '../../overview/elements/VerticalTable';
import { useSelector } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import { fetchRepaymentAccount } from '../../../../../services/components/loznZone/overview/fetchRepaymentAccount';
import { getToken } from '../../../../../services/user/accessToken';
import { message } from 'antd';
const RepayContent = ({ data }) => {
    const currentAccount = useSelector(store => store.user.currentAccount);
    const isMobile = useSelector(store => store.layout.isMobile);
    const [repaymentData, setRepaymentData] = useState({});
    const [detailData, setDetailData] = useState([]);
    useEffect(() => {
        getRepaymentAcc();
    }, [currentAccount]);

    useEffect(() => {
        const data = [
            {
                label: '銀行帳戶',
                value: (
                    <>
                        <p className="item__p" style={{ marginBottom: 0 }}>
                            {repaymentData.bankCode + repaymentData.bankName}
                            {' ' + repaymentData.bankBranch + repaymentData.bankBranchName}
                        </p>
                        <p className="item__p" style={{ marginBottom: 0 }}>
                            {repaymentData.bankAccount}
                        </p>
                    </>
                ),
                labelStyle: {
                    flex: '1.5 0 0',
                },
                valueStyle: {
                    flex: '3 0 0',
                },
            },
            {
                label: '戶名',
                value: repaymentData.accountName,
                labelStyle: {
                    flex: '1.5 0 0',
                },
                valueStyle: {
                    flex: '3 0 0',
                },
            },
            {
                label: '分公司電話',
                value: repaymentData.phone,
                labelStyle: {
                    flex: '1.5 0 0',
                },
                valueStyle: {
                    flex: '3 0 0',
                },
            },
        ];
        setDetailData(data);
    }, [repaymentData]);

    const getRepaymentAcc = async () => {
        try {
            if (currentAccount.broker_id != null) {
                const res = await fetchRepaymentAccount(getToken(), currentAccount.broker_id);
                setRepaymentData(res);
            }
        } catch (error) {
            message.error(error);
        }
    };

    return (
        <>
            <p style={{ marginBottom: '5px', color: '#0d1623' }}>
                1. 每筆借款期限為<span style={{ color: '#c13528' }}>6個月</span>
                ，到期可向分公司申請展延，或於借貸期間隨時申請還款。
            </p>
            <p style={{ marginBottom: '5px', color: '#0d1623' }}>2. 還款方式：</p>
            <div style={{ marginLeft: '30px', color: '#0d1623' }}>
                <p style={{ marginBottom: '5px' }}>
                    • <span style={{ fontWeight: 'bold' }}>賣股還款：</span>
                    透過線上或臨櫃交易賣出擔保品以償還該筆借款，扣除利息與相關費用並償還本金後，餘額將返還至您的交割帳戶。
                </p>
                <p>
                    • <span style={{ fontWeight: 'bold' }}>現金還款：</span>
                    請將還款金額轉帳或匯款至各分公司之償還帳戶，並
                    <span style={{ color: '#c13528' }}>去電至分公司(02)2349-5004</span>
                    進行還款指示，或以現金至臨櫃完成還款，還款費用以扣除利息與相關費用後再償還本金。
                </p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <VerticalTable
                    data={detailData}
                    style={{
                        flex: '3 0 0',
                    }}
                />
            </div>
            <p
                style={{
                    marginTop: '16px',
                    color: '#6c7b94',
                    marginBottom: 0,
                    display: isMobile ? 'none' : 'block',
                }}
            ></p>
        </>
    );
};

export default RepayContent;
