import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tabs } from 'antd';
import OrderBoxBS from './OrderBoxBS';
import SymbolList from '../../../../subBrokerage/elements/SymbolList';
import SymbolInput from '../../../../subBrokerage/elements/SymbolInput';
import { themeColor } from '../../../../goOrder/panel/PanelTabs';
const OrderBox = () => {
    const [current, setCurrent] = useState('B');
    const [tabColor, setTabColor] = useState(themeColor.buyTabColor);
    const selected = useRef(false);
    const selectSymbol = useRef('');
    const { TabPane } = Tabs;
    useEffect(() => {
        if (current == 'B') {
            setTabColor(themeColor.buyTabColor);
            console.log('BUY');
        } else if (current == 'S') {
            setTabColor(themeColor.sellTabColor);
            console.log('SELL');
        } else {
            setTabColor(themeColor.tradingAccColor);
            console.log('OTHER');
        }
    }, [current]);

    const selectHandler = useCallback(async val => {
        const symbol = val.split(' ')[0];
        try {
            const res = await fetchSnapshot([symbol]);
            if (Array.isArray(res) && res.length > 0) {
                console.log('[DATA]', res);
                if (res[0].UpLimit == 9999.95) {
                    setPriceVal(formatPriceByUnit(symbol, res[0].Close * 1.2));
                } else {
                    setPriceVal(formatPriceByUnit(symbol, res[0].UpLimit));
                }
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
                {(() => {
                    switch (current) {
                        case 'B':
                        case 'S':
                            return <div className="space_box"></div>;
                        case 'N':
                            return <SymbolInput />;
                        default:
                            return null;
                    }
                })()}
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
                            return (
                                <SymbolList
                                    style={{
                                        marginTop: '-15px',
                                    }}
                                />
                            );
                        default:
                            return null;
                    }
                })()}
            </div>
            <style jsx>
                {`
                    .space_box {
                        height: 85px;
                    }
                    .ctrl_item {
                        min-height: 46px;
                        padding: 0 25px;
                    }
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
                    .subBrokerage .left_box_inner .ant-tabs-tab-btn:active,
                    .subBrokerage .left_box_inner.ant-tabs-tab-btn:focus,
                    .subBrokerage .left_box_inner .ant-tabs-tab-remove:active,
                    .subBrokerage .left_box_inner .ant-tabs-tab-remove:focus,
                    .subBrokerage .left_box_inner .ant-tabs-tab:hover {
                        color: rgba(0, 0, 0, 0.65);
                    }
                    .subBrokerage .left_box_inner .ant-tabs-nav-wrap {
                        padding: 0;
                    }
                    .subBrokerage .left_box_inner .ant-tabs .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
                        color: ${tabColor};
                    }
                    .subBrokerage .left_box_inner .ant-tabs .ant-tabs-ink-bar {
                        background: ${tabColor};
                        height: 4px;
                    }
                    .subBrokerage .left_box_inner .ant-tabs .ant-tabs-tab {
                        justify-content: center;
                        width: 33.3%;
                        margin: 0;
                        font-size: 16px;
                    }
                    .subBrokerage .left_box_inner .ant-tabs > .ant-tabs-nav .ant-tabs-nav-list {
                        width: 100%;
                    }
                    .subBrokerage .left_box_inner .search_box .ant-select-selector,
                    .ant-select:hover .ant-select-selector,
                    .ant-select:focus .ant-select-selector {
                        border: none;
                        box-shadow: none !important;
                    }
                `}
            </style>
        </div>
    );
};

export default OrderBox;
