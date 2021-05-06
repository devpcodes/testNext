import { useEffect, useContext, useRef, useState, useCallback } from 'react';
import { Tabs, Button, Input, Progress, Modal, notification } from 'antd';
import { ReducerContext } from '../../../pages/AdvanceCollection';
import Accounts from './Accounts';
import SearchAutoComplete from '../tradingAccount/vipInventory/SearchAutoComplete';
import BuyButton from '../tradingAccount/vipInventory/buttons/BuyButton';
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
    const selectHandler = useCallback(() => {});
    const onSeChangeHandler = useCallback(() => {});
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
                        <div className="apply__container">
                            <div className="item">
                                <p className="label symbol__label">股號或名稱</p>
                                <SearchAutoComplete
                                    selectHandler={selectHandler}
                                    onChange={onSeChangeHandler}
                                    width={'100%'}
                                />
                            </div>
                            <div className="item">
                                <p className="label">委託價</p>
                                <Input className="earmark__inp" />
                            </div>
                            <div className="item">
                                <p className="label">股數</p>
                                <Input className="earmark__inp" />
                            </div>
                            <div className="item">
                                <p className="label">預估金額</p>
                                <Input className="earmark__inp" />
                            </div>
                            <div className="btn__box-earmark">
                                <BuyButton
                                    text={'申請'}
                                    width={'100%'}
                                    height={'40px'}
                                    fontSize={'16px'}
                                    color={'rgb(210, 55, 73)'}
                                />
                            </div>
                        </div>
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
                .apply__container {
                    padding-left: 2px;
                    margin-top: 40px;
                    height: 400px;
                }
                .label {
                    font-size: 16px;
                    margin-right: 8px;
                    margin-bottom: 5px;
                    font-weight: bold;
                }
                .item {
                    display: inline-block;
                    width: calc((100% - 160px) / 4);
                    height: 75px;
                    overflow: hidden;
                }
                .item :not(:first-child) {
                    margin-left: 20px;
                }
                .btn__box-earmark {
                    vertical-align: top;
                    display: inline-block;
                    width: 80px;
                    padding-top: 28px;
                    margin-left: 20px;
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

                .autoComplete__container {
                    display: inline-block;
                }
                .autoComplete__container .ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
                    border: 1px solid #757575;
                    border-radius: 2px;
                }
                .autoComplete__container
                    .ant-select-single:not(.ant-select-customize-input)
                    .ant-select-selector
                    .ant-select-selection-search-input {
                    /* font-size: 16px; */
                    height: 38px !important;
                }
                .autoComplete__container .ant-select-single .ant-select-selector .ant-select-selection-placeholder {
                    /* line-height: 36px; */
                    line-height: 36px;
                }

                .earmark__inp.ant-input {
                    display: inline-block;
                    height: 38px;
                    border: 1px solid #757575;
                }
            `}</style>
        </>
    );
};

export default EarmarkReserve;
