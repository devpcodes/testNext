import { useCallback, useState, memo, useEffect } from 'react';
import { Tabs, Collapse } from 'antd';
import AssetCards from '../asset/assetCards';
import { useSelector } from 'react-redux';
import { formatNum } from '../../../services/formatNum';

const { TabPane } = Tabs;
const { Panel } = Collapse;

const assetDetailContainer = memo(({}) => {
    const [activeTab, setActiveTab] = useState('1');
    const isMobile = useSelector(store => store.layout.isMobile);
    const changeChartOverviewGroup = key => {
        setActiveTab(key);
    };

    const realTimePrtLosSum = useSelector(store => store.asset.realTimePrtLosSum.data);
    const realTimePrtLosSumTotal = useSelector(store => store.asset.realTimePrtLosSum.total);
    const [domData, setDomData] = useState({});
    const typeList = ['S', 'H', 'F', 'OF', 'BOND', 'SN', 'INTRANSIT', 'DEPOSIT'];
    const getEachTypeAssetCards = type => {
        switch (type) {
            case 'S':
                return <AssetCards type="S" />;
                break;
            case 'H':
                return (
                    <>
                        <AssetCards type="H" />
                        <AssetCards type="FIP" />
                        <AssetCards type="MIP" />
                    </>
                );
                break;
            case 'F':
                return (
                    <>
                        <AssetCards type="F" />
                        <AssetCards type="FF" />
                    </>
                );
                break;
            case 'OF':
                return (
                    <>
                        <AssetCards type="OF" />
                        <AssetCards type="WM_FUND" />
                    </>
                );
                break;
            case 'BOND':
                return (
                    <>
                        <AssetCards type="BOND" />
                    </>
                );
                break;
            case 'SN':
                return (
                    <>
                        <AssetCards type="SN" />
                        <AssetCards type="WM_SN" />
                    </>
                );
                break;
            case 'INTRANSIT':
                return (
                    <>
                        <AssetCards type="WM_FUND_INTRANSIT" />
                        <AssetCards type="WM_SN_INTRANSIT" />
                    </>
                );
                break;
            case 'DEPOSIT':
                return (
                    <>
                        <AssetCards type="WM_TRUST_DEPOSIT" />
                    </>
                );
                break;
        }
    };
    const CustomMobileTitle = ({ type }) => {
        return (
            <>
                <div className="panel__header">
                    <div>
                        <div>
                            <span className={`point__circle ${domData[type]?.class}`}></span>
                            <span className="panel__header__title">{domData[type]?.title}</span>
                        </div>
                        <div className="panel__header__rate">{domData[type]?.total_proportion}%</div>
                    </div>
                    <div className="total__amount">${domData[type]?.sum_amt}</div>
                </div>
            </>
        );
    };

    useEffect(() => {
        const data = {
            // 證券
            S: {
                total_proportion: parseFloat((realTimePrtLosSum?.S.sum_amt / realTimePrtLosSumTotal) * 100).toFixed(2), // 總佔比
                sum_amt: formatNum(realTimePrtLosSum?.S.sum_amt), // 總額
                title: '國內證券',
                class: 's__point',
            },
            H: {
                total_proportion: parseFloat(
                    ((parseInt(realTimePrtLosSum?.H.sum_twd) +
                        parseInt(realTimePrtLosSum?.FIP.sum_twd) +
                        parseInt(realTimePrtLosSum?.MIP.sum_twd)) /
                        realTimePrtLosSumTotal) *
                        100,
                ).toFixed(2), // 總佔比
                sum_amt: formatNum(
                    parseInt(realTimePrtLosSum?.H.sum_twd) +
                        parseInt(realTimePrtLosSum?.FIP.sum_twd) +
                        parseInt(realTimePrtLosSum?.MIP.sum_twd),
                ), // 總額
                title: '海外證券',
                class: 'h__point',
            },
            F: {
                total_proportion: parseFloat(
                    ((parseInt(realTimePrtLosSum?.F.sum_balv) + parseInt(realTimePrtLosSum?.FF.sum_dlbaln_twd)) /
                        realTimePrtLosSumTotal) *
                        100,
                ).toFixed(2),
                sum_amt: formatNum(
                    parseInt(realTimePrtLosSum?.F.sum_balv) + parseInt(realTimePrtLosSum?.FF.sum_dlbaln_twd),
                ),
                title: '期權',
                class: 'f__point',
            },

            // 基金
            OF: {
                total_proportion: parseFloat(
                    ((parseInt(realTimePrtLosSum?.OF.sum_twd) + parseInt(realTimePrtLosSum?.WM_FUND.sum_twd)) /
                        realTimePrtLosSumTotal) *
                        100,
                ).toFixed(2),
                sum_amt: formatNum(
                    parseInt(realTimePrtLosSum?.OF.sum_twd) + parseInt(realTimePrtLosSum?.WM_FUND.sum_twd),
                ),
                title: '基金',
                class: 'of__point',
            },

            BOND: {
                total_proportion: parseFloat(
                    (realTimePrtLosSum?.BOND.sum_total_value_twd / realTimePrtLosSumTotal) * 100,
                ).toFixed(2), // 總佔比
                sum_amt: formatNum(realTimePrtLosSum?.BOND.sum_total_value_twd), // 總額
                title: '債券',
                class: 'bond__point',
            },
            SN: {
                total_proportion: parseFloat(
                    (parseInt(realTimePrtLosSum?.SN.sum_twd) +
                        parseInt(realTimePrtLosSum?.WM_SN.sum_twd) / realTimePrtLosSumTotal) *
                        100,
                ).toFixed(2), // 總佔比
                sum_amt: formatNum(
                    parseInt(realTimePrtLosSum?.SN.sum_twd) + parseInt(realTimePrtLosSum?.WM_SN.sum_twd),
                ), // 總額
                title: '結構型商品',
                class: 'sn__point',
            },
            INTRANSIT: {
                total_proportion: parseFloat(
                    (realTimePrtLosSum?.WM_FUND_INTRANSIT.sum_twd / realTimePrtLosSumTotal) * 100,
                ).toFixed(2), // 總佔比
                sum_amt: formatNum(realTimePrtLosSum?.WM_FUND_INTRANSIT.sum_twd), // 總額
                title: '在途款',
                class: 'intransit__point',
            },
            DEPOSIT: {
                total_proportion: parseFloat(
                    (realTimePrtLosSum?.WM_TRUST_DEPOSIT.sum_twd / realTimePrtLosSumTotal) * 100,
                ).toFixed(2), // 總佔比
                sum_amt: formatNum(realTimePrtLosSum?.WM_TRUST_DEPOSIT.sum_twd), // 總額
                title: '約當現金',
                class: 'deposit__point',
            },
        };
        setDomData(data);
    }, [realTimePrtLosSum]);

    return (
        <>
            {isMobile ? (
                <Collapse>
                    {typeList.map((type, index) => {
                        const assetCards = getEachTypeAssetCards(type);
                        return (
                            <Panel header={<CustomMobileTitle type={type} />} key={index}>
                                {assetCards}
                            </Panel>
                        );
                    })}
                </Collapse>
            ) : (
                <div className="asset__detail__overview__tab">
                    <Tabs onChange={changeChartOverviewGroup}>
                        {typeList.map((type, index) => {
                            const assetCards = getEachTypeAssetCards(type);
                            return (
                                <TabPane tab={<span>{domData[type]?.title}</span>} key={index}>
                                    {assetCards}
                                </TabPane>
                            );
                        })}
                    </Tabs>
                </div>
            )}

            <style jsx>{`
                .asset__detail__overview__tab {
                    position: relative;
                    border: solid 1px #e6ebf5;
                    background: #fff;
                    margin: 30px 0;
                }
            `}</style>

            <style jsx global>{`
                .panel__header {
                    display: flex;
                    justify-content: space-between;
                }
                .panel__header__title {
                    color: #0d1623;
                    font-size: 16px;
                    font-weight: bold;
                }
                .panel__header__rate {
                    font-size: 14px;
                    color: #3f5372;
                    margin-left: 18px;
                }
                .point__circle {
                    display: inline-block;
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    margin-right: 10px;
                    margin-bottom: 2px;
                }
                .s__point {
                    background-color: #c43826;
                }
                .f__point {
                    background-color: #c97b1d;
                }
                .h__point {
                    background-color: #0d1623;
                }
                .of__point {
                    background-color: #daa360;
                }
                .bond__point {
                    background-color: #3f5372;
                }
                .sn__point {
                    background-color: #6c7b94;
                }
                .intransit__point {
                    background-color: #254a91;
                }
                .deposit__point {
                    background-color: #a9b6cb;
                }
                .total__amount {
                    display: flex;
                    align-items: center;
                    font-size: 20px;
                    color: #0d1623;
                }
                .ant-collapse > .ant-collapse-item > .ant-collapse-header {
                    padding: 12px 45px 12px 16px;
                }
                .ant-collapse > .ant-collapse-item > .ant-collapse-header .ant-collapse-arrow {
                    right: 16px;
                    left: unset;
                }
            `}</style>
        </>
    );
});

export default assetDetailContainer;
