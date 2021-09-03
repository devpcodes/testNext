import { useEffect, useMemo, useState } from 'react';
import { Modal, Select, Button, Input } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import useSWR from 'swr';
import {
    postAccBalanceWithSwr,
    postBankBalance,
    postWithdrawApply,
} from '../../../../../../services/components/goOrder/sb/postInventory';
import { setBalanceData } from '../../../../../../store/accBalance/action';
import { secretToggle } from '../../../../../../services/components/goOrder/sb/secretToggle';
import { getToken } from '../../../../../../services/user/accessToken';
import { usePlatform } from '../../../../../../hooks/usePlatform';
import AccountTable from '../../../vipInventory/AccountTable';
import IconBtn from '../../../vipInventory/IconBtn';
import { setSBAccountBalance } from '../../../../../../store/sb/action';
const AccBalance = () => {
    const currentAccount = useSelector(store => store.user.currentAccount);
    const accBalanceData = useSelector(store => store.accBalance.bankData);
    const platform = usePlatform();
    const [accountType, setAccountType] = useState('');
    const [inputData, setInputData] = useState(null);
    const [settleType, setSettleType] = useState('');
    const [currency, setCurrency] = useState('');
    const [hidden, setHidden] = useState(true);
    const [dataSource, setDataSource] = useState({
        amount: '',
        balance: '',
        buyingPower: '',
        currency: '',
        t_1: '',
        t_2: '',
    });
    const [dataCurrent, setDataCurrent] = useState('2');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isCashModalVisible, setIsCashModalVisible] = useState(false);
    const [isCheckModalVisible, setIsCheckModalVisible] = useState(false);
    const [refresh, setRefresh] = useState(0);
    const [modalText, setModalText] = useState({ title: '', content: '' });
    const [backact, setBackact] = useState('');
    const [bankData, setBankData] = useState('');
    const [topLoading, setTopLoading] = useState(true);
    const [bottomLoading, setBottomLoading] = useState(true);
    const [error, setError] = useState([]);
    const [coBackMsg, setCoBackMsg] = useState({ amount: '', no: '' });
    const dispatch = useDispatch();
    const postData = useMemo(() => {
        if (currentAccount.account != null) {
            const postData = {
                AID: currentAccount.broker_id + currentAccount.account,
                token: getToken(),
                TT: dataCurrent,
                seq: refresh,
            };
            return postData;
        } else {
            return {};
        }
    }, [currentAccount, dataCurrent, refresh]);

    const { data: fetchData } = useSWR([JSON.stringify(postData)], postAccBalanceWithSwr, {
        onError: (error, key) => {
            Modal.error({
                title: error,
            });
            setError('伺服器錯誤');
        },
        errorRetryCount: 3,
        focusThrottleInterval: 10000,
        errorRetryInterval: 10000,
    });

    useEffect(() => {
        //console.log("[ACC]",currentAccount)
        if (fetchData) {
            setDataSource(fetchData);
            if (fetchData.settle_type !== settleType) {
                setSettleType(fetchData.settle_type);
            }
        }
    }, [fetchData]);

    useEffect(() => {
        //datacount: 1, currency: "USD", name: "美元", amt: 213.75
        if (settleType == '2' || settleType == '4') {
            setBottomLoading(true);
            let AID = currentAccount.broker_id + currentAccount.account;
            let UID = currentAccount.idno;
            postBankBalance(AID, getToken(), UID).then(res => {
                let base = res.detail
                console.log('ORIGIN',base)
                if (settleType == '2') {
                    setBackact(res.act_backact);
                } else if (settleType == '4') {
                    setBackact(res.ntd_backact);
                }

            });
        }
    }, [settleType, refresh]);

    const columns = [
        {
            title: '幣別',
            dataIndex: 'currency',
            key: 'currency',
            align: 'center',
            width: '10%',
        },
        {
            title: '下單可用餘額',
            dataIndex: 'buyingPower',
            key: 'buyingPower',
            align: 'center',
            width: '20%',
        },
        {
            title: '銀行可用餘額-交割',
            dataIndex: 'balance',
            key: 'balance',
            align: 'center',
            width: '20%',
        },
        {
            title: 'T-1日在途',
            dataIndex: 't_1',
            key: 't_1',
            align: 'center',
            width: '15%',
        },
        {
            title: 'T-2日在途',
            dataIndex: 't_2',
            key: 't_2',
            align: 'center',
            width: '15%',
        },
        {
            title: 'T日賣出成交',
            dataIndex: 'amount',
            key: 'amount',
            align: 'center',
            width: '20%',
        },
    ];
    const columnsAcc = [
        {
            title: '幣別',
            dataIndex: 'name',
            key: 'name',
            align: 'center',
            width: '30%',
        },
        {
            title: '幣別代號',
            dataIndex: 'currency',
            key: 'currency',
            align: 'center',
            width: '35%',
        },
        {
            title: '帳戶餘額',
            dataIndex: 'amt',
            key: 'amt',
            align: 'center',
            width: '35%',
        },
    ];

    const { Option } = Select;

    const handleChange = value => {
        setDataCurrent(value);
        console.log(`selected ${value}`);
    };

    const secretChanger = e => {
        e.preventDefault();
        if(hidden){
            secretToggle(bankData, ['currency', 'name', 'amt']).then(res => {
                setBankData(res);
            });
        }else{
          setBankData(accBalanceData)  
        }
        setHidden(!hidden);
    };

    const showCashModal = e => {
        e.preventDefault();
        setInputData(dataSource.balance ? dataSource.balance : 0);
        setIsCashModalVisible(true);
    };
    const showModal = (e, n) => {
        e.preventDefault();
        modalContentHandler(n, '');
    };
    const modalContentHandler = (id, data) => {
        let title = '';
        let content = '';
        if (id == 0) {
            title = '出金說明';
            content = `
            <p>1.當日出金時間為9:00~12:00,下午14:30後入帳。</p>
            <p>2.超過中午12:00申請出金者, 於下一營業日下午14:30後入帳。</p>
            `;
        } else if (id == 1) {
            title = '帳戶餘額說明';
            content = `
            <p>1.下單可用金額=銀行餘額＋T＋1/T＋2/T＋3在途款＋當日賣出成交-當日買進委託。</p>
            <p>2.可出金金額 = 銀行昨日餘額 - 出金金額台 / 外幣自有專戶。</p>
            <p>3.已圈存金額 = T ＋ 1 + T ＋ 2在途款 ＋ 當日賣出成交 - 當日買進委託。</p>
            <p>4.台/外幣自有專戶無需申請出金美股若無成交客戶, 購買力於隔天晚上21:00才會再更新。</p>
            `;
        } else if (id == 2) {
            title = '系統訊息';
            content = `
            <p style="text-align:center;font-size:1.5em;">出金申請已送出</p>
            <p style="text-align:center">出金編號:${data.no}</p>
            <p style="text-align:center">出金金額:${data.amount}</p>
            `;
        }
        setModalText({ title: title, content: content });
        setIsModalVisible(true);
    };

    const loadingHandler = (fetchData, error) => {
        if (fetchData == null && !error) {
            return true;
        } else {
            return false;
        }
    };
    const handleCancel_cash = () => {
        setIsCashModalVisible(false);
    };
    const handleCancel_check = () => {
        setIsCheckModalVisible(false);
    };
    const handleCancel_info = () => {
        setIsModalVisible(false);
    };
    const CashOut = () => {
        setIsCashModalVisible(false);
        setIsCheckModalVisible(true);
    };
    const CashOutAll = () => {
        setIsCashModalVisible(false);
        setIsCheckModalVisible(true);
    };
    const CashOutFinal = () => {
        let Currency = dataSource.currency;
        let Amount = inputData;
        let token = getToken();
        console.log('st', currentAccount, Amount, Currency, token);
        postWithdrawApply(currentAccount, platform, Amount, Currency, token).then(res => {
            console.log(res);
            if (res.success == 'True') {
                let result = res.result.Data.Row;
                modalContentHandler(2, { amount: result['@Amount'], no: result['@OID'] });
                return;
            } else {
                Modal.error({
                    content: res.statusText,
                });
            }
        });
        setIsCheckModalVisible(false);
    };
    const InputChange = e => {
        setInputData(e.target.value);
        console.log('input', e.target.value);
    };
    const onRefresh = () => {
        let r = refresh;
        setRefresh(r + 1);
    };
    return (
        <div className="brokerage brokerage_accBalance">
            <div className="action_box">
                <div>
                    <Select defaultValue={dataCurrent} style={{ width: 120 }} onChange={handleChange}>
                        <Option value="2">美國</Option>
                        <Option value="0">香港</Option>
                        <Option value="1">日本</Option>
                        <Option value="8">滬股通</Option>
                        <Option value="9">深股通</Option>
                    </Select>
                    <Button type="primary" onClick={showCashModal}>
                        出金
                    </Button>
                    <Button onClick={e => showModal(e, 0)}>出金說明</Button>
                </div>
                <div>
                    <Button onClick={e => secretChanger(e)}>{hidden?<EyeInvisibleOutlined />:<EyeOutlined />}</Button>
                    <Button onClick={e => showModal(e, 1)}>說明</Button>
                    <IconBtn type={'refresh'} onClick={onRefresh} className="action_btn">
                        {' '}
                    </IconBtn>
                </div>

                <Modal
                    title={modalText.title}
                    visible={isModalVisible}
                    closable={false} //{ , className: "modal-footer-hiden-button" }
                    footer={[<Button onClick={handleCancel_info}>關閉</Button>]}
                >
                    <div dangerouslySetInnerHTML={{ __html: modalText.content }}></div>
                </Modal>
                <Modal
                    className="CashModal"
                    title="出金"
                    visible={isCashModalVisible}
                    onCancel={handleCancel_cash}
                    footer={[
                        <Button onClick={CashOut}>確認出金</Button>,
                        <Button onClick={CashOutAll}>全部出金</Button>,
                    ]}
                >
                    <div>
                        <table>
                            <tr>
                                <td>幣別:</td>
                                <td>{dataSource.currency}</td>
                            </tr>
                            <tr>
                                <td>預估可出金金額:</td>
                                <td>{dataSource.balance ? dataSource.balance : '-'}</td>
                            </tr>
                            <tr>
                                <td>出金金額:</td>
                                <td>
                                    <Input
                                        placeholder="請輸入金額"
                                        value={inputData}
                                        onChange={InputChange}
                                        type="number"
                                    />
                                </td>
                            </tr>
                        </table>
                    </div>
                </Modal>
                <Modal
                    className="CheckModal"
                    title="出金確認"
                    visible={isCheckModalVisible}
                    onCancel={handleCancel_check}
                    footer={[<Button onClick={CashOutFinal}>確定出金</Button>]}
                >
                    <div>
                        <table>
                            <tr>
                                <td>幣別:</td>
                                <td>{dataSource.currency}</td>
                            </tr>
                            <tr>
                                <td>出金金額:</td>
                                <td>{inputData}元</td>
                            </tr>
                        </table>
                    </div>
                </Modal>
            </div>
            <div className="table_box">
                <AccountTable
                    dataSource={[dataSource]}
                    pagination={false}
                    columns={columns}
                    loading={{
                        indicator: (
                            <div
                                style={{
                                    marginTop: '20px',
                                    color: 'black',
                                    fontSize: '1.6rem',
                                    width: '100%',
                                    transform: 'translateX(-49%) translateY(-54px)',
                                }}
                            >
                                資料加載中...
                            </div>
                        ),
                        spinning: loadingHandler.call(null, fetchData, error),
                    }}
                />
            </div>
            {settleType == '2' || settleType == '4' ? (
                <div className="bank_table">
                    <p>
                        {settleType == '2' ? '外幣' : '台幣'}自有帳戶:<span>{backact}</span>
                    </p>
                    <AccountTable
                        dataSource={bankData}
                        pagination={false}
                        columns={columnsAcc}
                        loading={{
                            indicator: (
                                <div
                                    style={{
                                        marginTop: '20px',
                                        color: 'black',
                                        fontSize: '1.6rem',
                                        width: '100%',
                                        transform: 'translateX(-49%) translateY(-54px)',
                                    }}
                                >
                                    資料加載中...
                                </div>
                            ),
                            spinning: loadingHandler.call(null, bankData, error),
                        }}
                    />
                </div>
            ) : null}

            <style jsx>
                {`
                    .brokerage_accBalance {
                        position: relative;
                    }
                    .action_box {
                        position: absolute;
                        top: -110px;
                        width: 100%;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 10px;
                    }
                    .table_box {
                        margin: 0 0 10px;
                    }
                    .balance_table {
                        width: 100%;
                        font-size: 16px;
                        line-height: 2;
                        margin-top: 20px;
                    }
                    .balance_table tr td {
                        width: 50%;
                        text-align: center;
                        border: 1px solid grey;
                    }
                    .balance_table tr td:first-child {
                        background-color: #f2f5fa;
                        color: #6c7b94;
                    }

                    .balance_table_bank {
                        width: 100%;
                        font-size: 16px;
                        line-height: 2;
                        margin-top: 20px;
                    }
                    .balance_table_bank tr td,
                    .balance_table_bank tr th {
                        text-align: center;
                        border: 1px solid grey;
                    }
                    .balance_table_bank tr td:not(:first-child) {
                        width: 35%;
                    }
                    .balance_table_bank tr th {
                        background-color: #f2f5fa;
                        color: #6c7b94;
                    }
                    .bank_table {
                        margin: 45px auto;
                    }
                    .bank_table p {
                        font-size: 16px;
                    }
                    .bank_table p span {
                        color: #1890ff;
                        font-weight: 700;
                        margin-left: 0.5em;
                    }
                `}
            </style>
            <style global jsx>
                {`
                    .brokerage .action_box .action_btn,
                    .brokerage .action_box .ant-btn {
                        margin-left: 10px;
                    }

                    .brokerage .action_box .ant-btn:hover:not(.ant-btn-primary) {
                        border-color: rgb(196, 56, 38);
                        color: rgb(196, 56, 38);
                    }
                    .brokerage .action_box .ant-btn-primary {
                        margin-left: 10px;
                        background: rgb(196, 56, 38);
                        border-color: rgb(196, 56, 38);
                    }
                    .brokerage .action_box .ant-btn-primary:hover {
                        filter: brightness(1.1);
                    }
                    .CashModal table tr td {
                        width: 50%;
                        font-size: 14px;
                        line-height: 2;
                        padding: 0 10px;
                    }
                    .CashModal table tr td:first-child {
                        text-align: right;
                    }
                    .CashModal table tr td:last-child {
                        text-align: center;
                    }
                    .CashModal table tr td input {
                        text-align: center;
                    }
                `}
            </style>
        </div>
    );
};

export default AccBalance;
