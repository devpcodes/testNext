import { useEffect, useRef, useState, useCallback ,useMemo} from 'react';
import { useSelector, useDispatch } from "react-redux";
import SearchAutoComplete from '../../../vipInventory/SearchAutoComplete';
import { Tabs  } from 'antd';
import OrderBoxBS  from './OrderBoxBS';
import { SearchOutlined } from '@ant-design/icons';

const OrderBox = () => {
const [current, setCurrent] = useState('B'); 
const selected = useRef(false);
const selectSymbol = useRef('');
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
});

const selectedHandler = useCallback(bol => {
    selected.current = bol;
});

const onTabChange = useCallback(val => {
    setCurrent(val)
});

    return (
        <div className="left_box subBrokerage">
        <div className="left_box_inner">
        {(() => {
            switch (current) {
                case 'B': case 'S':
                    return (
                    <div className="ctrl_item">
                        <div className="search_box">
                        <SearchOutlined 
                        style={{ fontSize: '16px', color: '#333' }}
                        />
                        <SearchAutoComplete
                        selectHandler={selectHandler}
                        onChange={onSeChangeHandler}
                        width={'100%'}
                        height={'40px'}
                        selectedHandler={selectedHandler}
                        placeholder={'股票代號／名稱'}
                        />
                        </div>
                    </div>                    
                        )
                case 'N':
                    return '常用股的搜尋放這兒'
                default:
                    return null;
            }
        })()}

        <div className="tab_box">
        <Tabs defaultActiveKey="B" onChange={onTabChange}>
            <TabPane tab="買進" key="B"> </TabPane>
            <TabPane tab="賣出" key="S"></TabPane>
            <TabPane tab="常用股號" key="N"></TabPane>
        </Tabs>
        </div>
        {(() => {
            switch (current) {
                case 'B': case 'S':
                    return <OrderBoxBS type={current}/>
                case 'N':
                    return '常用股放這'
                default:
                    return null;
            }
        })()}

        </div>
            <style jsx>
                {`
                .search_box{display:flex;align-items:center;border:1px solid #e6ebf5;border-radius:2px;padding:0 10px;}
                .ctrl_item{min-height:46px;padding:0 25px;}
                .left_box{padding:15px 0;}
                .left_box_inner{width:100%;position:relative;}
                .tab_box {margin-top:20px;}

                `}
            </style>
            <style jsx global>
                {`
                .subBrokerage .left_box_inner .search_box .autoComplete__container{margin-left:10px;}
                .subBrokerage .left_box_inner .search_box .ant-select-selector{border:none!important;}
                .subBrokerage .left_box_inner .search_box .ant-select{vertical-align:super;}
                .subBrokerage .left_box_inner .search_box .ant-select-selection-placeholder{line-height:40px;}
                .subBrokerage .left_box_inner .ant-tabs-nav-wrap{padding:0;}
                .subBrokerage .left_box_inner .ant-tabs .ant-tabs-tab{justify-content: center;width:33.3%;margin:0;font-size:16px;}
                .subBrokerage .left_box_inner .ant-tabs .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn{color:#f45a4c;}
                .subBrokerage .left_box_inner .ant-tabs .ant-tabs-ink-bar{background:#f45a4c;height:4px;}
                .subBrokerage .left_box_inner .ant-tabs>.ant-tabs-nav .ant-tabs-nav-list{width: 100%;}
                .subBrokerage .left_box_inner .search_box .ant-select-selector,.ant-select:hover .ant-select-selector,
                .ant-select:focus .ant-select-selector { border:none; box-shadow: none !important; }
                `}
            </style>
        </div>
    );
};

export default OrderBox;
