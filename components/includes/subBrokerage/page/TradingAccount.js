import { useEffect, useState, useCallback ,useMemo} from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Modal } from 'antd';
import TabBar  from '../elements/TabBar';
import Inventory from '../../tradingAccount/subbrokerage/inventory/Inventory';
import Balance from '../../tradingAccount/subbrokerage/inventory/Balance';

const TradingAccount = () => {
const currentAccount = useSelector(store => store.user.currentAccount);
const [data, setData] = useState({}); 
const [current, setCurrent] = useState('inventory'); 
const menuList = [
    {title:'庫存', key:'inventory'},
    {title:'帳戶餘額', key:'balance'},
    {title:'未實現損益', key:'unrealized'}
]
useEffect(() => {
}, []);

const onClick = (x) =>{
    setCurrent(x)
}

    return (
        <div className="content_box subBrokerage">
            <TabBar
            onClick={onClick}
            current = { current }
            menuList = {menuList}
            ></TabBar>
        <div className="content_box_inner">
        {(() => {
            switch (current) {
                case 'inventory':
                    return <Inventory/>;
                    break;
                case 'balance':
                    return <Balance/>;
                    break;
                case 'unrealized':
                    return '第三頁';
                    break;
                default:
                    return null;
            }
        })()}
        </div>
            <style jsx>
                {`
                .content_box_inner {margin-top:15px;}
                `}
            </style>
            <style jsx global>
                {`

                `}
            </style>

        </div>
    );
};

export default TradingAccount;
