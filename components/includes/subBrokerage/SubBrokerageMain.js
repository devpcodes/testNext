import { useEffect, useState, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TabBar from './elements/TabBar';
import TradingAccount from '../tradingAccount/subbrokerage/inventory/page/TradingAccount';
import OrderStatusPage from '../tradingAccount/subbrokerage/orderStatus/page/OrderStatusPage';
import GtcPage from '../tradingAccount/subbrokerage/gtc/page/GtcPage';
//import { GetArticleData } from '../../../../services/components/announcement/announceList';

const SubBrokerMain = () => {
    const [current, setCurrent] = useState('order');
    const menuList = [
        { key: 'order', title: '委回' },
        { key: 'deal', title: '成交' },
        { key: 'gtc', title: 'GTC(長效單)明細' },
        { key: 'inventory', title: '即時庫存' },
        { key: 'holding', title: '持股賣出' },
    ];
    // useEffect(() =>{
    //     const GetNewData = async()=>{
    //         try {
    //             let id = getParamFromQueryString('GUID'); //GUID
    //             let count =  '3'; //相關公告筆數
    //             getData(id, count)
    //             .then(res=>{
    //                 setData(res)
    //                 setTag(res.keyWord)
    //                 setRefRows(res.refRows)
    //             })
    //             } catch(error) {
    //             console.log('[error]',error)
    //             }
    //         }
    //     GetNewData()
    // },[refresh])

    // const getData = async (id, count) => {
    //     try{
    //         const result = await GetArticleData(id, count)
    //         return result
    //     } catch(err) {
    //         console.log('[ERROR]',err)
    //         Modal.error({
    //             title: '伺服器錯誤',
    //         });
    //     }
    // }
    const onClick = x => {
        setCurrent(x);
    };
    return (
        <div className="page__container subBrokerage">
            <div className="content_area">
                <div className="content_box">
                    <TabBar onClick={onClick} current={current} menuList={menuList}></TabBar>
                </div>
                <div className="content_box">
                    {(() => {
                        console.log('current', current);
                        switch (current) {
                            case 'order':
                                return <OrderStatusPage />;
                                break;
                            case 'deal':
                                return '第二頁';
                                break;
                            case 'gtc':
                                return <GtcPage />;
                                break;
                            case 'inventory':
                                return <TradingAccount />;
                                break;
                            case 'holding':
                                return '第五頁';
                                break;
                            default:
                                return null;
                        }
                    })()}
                </div>
            </div>

            <style jsx>
                {`
                    .page__container.subBrokerage {
                        padding: 20px 0;
                    }
                    .page__container.subBrokerage .content_area {
                        max-width: 1240px;
                        width: 90%;
                        margin: 0 auto;
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
