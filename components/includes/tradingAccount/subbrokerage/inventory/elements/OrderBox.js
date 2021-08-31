import { useEffect, useRef, useState, useCallback ,useMemo} from 'react';
import { useSelector, useDispatch } from "react-redux";
import SearchAutoComplete from '../../../vipInventory/SearchAutoComplete';
import ChangeNum from '../../../../goOrder/searchList/ChangeNum';
import { themeColor } from '../../../../goOrder/panel/PanelTabs';
import { Select, Switch ,Button,Tabs  } from 'antd';
import { UserOutlined } from '@ant-design/icons';
const OrderBox = () => {
const touch = useSelector(store => store.goOrderSB.touch);
const bs = useSelector(store => store.goOrderSB.bs);
const productInfo = useSelector(store => store.goOrder.productInfo);
const stockInfo = useSelector(store => store.goOrderSB.stockInfo);
const queryQty = useSelector(store => store.goOrderSB.queryQty);
const [disabledPlus, setDisabledPlus] = useState(false);
const currentAccount = useSelector(store => store.user.currentAccount);
const [data, setData] = useState({}); 
const [current, setCurrent] = useState('inventory'); 
const [color, setColor] = useState(null); 
const selected = useRef(false);
const selectSymbol = useRef('');
const [val, setVal] = useState('');
const { Option } = Select;
const { TabPane } = Tabs;
useEffect(() => {
}, []);
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
const handleChange = useCallback(val => {
});
const onChange = useCallback(val => {
});
const onTabChange = useCallback(val => {
});
const plusHandler = useCallback((val, productInfo) => {
    if (isNaN(parseFloat(val))) {
        return;
    } else {
        const pt = getPriceJumpPoint(productInfo?.market, val, false);
        let tickPointLen = pt.toString().indexOf('.') > 0 ? pt.toString().split('.')[1].length : 0;
        const prevValue = parseFloat(parseFloat(val).toFixed(tickPointLen));
        setVal(parseFloat(prevValue + pt).toFixed(tickPointLen));
    }
});

const minusHandler = useCallback((val, productInfo) => {
    if (isNaN(parseFloat(val))) {
        return;
    } else {
        const pt = getPriceJumpPoint(productInfo?.market, val, true);
        let tickPointLen = pt.toString().indexOf('.') > 0 ? pt.toString().split('.')[1].length : 0;
        const prevValue = parseFloat(parseFloat(val).toFixed(tickPointLen));
        if (prevValue - pt <= 0) {
            setVal(parseFloat(pt).toFixed(tickPointLen));
        } else {
            setVal(parseFloat(prevValue - pt).toFixed(tickPointLen));
        }
    }
});

const changeHandler = useCallback(value => {
    setVal(value);
});
    return (
        <div className="left_box subBrokerage">
        <div className="left_box_inner">
        <div className="ctrl_item"><SearchAutoComplete
            selectHandler={selectHandler}
            onChange={onSeChangeHandler}
            width={'100%'}
            height={'40px'}
            selectedHandler={selectedHandler}
        /></div>
        <div className="tab_box">
        <Tabs defaultActiveKey="1" onChange={onTabChange}>
            <TabPane tab="買進" key="1"> </TabPane>
            <TabPane tab="賣出" key="2"></TabPane>
            <TabPane tab="常用股號" key="3"></TabPane>
        </Tabs>
        </div>
        <div className="ctrl_item"><ChangeNum
            title={'價格'}
            color={bs === 'B' ? themeColor.buyTabColor : themeColor.sellTabColor}
            textAlign={'center'}
            inputWidth={'calc(100% - 100px - 54px - 8px)'}
            style={{ width: '100%' }}
            val={val}
            plusClickHandler={plusHandler.bind(null, val, productInfo)}
            minusClickHandler={minusHandler.bind(null, val, productInfo)}
            changeHandler={changeHandler}
        /></div>
        <div className="ctrl_item"><ChangeNum
            title={'股數'}
            color={color == null ? (bs === 'B' ? themeColor.buyTabColor : themeColor.sellTabColor) : color}
            textAlign={'center'}
            inputWidth={'calc(100% - 100px - 54px - 8px)'}
            style={{ width: '100%' }}
            changeHandler={changeHandler}
            val={val}
            minusClickHandler={minusHandler.bind(null, val, stockInfo)}
            disabledPlus={disabledPlus}
        /></div>
        <div className="ctrl_item mt-8 ctrl_item_select"><span>條件</span>
            <Select defaultValue="ANY" style={{ width: 110 }} onChange={handleChange}  size="large">
                <Option value="ANY">ANY</Option>
                <Option value="AON">AON</Option>
            </Select>
        </div>
        <div className="ctrl_item mt-8"><span>長效單</span><Switch onChange={onChange} /></div> 
        <div className="ctrl_item mt-8 submit_box">
        <Button type="primary" size="large" >委託買進</Button><br></br>
        <Button size="large">加入暫存夾</Button>
        </div>
        <div className="text_view">預估金額 4,325元(台幣)</div>
        </div>
            <style jsx>
                {`
                .left_box{padding:15px 0;}
                .left_box_inner{width:100%;position:relative;}
                .mt-8{margin-top: 8px;}
                .ctrl_item{line-height:46px;padding:0 25px;}
                .ctrl_item.submit_box{margin-top:90px;}
                .ctrl_item > span{width: 62px; display:inline-block; font-size: 1.6rem;color: #0d1623; }
                .text_view{ opacity: 0.7; font-family: PingFangTC, Arial; font-size: 16px; font-weight: 900;line-height:2;margin-top:20px;text-align:center;}
                .tab_box {margin-top:20px;}
                `}
            </style>
            <style jsx global>
                {`
                .subBrokerage .tab_box .ant-tabs-nav-wrap{padding:0;}
                .subBrokerage .tab_box .ant-tabs .ant-tabs-tab{justify-content: center;width:33.3%;margin:0;}
                .subBrokerage .tab_box .ant-tabs>.ant-tabs-nav .ant-tabs-nav-list{width: 100%;}
                .subBrokerage .price_control{display: flex; flex-wrap: nowrap;}
                .subBrokerage .price_control .btn__box-modal{display: flex; flex-wrap: nowrap;}
                .subBrokerage .ctrl_item_select .ant-select-selector,
                .subBrokerage .ctrl_item_select .ant-select-single:not(.ant-select-customize-input) .ant-select-selector{
                    border-color: transparent; background-color: ${bs === 'B' ? themeColor.buyTabColor : themeColor.sellTabColor};
                    color: #FFF; border-color: transparent;}
                .subBrokerage .ant-select-single .ant-select-arrow{color:#FFF}
                .subBrokerage .submit_box button{ width: 100%; line-height: 50px; height: 60px;margin:4px auto;}
                .subBrokerage .submit_box .ant-btn-primary{background-color: ${bs === 'B' ? themeColor.buyTabColor : themeColor.sellTabColor};
                border-color: ${bs === 'B' ? themeColor.buyTabColor : themeColor.sellTabColor}}
                `}
            </style>
        </div>
    );
};

export default OrderBox;
