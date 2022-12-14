import { useEffect, useContext, useRef, useState, useCallback } from 'react';
import { Tabs, Button, Input, Progress, Modal, notification } from 'antd';
import { useRouter } from 'next/router';
import jwt_decode from 'jwt-decode';
// import { ReducerContext } from '../../../pages/AdvanceCollection';
import { ReducerContext } from '../../../store/advanceCollection/reducerContext';
import { getToken } from '../../../services/user/accessToken';
import Accounts from './Accounts';
import SearchAutoComplete from '../tradingAccount/vipInventory/SearchAutoComplete';
import BuyButton from '../tradingAccount/vipInventory/buttons/BuyButton';
import { fetchSnapshot } from '../../../services/stock/fetchSnapshot';
import { formatPriceByUnit } from '../../../services/numFormat';
import { sign, checkSignCA, CAHandler, signCert } from '../../../services/webCa';
import { postApplyEarmark } from '../../../services/components/reservationStock/postApplyEarmark';
import { PostApplyEarmarkReserve } from '../../../services/components/reservationStock/postApplyEarmarkReserve';
import LoadingComp from './LoadingComp';
import EarmarkTable from './EarmarkTable';
import Msg from './Msg';
import BankContainer from './BankContainer';
import { SELECTED } from '../../../store/advanceCollection/actionType';
import { BigNumber } from 'bignumber.js';
const { TabPane } = Tabs;
const EarmarkReserve = () => {
    const [state, dispatch] = useContext(ReducerContext);
    const [defaultValue, setDefaultValue] = useState('');
    const [priceVal, setPriceVal] = useState('');
    const [qtyVal, setQtyVal] = useState('');
    const [amountVal, setAmountVal] = useState('');
    const [showLoading, setShowLoading] = useState(false);
    const init = useRef(false);
    const selectSymbol = useRef('');
    const selected = useRef(false);
    const isWebView = useRef(true);
    const [activeTabKey, setActiveTabKey] = useState('1');
    const router = useRouter();

    useEffect(() => {
        if (state.accountsReducer.disabled) {
            notification.warning({
                message: state.accountsReducer.disabled,
                top: '100px',
            });
        }
    }, [state.accountsReducer.disabled]);

    useEffect(() => {
        // console.log('accounts', state.accountsReducer.accounts, state.accountsReducer.selected)
        if (state.accountsReducer.accounts.length > 0) {
            dispatch({ type: SELECTED, payload: state.accountsReducer.accounts[0] });
            setDefaultValue(state.accountsReducer.accounts[0].broker_id + state.accountsReducer.accounts[0].account);
        }
        // if (!init.current) {
        //     dispatch({ type: SELECTED, payload: state.accountsReducer.accounts[0] });
        //     setDefaultValue(state.accountsReducer.accounts[0].broker_id + state.accountsReducer.accounts[0].account);
        //     init.current = true;
        // }
        // setTimeout(() => {
        //     if(state.accountsReducer.selected != null && state.accountsReducer.selected.settle_sp != null && !state.accountsReducer.selected.settle_sp){
        //         if(state.accountsReducer.accounts.length > 0){
        //             dispatch({ type: SELECTED, payload: state.accountsReducer.accounts[0] });
        //             setDefaultValue(state.accountsReducer.accounts[0].broker_id + state.accountsReducer.accounts[0].account);
        //         }else{
        //             dispatch({ type: SELECTED, payload: '' });
        //             setDefaultValue(state.accountsReducer.selected.broker_id + state.accountsReducer.selected.account);
        //         }
        //     }
        // }, 500);
    }, [state.accountsReducer.accounts]);

    useEffect(() => {
        if (router.query.iswebview === 'true') {
            isWebView.current = true;
        }
    }, [router.query]);

    useEffect(() => {
        if (priceVal && qtyVal) {
            let fee = BigNumber(qtyVal).times(priceVal).times(0.001425).toFixed(0, BigNumber.ROUND_DOWN);
            const amount = BigNumber(qtyVal).times(priceVal).toFixed(0, BigNumber.ROUND_DOWN);
            fee = BigNumber(fee).isLessThan(20) ? 20 : fee;
            // let amount = priceVal * qtyVal * (1 + 0.001425);
            // setAmountVal(amount.toFixed(0));
            setAmountVal(BigNumber(amount).plus(fee).toString());
        }
    }, [priceVal, qtyVal]);

    const selectHandler = useCallback(async val => {
        const symbol = val.split(' ')[0];
        try {
            const res = await fetchSnapshot([symbol]);
            if (Array.isArray(res) && res.length > 0) {
                if (res[0].UpLimit == 9999.95) {
                    setPriceVal(formatPriceByUnit(symbol, res[0].Close * 1.2));
                } else {
                    setPriceVal(formatPriceByUnit(symbol, res[0].UpLimit));
                }
                selectSymbol.current = symbol;
            }
        } catch (error) {
            console.log(error);
        }
    });
    const onSeChangeHandler = useCallback(val => {
        // selectHandler(val);
    });
    const selectedHandler = useCallback(bol => {
        selected.current = bol;
    });
    const changleHandler = useCallback(activeKey => {
        setActiveTabKey(activeKey);
        if (state.accountsReducer.selected) {
            setDefaultValue(state.accountsReducer.selected.broker_id + state.accountsReducer.selected.account);
        }
    });
    const priceChangeHandler = useCallback(e => {
        if (validateVal(e.target.value)) {
            setPriceVal(e.target.value);
        }
    });
    const qtyChangeHandler = useCallback(e => {
        if (validateVal(e.target.value)) {
            setQtyVal(e.target.value);
        }
    });
    const amountChangeHandler = useCallback(e => {
        if (validateVal(e.target.value)) {
            setAmountVal(e.target.value);
        }
    });
    const validateVal = useCallback(val => {
        const patt = /^[0-9\.]{0,20}$/;
        if (!patt.test(val)) {
            return false;
        }
        return true;
    });
    const submitHandler = async (symbol, price, qty, amount) => {
        if (!selected.current) {
            Modal.error({
                content: '??????????????????????????????????????????',
            });
            return;
        }
        if (!symbol || !price || !qty) {
            Modal.error({
                content: '?????????????????????',
            });
            return;
        }
        const token = getToken();
        let data = getAccountsDetail(token);
        let ca_content = sign(
            {
                idno: data.idno,
                broker_id: data.broker_id,
                account: data.account,
            },
            true,
            token,
            isWebView.current,
        );
        if (checkSignCA(ca_content)) {
            setShowLoading(true);
            try {
                const resData = await PostApplyEarmarkReserve({
                    account: data.account,
                    branch: data.broker_id,
                    symbol,
                    order_qty: qty,
                    order_price: price,
                    token,
                    ca_content,
                });
                setShowLoading(false);
                if (resData) {
                    Modal.success({
                        content: resData,
                        onOk() {
                            // resetDataHandler();
                        },
                    });
                }
            } catch (error) {
                setShowLoading(false);
            }
        }
    };
    const getAccountsDetail = token => {
        let data = jwt_decode(token);
        if (state.accountsReducer.selected.account == null) {
            alert('???????????????');
        }
        data = data.acts_detail.filter(item => {
            if (item.account === state.accountsReducer.selected.account) {
                return true;
            }
        });
        return data[0] || {};
    };

    return (
        <>
            <div className="earmarkReserve__container">
                <h1 className="title">????????????</h1>
                <Tabs
                    // defaultActiveKey={stockActiveTabKey.current}
                    animated={{ inkBar: true, tabPane: true }}
                    onChange={changleHandler}
                >
                    <TabPane tab="??????????????????" key="1">
                        <Accounts key="1" style={{ marginTop: '35px' }} value={defaultValue} type="eamarkReserve" />
                        {activeTabKey === '1' && (
                            <BankContainer
                                token={getToken()}
                                broker_id={state.accountsReducer.selected?.broker_id}
                                account={state.accountsReducer.selected?.account}
                            />
                        )}

                        <div className="apply__container">
                            <div className="item">
                                <p className="label symbol__label">???????????????</p>
                                <SearchAutoComplete
                                    selectHandler={selectHandler}
                                    onChange={onSeChangeHandler}
                                    width={'100%'}
                                    selectedHandler={selectedHandler}
                                />
                            </div>
                            <div className="item">
                                <p className="label">?????????</p>
                                <Input
                                    onChange={priceChangeHandler}
                                    placeholder="???????????????"
                                    className="earmark__inp"
                                    value={priceVal}
                                />
                            </div>
                            <div className="item">
                                <p className="label">??????</p>
                                <Input
                                    placeholder="???????????????"
                                    className="earmark__inp"
                                    onChange={qtyChangeHandler}
                                    value={qtyVal}
                                />
                            </div>
                            <div className="item">
                                <p className="label">????????????</p>
                                <Input
                                    placeholder="???????????????"
                                    className="earmark__inp"
                                    onChange={amountChangeHandler}
                                    value={amountVal}
                                    disabled={true}
                                />
                            </div>
                            <div className="btn__box-earmark">
                                <BuyButton
                                    text={'??????'}
                                    width={'100%'}
                                    height={'40px'}
                                    fontSize={'16px'}
                                    color={'rgb(210, 55, 73)'}
                                    onClick={submitHandler.bind(
                                        null,
                                        selectSymbol.current,
                                        priceVal,
                                        qtyVal,
                                        amountVal,
                                        selected.current,
                                    )}
                                    disabled={state.accountsReducer.disabled}
                                />
                            </div>
                            <Msg
                                style={{ marginTop: '30px' }}
                                list={[
                                    { txt: '??????????????????' },
                                    {
                                        txt:
                                            '1. ???????????????????????????????????????????????????????????????????????????(??????????????????/?????????????????????????????????/????????????)',
                                    },
                                    {
                                        html:
                                            '<p style="color: #e46262;">&nbsp;&nbsp;&nbsp;&nbsp;??????????????????????????????(??????????????????,????????????????????????????????????20%)</p>',
                                    },
                                    { txt: '2. ???????????????????????????????????????' },
                                    {
                                        txt:
                                            '3. ??????????????????????????????????(1+????????????)????????????????????????20????????????20??????20??????',
                                    },
                                    { html: '<p>&nbsp;&nbsp;&nbsp;&nbsp;???????????????0.1425%??????</p>' },
                                    { txt: '4. ??????????????????????????????8:00~14:30???????????????' },
                                    { txt: '5. ????????????????????????????????????????????????????????????' },
                                    {
                                        txt:
                                            '6. ?????????????????????[??????]????????????[??????????????????]??????[??????]???????????????????????????????????????????????????????????????',
                                        color: '#e46262',
                                    },
                                    {
                                        txt: '7. ???[??????????????????]??????[??????]????????????????????????????????????????????????????????????',
                                        color: '#e46262',
                                    },
                                ]}
                            />
                        </div>
                    </TabPane>
                    <TabPane tab="??????????????????" key="2">
                        <Accounts key="1" style={{ marginTop: '35px' }} value={defaultValue} />

                        {activeTabKey === '2' && (
                            <>
                                <BankContainer
                                    token={getToken()}
                                    broker_id={state.accountsReducer.selected.broker_id}
                                    account={state.accountsReducer.selected.account}
                                />
                                <EarmarkTable />
                            </>
                        )}
                        <Msg
                            style={{ marginTop: '30px' }}
                            list={[
                                { txt: '??????????????????' },
                                { txt: '1. ?????????????????????????????????8:00~14:30???????????????' },
                                { txt: '2. ????????????????????????????????????????????????????????????' },
                                {
                                    txt:
                                        '3. ???[??????????????????]??????[??????]????????????[??????????????????]??????[??????]???????????????????????????????????????????????????????????????',
                                    color: '#e46262',
                                },
                                {
                                    txt: '4. ???[??????????????????]??????[??????]????????????????????????????????????????????????????????????',
                                    color: '#e46262',
                                },
                                { txt: '5. ??????????????????????????????' },
                                {
                                    txt: '6. ??????????????????????????????????????????',
                                },
                            ]}
                        />
                    </TabPane>
                </Tabs>
            </div>
            <LoadingComp showLoading={showLoading} />
            <style jsx>{`
                .earmarkReserve__container {
                    margin: 20px auto 0 auto;
                    max-width: 1000px;
                    font-size: 0px;
                    padding-left: 20px;
                    padding-right: 20px;
                }
                .title {
                    text-align: center;
                    color: #333;
                    font-size: 36px;
                    font-weight: bold;
                    letter-spacing: 6px;
                    margin-bottom: 0;
                }
                .apply__container {
                    padding-left: 2px;
                    margin-top: 40px;
                    /* height: 500px; */
                }
                .label {
                    font-size: 16px;
                    margin-right: 8px;
                    margin-bottom: 5px;
                    font-weight: bold;
                }
                .item {
                    display: inline-block;
                    width: calc((100% - 160px) / 4);
                    height: 75px;
                    overflow: hidden;
                }
                .item :not(:first-child) {
                    margin-left: 20px;
                }
                .btn__box-earmark {
                    vertical-align: top;
                    display: inline-block;
                    width: 80px;
                    padding-top: 28px;
                    margin-left: 20px;
                }
                @media (max-width: 768px), print {
                    .item {
                        display: block;
                        width: 100%;
                        margin-bottom: 10px;
                    }
                    .item :not(:first-child) {
                        margin-left: 0;
                    }
                    .apply__container {
                        margin-top: 20px;
                    }
                    .btn__box-earmark {
                        padding-top: 0;
                        margin: 0;
                        margin-top: 20px;
                        width: 100%;
                    }
                    .apply__container {
                        /* height: 500px; */
                    }
                }
            `}</style>
            <style global jsx>{`
                .earmarkReserve__container .ant-tabs-nav-list {
                    width: 100%;
                }
                .earmarkReserve__container .ant-tabs-tab {
                    width: 50%;
                    margin: 0;
                    text-align: center;
                    padding: 10px 20px;
                    font-size: 24px;
                    font-weight: bold;
                }
                @media (max-width: 580px) {
                    .earmarkReserve__container .ant-tabs-tab {
                        font-size: 16px;
                    }
                }
                .earmarkReserve__container .ant-tabs-tab div {
                    margin: 0 auto;
                }
                .earmarkReserve__container .ant-tabs-ink-bar {
                    background: #d23749;
                    height: 4px !important;
                }
                .earmarkReserve__container .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
                    color: #d23749;
                    font-weight: bold;
                }
                .earmarkReserve__container .ant-tabs-tab:hover {
                    color: #d23749;
                }

                .earmarkReserve__container .ant-tabs-tab-btn:active,
                .ant-tabs-tab-btn:focus,
                .ant-tabs-tab-remove:active,
                .ant-tabs-tab-remove:focus {
                    color: #d23749;
                }

                .autoComplete__container {
                    display: inline-block;
                }
                .autoComplete__container .ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
                    border: 1px solid #757575;
                    border-radius: 2px;
                }
                .autoComplete__container
                    .ant-select-single:not(.ant-select-customize-input)
                    .ant-select-selector
                    .ant-select-selection-search-input {
                    /* font-size: 16px; */
                    height: 38px !important;
                }
                .autoComplete__container .ant-select-single .ant-select-selector .ant-select-selection-placeholder {
                    /* line-height: 36px; */
                    line-height: 36px;
                }
                .autoComplete__container
                    .ant-select-single:not(.ant-select-customize-input)
                    .ant-select-selector
                    .ant-select-selection-search-input {
                    font-size: 1.6rem;
                    color: #292929;
                }

                .earmark__inp.ant-input {
                    display: inline-block;
                    height: 38px;
                    border: 1px solid #757575;
                    font-size: 1.6rem;
                    color: #292929;
                }
            `}</style>
        </>
    );
};

export default EarmarkReserve;
