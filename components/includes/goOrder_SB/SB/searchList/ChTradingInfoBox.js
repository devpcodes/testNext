import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Tooltip, Modal, Tabs } from 'antd';
import ChangeBox from './ChangeBox';

const { TabPane } = Tabs;

const ChTradingInfoBox = () => {
    const [tabKey, setTabKey] = useState('2');
    const info = useSelector(store => store.goOrderSB.confirmBoxChanValInfo);
    // const market = useSelector(store => store.goOrder.productInfo?.solaceMarket);
    // useEffect(() => {
    //     // if (checkPriceBtn(info)) {
    //     //     setTabKey('1');
    //     // } else {
    //     //     setTabKey('2');
    //     // }
    // }, [info]);
    const tabChangeHandler = activeKey => {
        switch (activeKey) {
            case '1':
                setTabKey(activeKey);
                break;
            case '2':
                setTabKey(activeKey);
                break;
            default:
                setTabKey('1');
                break;
        }
    };
    return (
        <div className="trading__container">
            <Tabs activeKey={tabKey} onChange={tabChangeHandler} centered animated={{ inkBar: true, tabPane: false }}>
                {/* {checkPriceBtn(info) && (
                    <TabPane tab="改價" key="1">
                        {tabKey === '1' && (
                            <ChangeBox type="price" tabKey={tabKey} btnClassName="btn__container btn__container-00" />
                        )}
                    </TabPane>
                )} */}
                <TabPane tab="改量" key="2">
                    {tabKey === '2' && <ChangeBox info={info} />}
                </TabPane>
            </Tabs>
            <style jsx global>{`
                .trading__container .ant-tabs {
                    position: absolute;
                    top: -9px;
                    height: 360px;
                    width: 100vw;
                    overflow: inherit;
                }
                .trading__container .ant-tabs > .ant-tabs-nav .ant-tabs-nav-list {
                    height: 50px;
                }
                .trading__container .ant-tabs-tab-btn {
                    margin: 0 auto;
                    font-size: 2rem;
                    color: #0d1623;
                    font-weight: bold;
                }
                .trading__container .ant-tabs-tab {
                    margin: 0;
                    width: 107px;
                }
                .trading__container .ant-tabs-ink-bar {
                    background: #254a91;
                }
                .trading__container .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
                    color: #254a91;
                    font-weight: bold;
                }
                .trading__container .ant-tabs-tab.ant-tabs-tab-active {
                    // background-image: linear-gradient(to bottom, rgba(244, 90, 76, 0) 5%, #eaf1ff);
                    background: linear-gradient(90deg, #eaf1ff 0%, #ffffff 74%);
                    background: -moz-linear-gradient(90deg, #eaf1ff 0%, #ffffff 74%);
                    background: -webkit-linear-gradient(90deg, #eaf1ff 0%, #ffffff 74%);
                    background: -o-linear-gradient(90deg, #eaf1ff 0%, #ffffff 74%);
                }
            `}</style>
        </div>
    );
};

export default ChTradingInfoBox;
