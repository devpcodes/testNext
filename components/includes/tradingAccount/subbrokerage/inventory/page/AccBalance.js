import { useEffect, useMemo, useState } from 'react';
import { Modal, Select, Button, Input, Checkbox, InputNumber } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import useSWR from 'swr';
import {
    postAccBalanceWithSwr,
    postBankBalance,
    postWithdrawApply,
} from '../../../../../../services/components/goOrder/sb/postInventory';
import { setBalanceData } from '../../../../../../store/accBalance/action';
import { secretToggle } from '../../../../../../services/components/tradingAccount/subBrokerage/secretToggle';
import { getToken } from '../../../../../../services/user/accessToken';
import { usePlatform } from '../../../../../../hooks/usePlatform';
import AccountTable from '../../../vipInventory/AccountTable';
import IconBtn from '../../../vipInventory/IconBtn';
import ItemCard from '../elements/ItemCard';
const AccBalance = () => {
    const currentAccount = useSelector(store => store.user.currentAccount);
    const accBalanceData = useSelector(store => store.accBalance.bankData);
    const platform = usePlatform();
    const [accountType, setAccountType] = useState('');
    const [inputData, setInputData] = useState(null);
    const [settleType, setSettleType] = useState('');
    const [inputAble, setInputAble] = useState(true);
    const [hidden, setHidden] = useState(false);
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
    const [icBoxOpen, setIcBoxOpen] = useState(false);
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
            setError('???????????????');
        },
        errorRetryCount: 0,
        focusThrottleInterval: 10000,
        errorRetryInterval: 10000,
    });

    useEffect(() => {
        if (fetchData) {
            setDataSource(fetchData);
            if (fetchData.settle_type !== settleType) {
                setSettleType(fetchData.settle_type);
            }
        }
    }, [fetchData]);

    useEffect(() => {
        //datacount: 1, currency: "USD", name: "??????", amt: 213.75
        if (settleType == '2' || settleType == '4') {
            setBottomLoading(true);
            getBankData();
        }
    }, [settleType, refresh]);

    const getBankData = async () => {
        let AID = currentAccount.broker_id + currentAccount.account;
        let UID = currentAccount.idno;
        const result = await postBankBalance(AID, getToken(), UID);
        if (settleType == '2') {
            setBackact(result.act_backact);
        } else if (settleType == '4') {
            setBackact(result.ntd_backact);
        }

        let bankData_ = result.detail.map((x, i) => {
            let obj = {
                key: i,
                icon: x.currency,
                title: x.name + ' ' + x.currency,
                content: x.amt,
            };
            return obj;
        });
        setBankData(bankData_);
        console.log('ORIGIN', bankData_);
    };
    const columns = [
        {
            title: '??????',
            dataIndex: 'currency',
            key: 'currency',
            align: 'center',
            width: '10%',
        },
        {
            title: '??????????????????',
            dataIndex: 'buyingPower',
            key: 'buyingPower',
            align: 'center',
            width: '20%',
        },
        {
            title: '??????????????????-??????',
            dataIndex: 'balance',
            key: 'balance',
            align: 'center',
            width: '20%',
        },
        {
            title: 'T-1?????????',
            dataIndex: 't_1',
            key: 't_1',
            align: 'center',
            width: '15%',
        },
        {
            title: 'T-2?????????',
            dataIndex: 't_2',
            key: 't_2',
            align: 'center',
            width: '15%',
        },
        {
            title: 'T???????????????',
            dataIndex: 'amount',
            key: 'amount',
            align: 'center',
            width: '20%',
        },
    ];
    const columnsAcc = [
        {
            title: '??????',
            dataIndex: 'name',
            key: 'name',
            align: 'center',
            width: '30%',
        },
        {
            title: '????????????',
            dataIndex: 'currency',
            key: 'currency',
            align: 'center',
            width: '35%',
        },
        {
            title: '????????????',
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
        if (hidden === false) {
            // console.log('hidden1',hidden)
            let result = secretToggle(dataSource, ['balance', 'buyingPower', 'currency']);
            setDataSource(result);
            setHidden(true);
        } else {
            // console.log('hidden2',hidden)
            setDataSource(fetchData);
            setHidden(false);
        }
    };

    const showCashModal = e => {
        e.preventDefault();
        //setInputData(dataSource.balance ? dataSource.balance : 0);
        setIsCashModalVisible(true);
    };
    const IcBoxController = e => {
        e.preventDefault();
        setIcBoxOpen(!icBoxOpen);
    };
    const showModal = (e, n) => {
        e.preventDefault();
        modalContentHandler(n, '');
    };
    const modalContentHandler = (id, data) => {
        let title = '';
        let content = '';
        if (id == 0) {
            title = '????????????';
            content = `
            <p>1.?????????????????????9:00~12:00,??????14:30????????????</p>
            <p>2.????????????12:00???????????????, ????????????????????????14:30????????????</p>
            `;
        } else if (id == 1) {
            title = '??????????????????';
            content = `
            <p>1.??????????????????=???????????????T???1/T???2/T???3??????????????????????????????-?????????????????????</p>
            <p>2.??????????????? = ?????????????????? - ??????????????? / ?????????????????????</p>
            <p>3.??????????????? = T ??? 1 + T ??? 2????????? ??? ?????????????????? - ?????????????????????</p>
            <p>4.???/????????????????????????????????????????????????????????????, ????????????????????????21:00??????????????????</p>
            `;
        } else if (id == 2) {
            title = '??????';
            content = `
            <p style="font-weight:900;margin:0;color:#3f5372;">?????????????????????</p>
            <p style="margin:0;color:#3f5372;">???????????????${data.no}</p>
            <p style="margin:0;color:#3f5372;">???????????????${dataSource.currency} ${data.amount}</p>
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
    // const CashOutAll = () => {
    //     setIsCashModalVisible(false);
    //     setIsCheckModalVisible(true);
    // };
    const CashOutAll = (e) => {
        if(e.target.checked){
        let total = dataSource.balance ? dataSource.balance : null
        setInputData(total);
            setInputAble(false)
        }else{
            setInputAble(true)    
        }
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
                        <Option value="2">??????</Option>
                        <Option value="0">??????</Option>
                        <Option value="1">??????</Option>
                        <Option value="8">?????????</Option>
                        <Option value="9">?????????</Option>
                    </Select>
                    {/* <Button className="co_btn" type="primary" onClick={showCashModal}>
                        ??????
                    </Button> */}
                    <IconBtn
                        style={{
                            color: '#FFF',
                            fontSize: '16px',
                            padding: '0 16px',
                            backgroundColor: '#c43826',
                            borderColor: 'transparent',
                            width: 'auto',
                        }}
                        type={'money'}
                        closable={false}
                        onClick={showCashModal}
                        className="hover-light"
                        text="????????????"
                    ></IconBtn>
                    <IconBtn
                        style={{
                            color: '#0d1623',
                            fontSize: '16px',
                            padding: '0 16px',
                            width: 'auto',
                        }}
                        type={'info'}
                        onClick={e => showModal(e, 0)}
                        text="????????????"
                    ></IconBtn>
                    {/* <Button className="iconBtn" onClick={e => showModal(e, 0)}>????????????</Button> */}
                </div>
                <div>
                    <IconBtn type={hidden ? 'eyeClose' : 'eyeOpen'} onClick={secretChanger}></IconBtn>
                    <IconBtn type={'info'} onClick={e => showModal(e, 1)}></IconBtn>
                    <IconBtn type={'refresh'} onClick={onRefresh}></IconBtn>
                </div>

                <Modal
                    title={modalText.title}
                    visible={isModalVisible}
                    className="co_CashModal"
                    closable={false} //{ , className: "modal-footer-hiden-button" }
                    footer={[
                        <Button type="primary" onClick={handleCancel_info}>
                            ??????
                        </Button>,
                    ]}
                >
                    <div dangerouslySetInnerHTML={{ __html: modalText.content }}></div>
                </Modal>
                <Modal
                    className="CashModal co_CashModal"
                    title="????????????"
                    visible={isCashModalVisible}
                    onCancel={handleCancel_cash}
                    closable={false}
                    footer={[
                        <Button onClick={handleCancel_cash}>??????</Button>,
                        <Button type="primary" onClick={CashOut}>
                            ??????
                        </Button>,
                    ]}
                >
                    <div className="co_preview">
                        <div className="co_preview_input">
                            <div>{dataSource.currency}</div>
                            <div>
                                <Input
                                    disabled={!inputAble}
                                    placeholder="0.00" value={inputData} onChange={InputChange} type="number" />
                            </div>
                        </div>
                        <div className="co_preview_ckeck">
                                <Checkbox 
                                    className="co_preview_checkbox"
                                    onChange={CashOutAll}
                                >
                                <span className="wordy">???????????????????????????(??????)</span>
                                </Checkbox>
                                <div className="text">
                                    {dataSource.currency} <span>{dataSource.balance ? dataSource.balance : '-'}</span>
                                </div>
                        </div>
                    </div>
                </Modal>
                <Modal
                    className="CheckModal co_CashModal"
                    title="????????????"
                    visible={isCheckModalVisible}
                    closable={false}
                    footer={[
                        <Button onClick={handleCancel_check}>??????</Button>,
                        <Button type="primary" onClick={CashOutFinal}>
                            ??????
                        </Button>,
                    ]}
                >
                    <span className="wordy">?????????????????? {dataSource.currency} {inputData} ??????</span>
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
                                ???????????????...
                            </div>
                        ),
                        spinning: loadingHandler.call(null, fetchData, error),
                    }}
                />
            </div>
            {settleType == '2' || settleType == '4' ? (
                <div className="bank_table">
                    <p>
                        ?????????????????????????????????
                        {/* {settleType == '2' ? '??????' : '??????'}????????????:<span>{backact}</span> */}
                    </p>
                    <div className="itemCard_box">
                        <ItemCard dataSource={bankData} lineNum={5} />
                    </div>
                    <div className="itemCard_box_btn" onClick={IcBoxController}>
                        {icBoxOpen ? '??????' : '??????'}??????
                    </div>
                </div>
            ) : null}

            <style jsx>
                {`  .wordy{font-size:16px;color:#3f5372;}
                    .co_preview{}
                    .co_preview .co_preview_input{display:flex;font-size:16px;border: 1px solid #d7e0ef;}
                    .co_preview .co_preview_input div:first-child{
                        background:#f3f6fe;
                        line-height: 40px;
                        width: 80px;
                        text-align: center;
                        border-right: 1px solid #d7e0ef;
                    }
                    .co_preview_ckeck{
                        margin-top:12px;
                        font-size:16px;
                    }
                    .co_preview_ckeck label span{
                        font-weight:900;
                    }
                    .co_preview_ckeck label{
                        display:flex;
                    }
                    .co_preview_ckeck .text{
                        padding-left:26px;
                    }
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
                    .itemCard_box_btn {
                        cursor: pointer;
                        font-size: 16px;
                        text-align: center;
                        font-weight: 700;
                    }
                    .itemCard_box_btn:after {
                        display: inline-block;
                        content: '';
                        margin-left: 5px;
                        width: 8px;
                        height: 8px;
                        border: 2px solid #666;
                        transform: translate(${icBoxOpen ? '0%, 0%' : '0%, -50%'})
                            rotate(${icBoxOpen ? '135' : '-45'}deg);
                        border-width: 0 0 2px 2px;
                        transition: transform 0.5s;
                    }
                    .itemCard_box {
                        max-height: ${icBoxOpen ? '300px' : '80px'};
                        overflow: hidden;
                        transition: max-height 0.8s;
                    }
                `}
            </style>
            <style global jsx>
                {`
                    .co_CashModal.CheckModal{
                    }
                    .co_preview_checkbox .ant-checkbox span{
                        font-size:16px;
                    }
                    .co_preview_input .ant-input{
                        line-height: 40px;
                        padding: 0 10px;
                        border:none;
                        font-size: 16px;
                    }
                    .co_CashModal .ant-btn{
                        width:80px;
                        height:40px;
                        font-size:16px;
                        text-align:center;
                    }
                    .co_CashModal .ant-btn-primary:hover{
                        filter: brightness(1.2);
                    }
                    .co_CashModal .ant-btn-primary{
                        background-color:#c43826;
                        border-color:#c43826;
                    }
                    .co_CashModal .ant-btn:not(.ant-btn-primary):hover{
                        color:#c43826;
                        border-color:#c43826;
                    }
                    .co_CashModal .ant-modal-content{
                        max-width: 320px;
                    }
                    .co_CashModal .ant-modal-body{
                        font-size:16px;
                    }
                    .co_CashModal .ant-modal-title{
                        font-weight:900;
                        font-size: 20px;
                    }
                    .co_CashModal .ant-modal-content .ant-modal-header{
                        font-size:16px;
                        font-weight:700;
                    }
                    .subBrokerage .action_box button {
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
