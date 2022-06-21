import { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Breadcrumb from '../../../breadcrumb/breadcrumb';
import moment from 'moment';
import closeIcon from '../../../../../resources/images/components/loanZone/menu-close-big (1).svg';
import { Modal, Select, Button, Input, Checkbox, InputNumber } from 'antd';
import { getToken } from '../../../../../services/user/accessToken';
import { useCheckMobile } from '../../../../../hooks/useCheckMobile';
import { AccountDropdown } from '../../../personalArea/accountDropdown/AccountDropdown';
import IconBtn from '../../../tradingAccount/vipInventory/IconBtn';
import RecordTable from '../elements/RecordTable';
import RecordLoanTable from '../elements/RecordLoanTable';
import {
    repaymentDetail,
    collateralDeatil,
    fetchApplyRecord,
    applyStatus,
} from '../../../../../services/components/loznZone/calculation/getApplyRecord';
import { setModal } from '../../../../../store/components/layouts/action';
const RecordComponent = () => {
    const currentAccount = useSelector(store => store.user.currentAccount);
    const [refreshTime, setRefreshTime] = useState('');
    const [tabCurrent, setTabCurrent] = useState(0);
    const [dataLoan, setDataLoan] = useState([]);
    const [dataOther, setDataOther] = useState([]);
    const [totalTL, setTotalTL] = useState(0);
    const [totalTM, setTotalTM] = useState(0);
    const [totalTR, setTotalTR] = useState(0);
    const [stockList, setStockList] = useState({});
    const [moreModalShow, setMoreModalShow] = useState(false);
    const [moreModalData, setMoreModalData] = useState([]);
    const winWidth = useSelector(store => store.layout.winWidth);
    const router = useRouter();
    const dispatch = useDispatch();
    useEffect(() => {
        let params = router.query;
        if (params.tab) {
            setTabCurrent(params.tab);
        }
    }, [router]);

    useEffect(async () => {
        let data = await getApplyRecord();
        if (data) {
            setDataLoan(data.applyRecord);
            setDataOther(data.applyStatus);
        }
    }, [currentAccount]);

    useEffect(async () => {
        totalCount();
    }, [dataLoan]);

    useEffect(async () => {
        buildStockList();
    }, [dataLoan]);

    useEffect(() => {
        let time = moment(new Date()).format('YYYY.MM.DD HH:mm:SS');
        setRefreshTime(time);
    });

    const totalCount = async () => {
        let TL = 0;
        let TM = 0;
        let TR = 0;
        await dataLoan.map(x => {
            TL += parseInt(x.applyFinancing);
            TM +=
                parseInt(x.outstanding) +
                parseInt(x.outstandingFee) +
                parseInt(x.outstandingStkFee) +
                parseInt(x.unpaidPledgeFee);
            let e = 0;
            if (x.collateral) {
                x.collateral.map(y => {
                    e += parseInt(y.collateralQty) * y.close;
                });
            }
            TR += e;
        });
        setTotalTL(TL);
        setTotalTM(TM);
        console.log('TR', TR);
        if (TR != 0) {
            setTotalTR(TR);
        }
    };

    const countCollateral = () => {};

    const onRefresh = e => {
        e.preventDefault();
        let time = moment(new Date()).format('YYYY.MM.DD HH:mm:ss');
        getApplyRecord();
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
            await res.map(async (x, i) => {
                let dataset = await getDetail(x.applyDate);
                x.detail = dataset;
                let collateral = await getCollateralDeatil(x.applyDate);
                x.collateral = collateral;
            });
            buildStockList(res);
            const res2 = await applyStatus(token, currentAccount.broker_id, currentAccount.account);
            let res2_ = await res2.filter(x => {
                let arr = ['1', '2', '4', '7', '8'];
                if (arr.includes(x.status)) {
                    return x;
                }
            });
            return {
                applyRecord: res,
                applyStatus: res2_,
            };
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

    const getDetail = async date => {
        let token = getToken();
        let dataset = await repaymentDetail(token, currentAccount.broker_id, currentAccount.account, date);
        return dataset;
    };

    const getCollateralDeatil = async date => {
        let token = getToken();
        let dataset = await collateralDeatil(token, currentAccount.broker_id, currentAccount.account, date);
        return dataset;
    };

    const moreModalHandler = data => {
        setMoreModalShow(data[0]);
        setMoreContent(data[1]);
    };

    const setMoreContent = a => {
        if (a == 'clear') {
            setMoreModalData([]);
        } else if (a == 'all') {
            setMoreModalData([]);
        }
    };

    const buildStockList = () => {
        let arr = [];
        dataLoan.map(x => {
            x.collateral.map(y => {
                let obj = {
                    group: x.key,
                    stockId: y.stockId,
                    stockName: y.stockName,
                    qty: y.collateralQty,
                    close: y.close,
                };
                arr.push(obj);
            });
        });
        if (arr.length > 0) {
            setStockList(arr);
        }
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
                        <p className="desc__update">更新時間：{refreshTime} </p>
                        <IconBtn type={'refresh'} onClick={e => onRefresh(e)}></IconBtn>
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
                            <a className="checkMore" onClick={moreModalHandler.bind(null, [true, 'clear'])}>
                                擔保明細
                            </a>
                        </p>
                        <div>${totalTR}</div>
                    </div>
                </div>

                <div>
                    {tabCurrent == 0 ? (
                        <RecordLoanTable rowData={dataLoan} rowDataOther={dataOther} stockList={stockList} />
                    ) : (
                        <RecordTable />
                    )}
                </div>
                <Modal
                    className="record__Modal"
                    title={
                        <p className="title__box">
                            <span className="title">贖回擔保品明細</span>
                        </p>
                    }
                    visible={moreModalShow}
                    width={320}
                    height={240}
                    onCancel={null}
                    closable={false}
                    footer={[
                        <Button type="primary" onClick={moreModalHandler.bind(null, [false, 'all'])}>
                            確認
                        </Button>,
                    ]}
                >
                    <div className="item_list">
                        {stockList.length > 0 ? (
                            stockList.map((x, i) => {
                                return (
                                    <p key={i} className="item_list_row">
                                        <span>
                                            {x.stockId} {x.stockName}
                                        </span>
                                        <span>{x.qty} 張</span>
                                    </p>
                                );
                            })
                        ) : (
                            <p>無資料</p>
                        )}
                    </div>
                </Modal>
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

            }`}
            </style>
            <style jsx global>
                {`
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
                    .record__container .sumItem p .checkMore {
                        position: absolute;
                        right: 10px;
                        color: 0d1623;
                        font-size: 14px;
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
                `}
            </style>
        </div>
    );
};
export default RecordComponent;
