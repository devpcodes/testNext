import { useEffect, useContext, useRef, useState, useCallback } from 'react';
import { Tabs, Button, Input, Progress, Modal, notification } from 'antd';
import { useRouter } from 'next/router';
import jwt_decode from 'jwt-decode';
import { ReducerContext } from '../../../pages/AdvanceCollection';
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
    const isWebView = useRef(false);
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
        if (!init.current) {
            setDefaultValue(state.accountsReducer.selected.broker_id + state.accountsReducer.selected.account);
            init.current = true;
        }
    }, [state.accountsReducer.selected]);

    useEffect(() => {
        if (router.query.iswebview === 'true') {
            isWebView.current = true;
        }
    }, [router.query]);

    useEffect(() => {
        if (priceVal && qtyVal) {
            let amount = priceVal * qtyVal * (1 + 0.001425);
            // setAmountVal(amount.toFixed(0));
            setAmountVal(Math.ceil(amount));
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
    const onSeChangeHandler = useCallback(val => {});
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
        if (!symbol || !price || !qty) {
            Modal.error({
                content: '資料輸入未完整',
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
                <h1 className="title">預收款項</h1>
                <Tabs
                    // defaultActiveKey={stockActiveTabKey.current}
                    animated={{ inkBar: true, tabPane: true }}
                    onChange={changleHandler}
                >
                    <TabPane tab="預收款項申請" key="1">
                        <Accounts key="1" style={{ marginTop: '35px' }} value={defaultValue} />
                        {activeTabKey === '1' && (
                            <BankContainer
                                bhname={state.accountsReducer.selected.bhname}
                                token={getToken()}
                                broker_id={state.accountsReducer.selected.broker_id}
                                account={state.accountsReducer.selected.account}
                            />
                        )}

                        <div className="apply__container">
                            <div className="item">
                                <p className="label symbol__label">股號或名稱</p>
                                <SearchAutoComplete
                                    selectHandler={selectHandler}
                                    onChange={onSeChangeHandler}
                                    width={'100%'}
                                />
                            </div>
                            <div className="item">
                                <p className="label">委託價</p>
                                <Input
                                    onChange={priceChangeHandler}
                                    placeholder="請輸入數字"
                                    className="earmark__inp"
                                    value={priceVal}
                                />
                            </div>
                            <div className="item">
                                <p className="label">股數</p>
                                <Input
                                    placeholder="請輸入數字"
                                    className="earmark__inp"
                                    onChange={qtyChangeHandler}
                                    value={qtyVal}
                                />
                            </div>
                            <div className="item">
                                <p className="label">預估金額</p>
                                <Input
                                    placeholder="請輸入數字"
                                    className="earmark__inp"
                                    onChange={amountChangeHandler}
                                    value={amountVal}
                                    disabled={true}
                                />
                            </div>
                            <div className="btn__box-earmark">
                                <BuyButton
                                    text={'申請'}
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
                                    )}
                                    disabled={state.accountsReducer.disabled}
                                />
                            </div>
                            <Msg
                                style={{ marginTop: '30px' }}
                                list={[
                                    { txt: '「注意事項」' },
                                    { txt: '1. 委託價：預設值由系統帶出，但可自行修改欲委託價格' },
                                    {
                                        html:
                                            '<p style="color: #e46262;">&nbsp;&nbsp;&nbsp;&nbsp;系統帶出：為漲停價。(限上市櫃股票,無漲跌幅股票以平盤參考價20%)</p>',
                                    },
                                    { txt: '2. 股數：自行輸入欲委託的股數' },
                                    {
                                        txt: '3. 預估金額：委託價×股數×(1+手續費率)，但可自行修改預收金額',
                                    },
                                    { html: '<p>&nbsp;&nbsp;&nbsp;&nbsp;手續費率以0.1425%計算</p>' },
                                    { txt: '4. 預收款項時間為交易日8:00~14:30，當日有效' },
                                    { txt: '5. 本功能僅限交割銀行為永豐銀行之客戶可使用' },
                                    {
                                        txt:
                                            '6. 逐筆申請：點選[申請]後，請至[預收款項查詢]點選[查詢]確認已完成此筆金額預收後，再進行下一筆申請',
                                        color: '#e46262',
                                    },
                                    {
                                        txt: '7. 至[預收款項查詢]點選[查詢]確認已完成預收款項申請後，再進行委託下單',
                                        color: '#e46262',
                                    },
                                ]}
                            />
                        </div>
                    </TabPane>
                    <TabPane tab="預收款項查詢" key="2">
                        <Accounts key="1" style={{ marginTop: '35px' }} value={defaultValue} />

                        {activeTabKey === '2' && (
                            <>
                                <BankContainer
                                    bhname={state.accountsReducer.selected.bhname}
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
                                { txt: '「注意事項」' },
                                { txt: '1. 預收款項時間台股交易日8:00~14:30，當日有效' },
                                { txt: '2. 本功能僅限交割銀行為永豐銀行之客戶可使用' },
                                {
                                    txt:
                                        '3. 於[預收款項申請]點選[申請]後，請至[預收款項查詢]點選[查詢]確認已完成此筆金額預收後，再進行下一筆申請',
                                    color: '#e46262',
                                },
                                {
                                    txt: '4. 於[預收款項查詢]點選[查詢]確認已完成預收款項申請後，再進行委託下單',
                                    color: '#e46262',
                                },
                                { txt: '5. 返還金額於交易日返還' },
                                {
                                    txt: '6. 人工預收金額請洽原分公司確認',
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
