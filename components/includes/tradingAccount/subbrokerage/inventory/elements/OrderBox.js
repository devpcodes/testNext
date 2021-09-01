import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SearchAutoComplete from '../../../vipInventory/SearchAutoComplete';
import ChangeNum from '../../../../goOrder/searchList/ChangeNum';
import { themeColor } from '../../../../goOrder/panel/PanelTabs';
import { Select, Switch, Button, Tabs } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import OrderBoxBS from './OrderBoxBS';
import { setPrice, setQueryPrice, setSBBs } from '../../../../../../store/goOrderSB/action';
import SymbolList from '../../../../subBrokerage/elements/SymbolList';
const OrderBox = () => {
    const [current, setCurrent] = useState('B');
    const selected = useRef(false);
    const selectSymbol = useRef('');
    const { TabPane } = Tabs;
    useEffect(() => {}, []);
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

    const selectedHandler = useCallback(bol => {
        selected.current = bol;
    });

    const onTabChange = useCallback(val => {
        setCurrent(val);
    });

    return (
        <div className="left_box subBrokerage">
            <div className="left_box_inner">
                <div className="ctrl_item">
                    <SearchAutoComplete
                        selectHandler={selectHandler}
                        onChange={onSeChangeHandler}
                        width={'100%'}
                        height={'40px'}
                        selectedHandler={selectedHandler}
                    />
                </div>
                <div className="tab_box">
                    <Tabs defaultActiveKey="B" onChange={onTabChange}>
                        <TabPane tab="買進" key="B">
                            {' '}
                        </TabPane>
                        <TabPane tab="賣出" key="S"></TabPane>
                        <TabPane tab="常用股號" key="N"></TabPane>
                    </Tabs>
                </div>
                {(() => {
                    switch (current) {
                        case 'B':
                        case 'S':
                            return <OrderBoxBS type={current} />;
                        case 'N':
                            return <SymbolList />;
                        default:
                            return null;
                    }
                })()}
            </div>
            <style jsx>
                {`
                    .left_box {
                        padding: 15px 0;
                    }
                    .left_box_inner {
                        width: 100%;
                        position: relative;
                    }
                    .tab_box {
                        margin-top: 20px;
                    }
                `}
            </style>
            <style jsx global>
                {`
                    .subBrokerage .left_box_inner .ant-tabs-nav-wrap {
                        padding: 0;
                    }
                    .subBrokerage .left_box_inner .ant-tabs .ant-tabs-tab {
                        justify-content: center;
                        width: 33.3%;
                        margin: 0;
                    }
                    .subBrokerage .left_box_inner .ant-tabs > .ant-tabs-nav .ant-tabs-nav-list {
                        width: 100%;
                    }
                `}
            </style>
        </div>
    );
};

export default OrderBox;
