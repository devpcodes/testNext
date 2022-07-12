import { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Breadcrumb from '../../../breadcrumb/breadcrumb';
import moment from 'moment';
import { getToken } from '../../../../../services/user/accessToken';
import { AccountDropdown } from '../../../personalArea/accountDropdown/AccountDropdown';
import IconBtn from '../../../tradingAccount/vipInventory/IconBtn';
import RecordTable from '../elements/RecordTable';
import RecordLoanTable from '../elements/RecordLoanTable';
import { useUser } from '../../../../../hooks/useUser';
import {
    repaymentDetail,
    collateralDeatil,
    fetchApplyRecord,
    applyStatus,
    deleteApply,
} from '../../../../../services/components/loznZone/calculation/getApplyRecord';
import { setModal } from '../../../../../store/components/layouts/action';
import { set } from 'lodash';
const RecordComponent = () => {
    const currentAccount = useSelector(store => store.user.currentAccount);
    const [refreshTime, setRefreshTime] = useState('');
    const [tabCurrent, setTabCurrent] = useState(0);
    const [dataLoan, setDataLoan] = useState([]);
    const [dataOther, setDataOther] = useState([]);
    const [totalTL, setTotalTL] = useState(0);
    const [totalTM, setTotalTM] = useState(0);
    const [totalTR, setTotalTR] = useState(0);
    const [stockList, setStockList] = useState([]);
    const [stockAll, setStockAll] = useState([]);
    const [dataAll, setDataAll] = useState([]);
    const [detailList, setDetailList] = useState([]);
    const [moreModalShow, setMoreModalShow] = useState(false);
    const winWidth = useSelector(store => store.layout.winWidth);
    const router = useRouter();
    const dispatch = useDispatch();
    const { isLogin } = useUser();
    useEffect(() => {
        if (!isLogin) {
            dispatch(showLoginHandler(true));
        }
    }, [isLogin]);

    useEffect(() => {
        let params = router.query;
        if (params.tab) {
            setTabCurrent(params.tab);
        }
    }, [router]);

    useEffect(() => {
        let time = moment(new Date()).format('YYYY.MM.DD HH:mm:SS');
        setRefreshTime(time);
    }, []);

    useEffect(() => {
        getApplyRecord();
    }, [currentAccount, refreshTime]);

    useEffect(() => {
        let d_ = dataLoan.concat(dataOther);
        setDataAll(d_);
        totalCount();
    }, [dataLoan]);

    useEffect(() => {
        buildStockList();
    }, [stockList]);

    const totalCount = async () => {
        let TL = 0;
        let TM = 0;
        console.log('[dataLoan]', dataLoan);
        await dataLoan.map((x, i) => {
            TL += Number(x.applyFinancing);
            TM +=
                Number(x.outstanding) +
                Number(x.outstandingFee) +
                Number(x.outstandingStkFee) +
                Number(x.unpaidPledgeFee);
        });
        setTotalTL(TL.toFixed(2));
        setTotalTM(TM.toFixed(2));
    };

    const onRefresh = () => {
        let time = moment(new Date()).format('YYYY.MM.DD HH:mm:ss');
        // getApplyRecord();
        setRefreshTime(time);
    };

    const tabChange = (e, n) => {
        e.preventDefault();
        setTabCurrent(n);
    };

    const getApplyRecord = async () => {
        let token = getToken();
        try {
            const res = await fetchApplyRecord(token, currentAccount.broker_id, currentAccount.account);
            let st_arr = [];
            let dt_arr = [];
            if (res.length > 0) {
                await res.map(async (x, i) => {
                    let d1 = await getRepayment(x.applyDate, x.key);
                    x.detail = d1;
                    dt_arr = dt_arr.concat(d1);

                    let d2 = await getCollateral(x.applyDate, x.key);
                    x.collateral = d2;
                    st_arr = st_arr.concat(d2);
                    if ((res.length = i)) {
                        setDetailList(dt_arr);
                        setStockList(st_arr);
                    }
                    return x;
                });
            } else {
                setDetailList(dt_arr);
                setStockList(st_arr);
            }

            setDataLoan(res);
            const res2 = await applyStatus(token, currentAccount.broker_id, currentAccount.account);
            let res2_ = await res2.filter(x => {
                let arr = ['1', '2', '4', '7', '8'];
                if (arr.includes(x.status)) {
                    return x;
                }
            });
            setDataOther(res2_);
        } catch (error) {
            dispatch(
                setModal({
                    visible: true,
                    title: '系統訊息',
                    content: error,
                    type: 'info',
                    buttonProps: {
                        style: {
                            background: '#c43826',
                        },
                    },
                }),
            );
        }
    };

    const getRepayment = async (date, key) => {
        let token = getToken();
        let dataset = await repaymentDetail(token, currentAccount.broker_id, currentAccount.account, date);
        dataset.map((x, i) => {
            x.group = key;
            x.key = key + i;
            return x;
        });
        return dataset;
    };

    const deleteApplyFunc = async date => {
        let token = getToken();
        dispatch(
            setModal({
                visible: true,
                content: `你確定要取消該筆申請嗎?`,
                type: 'confirm',
                icon: false,
                title: '取消申請',
                onOk: async () => {
                    let ca_content = sign(
                        {
                            idno: currentAccount.idno,
                            broker_id: currentAccount.broker_id,
                            account: currentAccount.account,
                        },
                        true,
                        token,
                        true,
                    );
                    dispatch(setModal({ visible: false }));
                    if (checkSignCA(ca_content)) {
                        let res_ = deleteApply(
                            token,
                            currentAccount.broker_id,
                            currentAccount.account,
                            date,
                            ca_content,
                        ).then(res => {
                            if (res) {
                                dispatch(
                                    setModal({
                                        visible: true,
                                        content: `申請已取消`,
                                        type: 'info',
                                        title: '系統訊息',
                                    }),
                                );
                                onRefresh();
                            } else {
                                dispatch(
                                    setModal({ visible: true, content: `伺服器錯誤`, type: 'info', title: '系統訊息' }),
                                );
                            }
                        });
                    }
                },
            }),
        );
    };

    const getCollateral = async (date, key) => {
        let token = getToken();
        let dataset = await collateralDeatil(token, currentAccount.broker_id, currentAccount.account, date);
        dataset.map((x, i) => {
            x.group = key;
            x.key = key + i;
            return x;
        });
        return dataset;
    };

    const buildStockList = async () => {
        console.log('[buildStockList]', stockList);
        let TR = 0;
        let arr = [];
        let obj = {};
        stockList.map(x => {
            if (x.collateralQty && x.close) {
                let v = Number(x.collateralQty) * Number(x.close);
                // console.log(x.collateralQty,'x',x.close,'=',v);
                TR += v;
            }
            if (Object.keys(obj).includes(x.stockId)) {
                let qty = obj[x.stockId].collateralQty + Number(x.collateralQty);
                obj[x.stockId].collateralQty = qty;
            } else {
                obj[x.stockId] = { stockId: x.stockId, stockName: x.stockName, collateralQty: Number(x.collateralQty) };
            }
        });
        Object.keys(obj).map(x => {
            arr.push(obj[x]);
        });
        setTotalTR(TR.toFixed(2));
        setStockAll(arr);
    };

    const clickHandler = active => {
        let st = stockList;
        console.log(st);
        if (active !== 'all') {
            st = st.filter(x => x.group === active);
        } else {
            st = stockAll;
        }
        dispatch(
            setModal({
                visible: true,
                noCloseIcon: true,
                noTitleIcon: true,
                title: '擔保品明細',
                type: 'info',
                bodyStyle: {
                    height: 230,
                    overflow: 'auto',
                },
                content: (
                    <div className="item_list">
                        {st.length > 0 ? (
                            st.map((x, i) => {
                                return (
                                    <p key={i} className="item_list_row">
                                        <span>
                                            {x.stockId} {x.stockName}
                                        </span>
                                        <span>{x.collateralQty} 張</span>
                                    </p>
                                );
                            })
                        ) : (
                            <p>無資料</p>
                        )}
                    </div>
                ),
                okText: '確認',
                width: '320px',
            }),
        );
    };

    return (
        <div className="record__container">
            {winWidth > 530 && <Breadcrumb />}
            <div className="record__content">
                <h1>借還紀錄</h1>
                <div className="flexBox topBar">
                    <div className="topBarLeft">
                        <button
                            className={tabCurrent == 0 ? 'nav__items active' : 'nav__items'}
                            onClick={e => tabChange(e, 0)}
                        >
                            借款紀錄
                        </button>
                        <button
                            className={tabCurrent == 1 ? 'nav__items active' : 'nav__items'}
                            onClick={e => tabChange(e, 1)}
                        >
                            還款紀錄
                        </button>
                    </div>
                    <div className="topBarRight flexBox">
                        <p className="desc__update forPC">更新時間：{refreshTime} </p>
                        <IconBtn type={'refresh'} onClick={onRefresh.bind(null, 'click')}></IconBtn>
                        <div className="AccountDropdownBox">
                            <AccountDropdown
                                type={'S'}
                                personalAreaVisible={false}
                                tradingLayout={true}
                                width={'100%'}
                                tradingContainerWidth={'100%'}
                            />
                        </div>
                    </div>
                </div>
                <div className="flexBox sunBox">
                    <div className="sumItem">
                        <p>已動用總金額</p>
                        <div>${totalTL}</div>
                    </div>
                    <div className="sumItem">
                        <p>應還款總金額</p>
                        <div>${totalTM}</div>
                    </div>
                    <div className="sumItem">
                        <p>
                            已擔保商品市值
                            <a className="checkMore" onClick={clickHandler.bind(null, 'all')}>
                                擔保明細
                            </a>
                        </p>
                        <div>${totalTR}</div>
                    </div>
                </div>

                <div>
                    {tabCurrent == 0 ? (
                        <RecordLoanTable
                            rowData={dataLoan}
                            rowDataOther={dataOther}
                            stockList={stockList}
                            allData={dataAll}
                            showMore={clickHandler}
                            deleteApplyFunc={deleteApplyFunc}
                        />
                    ) : (
                        <RecordTable
                            rowData={dataLoan}
                            rowDataOther={dataOther}
                            stockList={stockList}
                            detailList={detailList}
                        />
                    )}
                </div>
                <p className="desc__update forM">最後更新時間：{refreshTime} </p>
            </div>
            <style jsx>
                {`
        .record__container {
            width: 80%;
            margin: 0 auto;
            padding-top: 24px;
        }      
        .collateral__content {
            margin-bottom: 32px;
        }
        .sunBox{margin-bottom:20px;}
        .topBar{margin: 10px 0 20px;}
        .topBarRight>*{align-items:center}
        .desc__update{
            color: #3f5372;
            font-size: 14px;
            display: inline-block;
            line-height: 40px;
            margin: 0 13px 0 0;
            vertical-align: middle;
        }
        .AccountDropdownBox{width:230px;margin-left:13px;}
        .record__container .flexBox{display:flex;justify-content:space-between;}
        h1 {
                color: #0d1623;
                font-size: 28px;
                font-weight: bold;
                display: inline-block;
                vertical-align: top;
                margin-right: 35px;
                white-space: nowrap;}
        
        .nav__items:not(:first-child ){margin-left:20px;}
        .nav__items {
            width: 116px;
            height: 40px;
            background-color: #d7e0ef;
            color: #3f5372;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.6rem;
            border-radius: 20px;
            border:none;
            display:inline-block;
        }
        .nav__items.active {
            background-color: #0d1623;
            color: #fff;
        }
        .record__container .sumItem > div {font-size:24px;font-weight:800; text-align:center;}
        .forPC{display:inherite;}
        .forMB{display:none;}
        @media screen and (max-width: 768px) {
            .record__container{width:96%;}
            .topBarRight {text-align:center;margin-top:20px;}
            .topBar .topBarLeft {display:block;}
            .topBarLeft .nav__items {}
            .record__container .sumItem{width:50%;}
            .record__container .sumItem>div{font-size:16px;}
            .record__container .sumItem>p{font-size:14px;color:#3f5372;}
            .record__container .sumItem:nth-child(3){width:100%;margin-top:20px;}
            .desc__update{font-size:14px;text-align:center;color:#3f5372;line-height:2;width:100%;}
            .forPC{display:none;}
            .forMB{display:inherite;}
        }

            }`}
            </style>
            <style jsx global>
                {`
                    .record__container .checkMore_b {
                        display: block;
                        color: #daa360;
                        text-align: right;
                        font-size: 14px;
                    }
                    .record__container .checkMore_b::after {
                        content: '';
                        display: inline-block;
                        width: 8px;
                        height: 8px;
                        border: 2px solid #daa360;
                        border-width: 2px 2px 0 0;
                        transform: rotate(45deg) translateY(-1px);
                        margin-left: 4px;
                    }
                    .record__container .sumItem p .checkMore {
                        position: absolute;
                        right: 10px;
                        color: #0d1623;
                        font-size: 14px;
                    }
                    .record__container .sumItem p .checkMore::after {
                        content: '';
                        display: inline-block;
                        width: 8px;
                        height: 8px;
                        border: 2px solid #0d1623;
                        border-width: 2px 2px 0 0;
                        transform: rotate(45deg) translateY(-1px);
                        margin-left: 4px;
                    }
                    .item_list .item_list_row {
                        display: flex;
                        justify-content: space-between;
                    }
                    .item_list .item_list_row span:last-child {
                        text-align: right;
                    }
                    .record__Modal .title__box {
                        margin: 0;
                    }
                    .record__Modal .ant-modal-body {
                        max-height: 11.5em;
                        overflow-y: scroll;
                    }
                    .record__Modal .ant-modal-body p {
                        line-height: 1em;
                    }
                    .record__Modal .title {
                        color: #0d1623;
                        font-weight: 800;
                        font-size: 20px;
                    }

                    .record__Modal .ant-btn.ant-btn-primary {
                        background: #c43826;
                        border-color: #c43826;
                    }
                    .page__container {
                        background-color: #f9fbff;
                        padding-bottom: 32px;
                    }
                    .flexBox {
                        display: flex;
                    }
                    .RecordTable__Content.flexBox {
                        justify-content: flex-start;
                    }
                    .record__container .sumItem {
                        width: 32.5%;
                        border: solid 1px #d7e0ef;
                        background-color: #fff;
                    }
                    .record__container .sumItem p {
                        font-size: 16px;
                        color: #3f5372;
                        line-height: 39px;
                        text-align: center;
                        border-bottom: solid 1px #d7e0ef;
                        background-color: #f2f5fa;
                        margin-bottom: 0;
                        position: relative;
                    }

                    .record__container .sumItem .noData {
                        font-size: 16px;
                        color: #3f5372;
                        width: 100%;
                        line-height: 1.5;
                        text-align: center;
                    }
                    .record__container .sumItem a {
                    }
                    .record__container .sumItem > div {
                        padding: 14px 20px;
                    }
                    .RecordTable__Content {
                        padding-left: 7%;
                    }
                    .RecordTable__Content .sumItem {
                        max-width: 304px;
                    }
                    .RecordTable__Content .sumItem :not(:first-child) {
                        margin-left: 15px;
                    }
                    .RecordTable__Content .sumItem table.detail td:first-child {
                        width: 50%;
                        text-align: left;
                    }
                    .RecordTable__Content .sumItem table.detail td:last-child {
                        width: 50%;
                        text-align: right;
                    }
                    .RecordTable__Content.Loan {
                        padding-left: 18%;
                    }
                    .record__container .repayment_table .ant-table-thead th:first-child::after {
                        content: '明細';
                    }
                    @media screen and (max-width: 768px) {
                        .flexBox {
                            flex-wrap: wrap;
                        }
                    }
                `}
            </style>
        </div>
    );
};
export default RecordComponent;
