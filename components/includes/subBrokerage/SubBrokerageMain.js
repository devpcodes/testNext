import { useEffect, useState, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TopTabBar from './elements/TopTabBar';
import Inventory from '../tradingAccount/subbrokerage/inventory/page/Inventory';
import AccBalance from '../tradingAccount/subbrokerage/inventory/page/AccBalance';
import Unrealized from '../tradingAccount/subbrokerage/inventory/page/Unrealized';
import OrderStatusPage from '../tradingAccount/subbrokerage/orderStatus/page/OrderStatusPage';
import GtcPage from '../tradingAccount/subbrokerage/gtc/page/GtcPage';
import DealPageComponent from '../tradingAccount/subbrokerage/deal/page/DealPageComponent.js';
import ShareholdingPage from '../tradingAccount/subbrokerage/shareholding/page/ShareholdingPage';
import BatchPage from '../tradingAccount/subbrokerage/batchSubbrokerage/page/BatchPage';
import OrderBox from '../tradingAccount/subbrokerage/inventory/elements/OrderBox';
// import { useAutoSelectAccount } from '../../../hooks/useAutoSelectAccount';
// import { accountGroupByType } from '../../../services/user/accountGroupByType';
// import { setCurrentAccount } from '../../../store/user/action';
//import { GetArticleData } from '../../../../services/components/announcement/announceList';

const SubBrokerMain = () => {
    // const accounts = useSelector(store => store.user.accounts);
    const [current, setCurrent] = useState('order');
    const [orderDataN, setOrderDataN] = useState('');
    const [orderBoxCtrl, setOrderBoxCtrl] = useState(true);
    // const dispatch = useDispatch();
    const menuList = [
        { key: 'order', title: '委回' },
        { key: 'deal', title: '成交' },
        { key: 'gtc', title: 'GTC(長效單)明細' },
        { key: 'inventory', title: '即時庫存' },
        { key: 'balance', title: '帳戶餘額' },
        { key: 'unrealized', title: '未實現損益' },
        { key: 'holding', title: '持股賣出' },
        { key: 'batch', title: '暫存夾' },
    ];

    const onClick = x => {
        setCurrent(x);
    };
    const onChange = () => {
        let status = orderBoxCtrl;
        setOrderBoxCtrl(!status);
    };

    const toOrderBox = data => {
        console.log('SBM', data);
        setOrderDataN(data);
    };

    // useEffect(() => {
    //     setTimeout(() => {
    //         const groupedAccount = accountGroupByType(accounts);
    //         if (groupedAccount['H'] != null && groupedAccount['H']?.length > 0) {
    //             console.log('changeCurrentAccount');
    //             dispatch(setCurrentAccount(groupedAccount['H'][0]));
    //         }
    //     }, 1000);
    // }, [current]);

    return (
        <div className="page__container subBrokerage">
            <div className="left_area">
                <div className="left_ctrl_box">
                    <div>
                        <OrderBox orderData={orderDataN}></OrderBox>
                    </div>
                </div>
                <a className="ctrl_btn" onClick={onChange}></a>
            </div>
            <div className="right_area content_area">
                <div className="content_box--nav">
                    <TopTabBar onClick={onClick} current={current} menuList={menuList}></TopTabBar>
                </div>
                <div className="content_box">
                    {(() => {
                        console.log('[current]', current);
                        switch (current) {
                            case 'order':
                                return <OrderStatusPage />;
                            case 'deal':
                                return <DealPageComponent />;
                            case 'gtc':
                                return <GtcPage />;
                            case 'inventory':
                                return <Inventory toOrderBox={toOrderBox} />;
                            case 'balance':
                                return <AccBalance />;
                            case 'unrealized':
                                return <Unrealized toOrderBox={toOrderBox} />;
                            case 'holding':
                                return <ShareholdingPage />;
                            case 'batch':
                                return <BatchPage />;
                            default:
                                return null;
                        }
                    })()}
                </div>
            </div>

            <style jsx>
                {`
                    .page__container.subBrokerage {
                        min-height: 960px;
                        padding: 0;
                        display: flex;
                        align-items: stretch;
                    }
                    .page__container.subBrokerage .content_area {
                        width: 100%;
                        margin: 0 auto;
                    }
                    .page__container.subBrokerage .right_area {
                        overflow: hidden;
                        padding: 15px 40px 15px 30px;
                        background-color: #f9fbff;
                        flex-shrink: 383px;
                    }
                    .page__container.subBrokerage .left_area {
                        position: relative;
                    }
                    .page__container.subBrokerage .left_ctrl_box {
                        position: relative;
                        width: ${orderBoxCtrl ? 383 : 15}px;
                        transition: width 0.8s;
                        border-right: 1px solid #e6ebf5;
                        overflow: hidden;
                        min-height: 100%;
                    }
                    .page__container.subBrokerage .left_ctrl_box > div {
                        min-width: 383px;
                        ${orderBoxCtrl ? '' : 'opacity:0%;'};
                        transition: opacity 0.8s;
                    }
                    .page__container.subBrokerage .left_area .ctrl_btn {
                        position: absolute;
                        right: -10px;
                        bottom: 20%;
                        margin-left: 10px;
                        width: 20px;
                        line-height: 40px;
                        display: inline-block;
                        padding: 0;
                        text-align: center;
                        background: #fff;
                        border: 1px solid #ddd;
                        border-radius: 2px;
                        height: 40px;
                    }
                    .page__container.subBrokerage .left_area .ctrl_btn::after {
                        display: block;
                        content: '';
                        width: 10px;
                        height: 10px;
                        border: 2px solid #666;
                        transform-origin: 20% 50%;
                        border-width: 0 0 2px 2px;
                        transform: translate(${orderBoxCtrl ? '60%, 30%' : '60%, 70%'})
                            rotate(${orderBoxCtrl ? '45' : '-135'}deg);
                        margin-top: 50%;
                        transition: transform 0.5s;
                    }
                    .content_box--nav {
                        /*margin-top: ${current === 'unrealized' ? '150px' : '65px'};*/
                        margin-top: 65px;
                    }
                `}
            </style>
            <style jsx global>
                {``}
            </style>
        </div>
    );
};

export default SubBrokerMain;
