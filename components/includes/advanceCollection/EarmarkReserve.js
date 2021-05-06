import { useEffect, useContext, useRef, useState, useCallback } from 'react';
import { Tabs, Button, Input, Progress, Modal, notification } from 'antd';
import { ReducerContext } from '../../../pages/AdvanceCollection';
import Accounts from './Accounts';
const { TabPane } = Tabs;
const EarmarkReserve = () => {
    const [state, dispatch] = useContext(ReducerContext);
    const [defaultValue, setDefaultValue] = useState('');
    const init = useRef(false);

    useEffect(() => {
        if (!init.current) {
            setDefaultValue(state.accountsReducer.selected.broker_id + state.accountsReducer.selected.account);
            init.current = true;
        }
    }, [state.accountsReducer.selected]);
    const changleHandler = useCallback(() => {});
    return (
        <>
            <div className="earmarkReserve__container">
                <h1 className="title">預收款項</h1>
                <Tabs
                    // defaultActiveKey={stockActiveTabKey.current}
                    animated={{ inkBar: true, tabPane: true }}
                    onChange={changleHandler}
                >
                    <TabPane tab="預收款項申請" key="1">
                        <Accounts key="1" style={{ marginTop: '35px' }} value={defaultValue} />
                    </TabPane>
                    <TabPane tab="預收款項查詢" key="2"></TabPane>
                </Tabs>
            </div>
            <style jsx>{`
                .earmarkReserve__container {
                    margin: 20px auto 0 auto;
                    max-width: 1000px;
                    font-size: 0px;
                    padding-left: 20px;
                    padding-right: 20px;
                }
                .title {
                    text-align: center;
                    color: #333;
                    font-size: 36px;
                    font-weight: bold;
                    letter-spacing: 6px;
                    margin-bottom: 0;
                }
            `}</style>
            <style global jsx>{`
                .earmarkReserve__container .ant-tabs-nav-list {
                    width: 100%;
                }
                .earmarkReserve__container .ant-tabs-tab {
                    width: 50%;
                    margin: 0;
                    text-align: center;
                    padding: 10px 20px;
                    font-size: 24px;
                    font-weight: bold;
                }
                @media (max-width: 580px) {
                    .earmarkReserve__container .ant-tabs-tab {
                        font-size: 16px;
                    }
                }
                .earmarkReserve__container .ant-tabs-tab div {
                    margin: 0 auto;
                }
                .earmarkReserve__container .ant-tabs-ink-bar {
                    background: #d23749;
                    height: 4px !important;
                }
                .earmarkReserve__container .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
                    color: #d23749;
                    font-weight: bold;
                }
                .earmarkReserve__container .ant-tabs-tab:hover {
                    color: #d23749;
                }

                .earmarkReserve__container .ant-tabs-tab-btn:active,
                .ant-tabs-tab-btn:focus,
                .ant-tabs-tab-remove:active,
                .ant-tabs-tab-remove:focus {
                    color: #d23749;
                }
            `}</style>
        </>
    );
};

export default EarmarkReserve;
