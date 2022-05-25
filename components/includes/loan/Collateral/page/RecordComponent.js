import { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Breadcrumb from '../../../breadcrumb/breadcrumb';
import moment from 'moment';
import Modal from 'antd/lib/modal/Modal';
import { useCheckMobile } from '../../../../../hooks/useCheckMobile';
import { AccountDropdown } from '../../../personalArea/accountDropdown/AccountDropdown';
import IconBtn from '../../../tradingAccount/vipInventory/IconBtn';
import RecordTable from '../elements/RecordTable';
import RecordLoanTable from '../elements/RecordLoanTable';

const RecordComponent = () => {
    const [refreshTime, setRefreshTime] = useState('');
    const [tabCurrent, setTabCurrent] = useState(0);
    const isMobile = useCheckMobile();
    const winWidth = useSelector(store => store.layout.winWidth);
    const router = useRouter();

    useEffect(() => {
        console.log('[params]', router.query);
        let params = router.query;
        if (params.tab) {
            setTabCurrent(params.tab);
        }
    }, [router]);
    useEffect(() => {
        let time = moment(new Date()).format('YYYY.MM.DD HH:mm:SS');
        setRefreshTime(time);
    });
    const refreshClickHandler = () => {
        setCurrentTime(moment().format('YYYY.MM.DD HH:mm'));
        onRefresh();
    };
    const onRefresh = e => {
        e.preventDefault();
        let r = refresh;
        let time = moment(new Date()).format('YYYY.MM.DD HH:mm:ss');
        setRefreshTime(time);
        setRefresh(r + 1);
    };

    const tabChange = (e, n) => {
        e.preventDefault();
        setTabCurrent(n);
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
                        <p>借款總金額</p>
                        <div>$135,000</div>
                    </div>
                    <div className="sumItem">
                        <p>應還款總金額</p>
                        <div>$135,000</div>
                    </div>
                    <div className="sumItem">
                        <p>
                            已擔保商品市值<a className="checkMore">擔保明細</a>
                        </p>
                        <div>$135,000</div>
                    </div>
                </div>

                <div>{tabCurrent == 0 ? <RecordLoanTable /> : <RecordTable />}</div>
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
