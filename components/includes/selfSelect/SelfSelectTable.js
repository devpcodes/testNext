import { Tabs } from 'antd';
import DragTable from './DragTable';

const { TabPane } = Tabs;

const SelfSelectTable = () => {
    return (
        <>
            <div className="select__group__tab">
                <Tabs defaultActiveKey="1">
                    <TabPane tab="庫存" key="1" />
                    <TabPane tab="自選股 1" key="2" />
                    <TabPane tab="自選股 2" key="3" />
                    <TabPane tab="自選股 3" key="4" />
                    <TabPane tab="自選股 4" key="5" />
                    <TabPane tab="自選股 5" key="6" />
                    <TabPane tab="自選股 6" key="7" />
                    <TabPane tab="自選股 7" key="8" />
                    <TabPane tab="自選股 8" key="9" />
                    <TabPane tab="自選股 9" key="10" />
                    <TabPane tab="自選股 10" key="11" />
                </Tabs>
            </div>

            <div className="select__stock__table">
                <DragTable />
            </div>

            <style jsx>{`
                .select__group__tab {
                    padding: 0 30px;
                    border-bottom: solid 1px #e6ebf5;
                }
            `}</style>
            <style jsx global>{`
                .ant-tabs-tab-btn {
                    font-size: 1.6rem;
                }
                .ant-tabs-tab-btn:hover,
                .ant-tabs-tab:hover {
                    color: #daa360;
                }
                .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
                    color: #daa360;
                }
                .ant-tabs-ink-bar {
                    background: #daa360;
                }
                .ant-tabs-bottom > .ant-tabs-nav .ant-tabs-ink-bar,
                .ant-tabs-bottom > div > .ant-tabs-nav .ant-tabs-ink-bar,
                .ant-tabs-top > .ant-tabs-nav .ant-tabs-ink-bar,
                .ant-tabs-top > div > .ant-tabs-nav .ant-tabs-ink-bar {
                    height: 4px;
                }
            `}</style>
        </>
    );
};

export default SelfSelectTable;
