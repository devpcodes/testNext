import { Tabs } from 'antd';
const { TabPane } = Tabs;

const SelfSelectTable = () => {
    return (
        <>
            <Tabs defaultActiveKey="1">
                <TabPane tab="庫存" key="1" />
                <TabPane tab="Tab 1" key="2" />
                <TabPane tab="Tab 1" key="3" />
                <TabPane tab="Tab 1" key="4" />
                <TabPane tab="Tab 1" key="5" />
                <TabPane tab="Tab 1" key="6" />
                <TabPane tab="Tab 1" key="7" />
                <TabPane tab="Tab 1" key="8" />
                <TabPane tab="Tab 1" key="9" />
                <TabPane tab="Tab 1" key="10" />
                <TabPane tab="Tab 1" key="11" />
                <TabPane tab="Tab 1" key="12" />
            </Tabs>
        </>
    );
};

export default SelfSelectTable;
