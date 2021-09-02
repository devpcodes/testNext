import { Menu, Tabs } from 'antd';
import { useState, useCallback, useEffect } from 'react';
import theme from '../../../../resources/styles/theme';

const TopTabBar = ({ current, menuList, onClick }) => {
    const [state, setState] = useState({ current: 'all' });
    const { TabPane } = Tabs;
    const handleClick = key => {
        setState({ current: key });
        let key_ = key == 'all' ? '' : key;
        console.log(key_);
        onClick(key_);
    };

    return (
        <>
            <div className="tab_box subBrokerage">
                <Tabs defaultActiveKey="all" onChange={handleClick}>
                    {menuList.map(x => {
                        return <TabPane tab={x.title} key={x.key}></TabPane>;
                    })}
                </Tabs>
            </div>
            <style jsx global>
                {`
                .subBrokerage.tab_box .ant-tabs-nav{margin-bottom:0;background-color: #FFF;border: 1px solid #d7e0ef; border-width: 1px 1px 0 1px;}
                .subBrokerage.tab_box .ant-tabs-nav::before{display:none;}
                .subBrokerage.tab_box .ant-tabs-tab{font-size:16px;font-weight:700;0 25px 0 15px}
                .subBrokerage.tab_box .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn{color:#daa360;}
                .subBrokerage.tab_box .ant-tabs-ink-bar{background:#daa360;height: 4px;}
                .subBrokerage .ant-tabs-nav-wrap {padding:0 16px;}
                `}
            </style>
        </>
    );
};

export default TopTabBar;
